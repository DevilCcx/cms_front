<template>
    <ArticleView></ArticleView>
</template>

<script>
    import ArticleView from '../layouts/ArticleView.vue';
    export default {
        name: "edit-article",
        components: {ArticleView},
        data () {
            return {
                value: ''
            }
        },
        methods: {
            save(value, render) {
                console.log(value);
                console.log(render);
            }
        }
    }
</script>

<style>

</style>