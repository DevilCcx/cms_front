<template>
    <el-container>
        <el-menu default-active="1-1"
                 :default-openeds="['1']"
                 class="el-menu-vertical-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 @select="handleSelect"
                 @open="handleOpen"
                 style="border-right: solid 1px #545c64"
                 @close="handleClose"
                 :collapse="isCollapse"
                 :unique-opened="false"
                 >
            <el-menu-item index="10" style="height: 60px;">
                    <i class="el-icon-menu"></i>
                    <span slot="title">系统菜单</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">博文</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/article/list">
                        <el-menu-item index="1-1">博文列表</el-menu-item>
                    </router-link>
                    <router-link to="/article/new">
                        <el-menu-item index="1-2">新建博文</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">待定</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/article/list">
                        <el-menu-item index="2-1">博文列表</el-menu-item>
                    </router-link>
                    <router-link to="/article/new">
                        <el-menu-item index="2-2">新建博文</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-container>
            <el-header class="container__header">
                <el-dropdown class="el-header__dropdown" @command="handleCommand">
                        <span class="el-dropdown-link">{{this.getName}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">个人中心</el-dropdown-item>
                        <el-dropdown-item command="a">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main style="padding-top: 0">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: "Index",
        data() {
            return {
                isCollapse:false
            }
        },
        computed: {
            ...mapGetters({
                getName: 'auth/getName',
                getAccessToken: 'auth/getAccessToken'
            })
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                if (10 == key) {
                    this.isCollapse = !this.isCollapse;
                }
            },
            handleCommand(command) {
                switch(command) {
                    case 'logout': {
                        this.logout();
                        this.$router.push({
                            name: 'login'
                        });
                        break;
                    }
                    case 'a': {
                        break;
                    }
                    case 'b': {
                        break;
                    }
                }
            },
            ...mapActions({
                logout: 'auth/clearAuth'
            })
        }
    }
</script>

<style scoped>
    .el-container {
        height: 100%;
    }

    .el-header {
        background-color: #545d64;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        height: 100%;
        color: #333;
        text-align: center;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        background-color: #D3DCE6;
        width: 200px;
        min-height: 400px;
    }

    h3 {
        color: #fff;
    }

    .menu__header {
        line-height: 60px;
        text-align: center;
    }

    .menu__header__item {
        display: inline;
    }

    .el-dropdown-link {
        color: #ffffff;
        font-size: 16px;
    }

    .el-header__dropdown {
        position: absolute;
        right: 40px;
    }

</style>