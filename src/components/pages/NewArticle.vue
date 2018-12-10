<template>
    <ArticleView></ArticleView>
</template>

<script>
    import {fileConfig} from "../../config/base.config";
    import ArticleView from '../layouts/ArticleView.vue';
    import {mapActions} from 'vuex';
    export default {
        name: "new-article",
        components: {ArticleView},
        created: function () {
            //初始化store
            this.reset();

            //设置保存地址
            this.setPath({amount: fileConfig.article_dir});

            //设置hexo 文章头部
            this.setContent({amount: fileConfig.article_header})
        },
        data () {
            return {
                value: ''
            }
        },
        methods: {
            ...mapActions({
                reset: 'mavon/reset',
                setPath: 'mavon/setPath',
                setContent: 'mavon/setContent'
            })
        }
    }
</script>

<style>

</style>