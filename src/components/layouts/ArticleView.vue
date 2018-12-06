<template>
    <div class="article">
        <el-header class="article__header">
            <el-input
                    v-model="title"
                    placeholder="请输入标题"
                    clearable
            ></el-input>
        </el-header>
        <mavon-editor v-model="content" @save="save"></mavon-editor>
    </div>
</template>

<script>
    import { Message } from 'element-ui';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "article-view",
        data () {
            return {
                title: this.$store.state.mavon.title,
            }
        },
        computed: {
            content: {
                set: () => {},
                get: vm => vm.$store.getters['mavon/content']
            },
            ...mapGetters({
                getPath: 'mavon/path',
                getTitle: 'mavon/title',
                getContent: 'mavon/content'
            })
        },
        methods: {
            //博文保存
            save(value, render) {
                this.setTitle({amount: this.title});
                this.setContent({amount: value});
                let params = {
                    title: this.getTitle+'.md',
                    content: this.getContent,
                    path: this.getPath
                };

                this.$api.writeArticle(params).then(
                    response => {
                        if (0 === response.code) {
                            Message.success({
                                showClose: true,
                                message: '保存成功'
                            });
                            this.$router.push({path: 'list'})
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            ...mapActions({
                setTitle: 'mavon/setTitle',
                setContent: 'mavon/setContent'
            })
        }
    }
</script>

<style scoped>
    .el-input__inner {
        height: 60px;
        font-size: 20px;
        box-shadow: none;
        text-align: center;
    }

    .el-input__inner:hover {
        border-color: #e9e9e9;
    }

    .el-input__inner:focus {
        border-color: #42a5f5;
        box-shadow: none;
        transition-duration: .5s;
    }

    .el-input__inner::-webkit-input-placeholder {
        line-height: 20px;
    }

    .el-input__inner, .el-checkbox__inner, .el-textarea__inner, .el-button {
        border-radius: 0;
    }

    .article__header {
        text-align: center;
        line-height: 60px;
    }

</style>