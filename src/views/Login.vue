<template>
    <el-container class="login">
        <el-main>
            <div class="main">
                <br>
                <div class="title">登录</div>
                <br>
                <el-form
                    :label-position="labelPosition"
                    :rules="rules"
                    ref="loginForm"
                    label-width="60px"
                    :model="loginInfo"
                    class="loginForm"
                >
                    <el-form-item label="学号" prop="studentID">
                        <el-input v-model="loginInfo.studentID" placeholder="请输入学号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginInfo.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitLogin('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>

    </el-container>
</template>

<script>
import {get} from '@/request/axios';
import {ElMessage} from 'element-plus'

export default {
    name: "Login",
    data() {
        return {
            loginInfo: {
                studentID: null,
                password: null,
            },
            labelPosition: "right",
            rules: {
                studentID: [
                    {required: true, message: "学号不能为空", trigger: "blur"},
                ],
                password: [
                    {required: true, message: "密码不可为空", trigger: "blur"},
                    {min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: "blur"}
                ]
            }
        }
    },
    methods: {
        submitLogin(formName) {
            console.log(formName)
            this.$refs[formName].validate((valid => {
                if (valid) {
                    let resp = get('/api/login', this.loginInfo);
                    resp.then((res) => {
                        console.log(res);
                        if (res.data.state === 1) {
                            ElMessage({
                                showClose: true,
                                message: '登录成功',
                                type: 'success',
                                duration: 1000
                            })
                            sessionStorage.setItem('token', res.data.token);
                            sessionStorage.setItem('studentID', res.data.data.studentID)
                            sessionStorage.setItem('name', res.data.data.name)
                            sessionStorage.setItem('email', res.data.data.email)
                            sessionStorage.setItem('phone', res.data.data.phone)
                            sessionStorage.setItem('avatarurl', res.data.data.avatarurl)

                            this.loginInfo.studentID = null;
                            this.loginInfo.password = null;
                            console.log(this.$router.currentRoute);
                            if (Object.keys(this.$router.currentRoute.value.query).length === 0) {
                                this.$router.push('/');
                            } else {
                                let redirect_to = this.$router.currentRoute.value.query.redirect
                                this.$router.push({
                                    path: redirect_to
                                })
                            }

                        } else {
                            ElMessage({
                                showClose: true,
                                message: '登录失败',
                                type: 'error',
                                duration: 1000
                            })
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                } else {
                    console.log("表单验证失败")
                    return false
                }
            }))
        }
    }
}
</script>

<style scoped>
.login {
    text-align: center
}

.loginForm {
    text-align: center;
    margin: auto;
    max-width: 350px
}
.title{
    margin-bottom: 20px;
    font-size: larger;
    font-family: "Microsoft YaHei UI", "Microsoft YaHei", "微软雅黑", "宋体", "sans-serif";
    font-weight: bold;
    text-align: center;
}
.main {
    box-shadow:grey 0px 0px 3px;
    border-radius: 6px;
    height: 300px;
    width: 400px;
    margin: auto;
    background-color: white;
    text-align: center;
}
</style>