<template>
    <div class="login" id="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h2 class="title">系统登录</h2>
            <el-form-item prop="name">
                <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
                <!--&lt;!&ndash;<el-button @click.native.prevent="handleReset2">重置</el-button>&ndash;&gt;-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {particlesConfig} from '../../config/base.config';
    import {mapActions} from 'vuex';
    export default {
        name: 'Login',
        data() {
            return {
                logining: false,
                ruleForm: {
                    name: '',
                    pwd: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },

        mounted () {
            require('particles.js');
            this.$nextTick(() => {
                this.initParticlesJS()
            })
        },

        methods: {
            initParticlesJS () {
                particlesJS('login', particlesConfig);
            },
            // handleReset() {
            //     this.$refs.ruleForm.resetFields();
            // },
            handleSubmit(ev) {
                this.$refs.ruleForm.validate((valid) => {
                    let _this = this;
                    if (valid) {
                        this.logining = true;
                        let loginParams = { name: this.ruleForm.name, password: this.ruleForm.pwd };
                        _this.$api.login(loginParams).then(
                            (response) => {
                                let auth = {
                                    accessToken: response.data.access_token,
                                    name: this.ruleForm.name
                                };
                                this.setAuth({amount: auth});
                                this.$router.push({
                                    path: '/article/list'
                                })
                            }
                        ).catch(
                            (err) => {
                                this.logining = false;
                            }
                        );
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            ...mapActions({
                setAuth: 'auth/setAuth'
            })
        }

    }
</script>

<style lang="scss" scoped>
    #login {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #e9eef3;
    }
    .login-container {
        width: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -175px;
        margin-top: -275px;
        padding: 35px 35px 15px 35px;

        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0 auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0 0 25px 0;
        }
    }
</style>

