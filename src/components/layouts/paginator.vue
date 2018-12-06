<template>
    <div class="paginator">
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        name: "paginator",
        data() {
            return {};
        },
        computed: {
            ...mapState({
                //可以选择的页面大小
                pageSizes: state => state.paginator.pageSizes,
                //页面大小
                pageSize: state => state.paginator.pageSize,
                //总条数
                total: state => state.paginator.total,
                //当前页
                currentPage: state => state.paginator.currentPage
            })
        },
        methods: {
            handleSizeChange(val) {
                this.changePageSize({amount: val})
            },
            handleCurrentChange(val) {
                this.changePage({amount:val});
            },
            ...mapActions({
                changePageSize: 'paginator/pageSizeChange',
                changePage: 'paginator/pageChange'
            })
        }
    }
</script>

<style scoped>

</style>