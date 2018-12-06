<template>
    <div class="article-list">
        <el-row style="height: 100px;line-height: 100px">
            <el-col :span="6" >
                <el-input v-model.trim="input" placeholder="文章名模糊搜索" @keyup.enter.native="search(input)"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="search(input)" icon="el-icon-search">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="12">
                <router-link to="/article/new">
                    <el-button style="margin: 0" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
                </router-link>
            </el-col>
            <el-col :span="1">
                <el-button style="margin: 0" icon="el-icon-check" @click="deploy()" type="primary">发布</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                border
                highlight-current-row
                style="width: 100%"
                :height="tableHeight"
        >
            <el-table-column
                    fixed
                    header-align="center"
                    align="center"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    align="center"
                    prop="name"
                    label="文章名称"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    align="center"
                    prop="ctime"
                    label="创建时间"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    align="center"
                    prop="mtime"
                    label="最后更新时间"
                    min-width="120">
            </el-table-column>
            <el-table-column
                    header-align="center"
                    align="center"
                    fixed="right"
                    label="操作"
                    min-width="120px">
                <template slot-scope="scope">
                    <router-link to="/article/edit">
                        <el-button icon="el-icon-edit" size="small" type="primary" @click="editArticle(scope.row)">编辑</el-button>
                    </router-link>
                    <el-button icon="el-icon-delete" size="small" @click="deleteArticle(scope.row)" type="primary">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <paginator></paginator>
    </div>
</template>

<script>
    import {fileConfig} from '../../config/base.config.js'
    import paginator from '../layouts/paginator.vue';
    import {mapActions} from 'vuex';
    import fusearch from '../../../http/tool/Fuse.js';
    import { Message } from 'element-ui';
    export default {
        name: "article-list",
        components: {paginator},
        mounted() {
            this.search('');
        },
        data() {
            return {
                input: '',
                tableHeight: window.innerHeight-232
            }
        },
        computed: {
            tableData: vm => vm.$store.getters['paginator/pageData'],
            originData: vm => vm.$store.getters['paginator/origin']
        },
        methods: {
            //文章模糊搜索
            search(key) {
                //没有关键字搜索则重新请求接口
                if (key) {
                    let res = fusearch(this.originData, ['name'], key);
                    //设置搜索后的数据
                    this.setArticleList({
                        amount: res
                    });
                } else {
                    this.$api.getArticleList({}).then(
                        response => {
                            //设置搜索后的数据
                            this.setArticleList({
                                amount: response.data
                            });
                            //设置接口原始数据
                            this.setOrigin({
                                amount: response.data
                            })
                        }
                    ).catch(err => {
                        console.log(err);
                    })
                }
            },

            //编辑文章
            editArticle(info) {
                let params = {
                    path: info.fullname
                };
                //保存文件路径
                this.setPath({amount: info.fullname});
                this.setTitle({amount: info.name});

                //请求获取文件内容接口
                this.$api.getArticle(params).then(
                    response => {
                        if (0 === response.code) {
                            this.setContent({amount: response.data})
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })
            },

            //删除文章  移至草稿箱
            deleteArticle(info) {
                let params = {
                    filename: info.fullname,
                    newPath: fileConfig.article_draft_dir
                };
                this.$api.deleteArticle(params).then(
                    response => {
                        if (0 === response.code) {
                            Message.success({
                                showClose: true,
                                message: '删除成功'
                            });
                            this.search('');
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            //发布文章
            deploy() {
                let params = {
                    workDir: fileConfig.blog_dir
                };
                this.$api.deploy(params).then(
                    response => {
                        if (0 === response.code) {
                            Message.success({
                                showClose: true,
                                message: '发布'
                            });
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                );
                console.log(123);
            },

            ...mapActions({
                setArticleList: 'paginator/getData',
                setOrigin: 'paginator/setOrigin',
                setTitle: 'mavon/setTitle',
                setContent: 'mavon/setContent',
                setPath: 'mavon/setPath',
                reset: 'mavon/reset'
            })
        }
    }
</script>

<style>

</style>