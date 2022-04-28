<template>
    <div class="main">
        <br>
        <div class="title">修改密码</div>
        <br>
        <el-form
            :label-position="'right'"
            :rules="passwordRule"
            ref="passwordForm"
            label-width="80px"
            :model="passwordForm"
            class="passwordForm"
        >
            <el-form-item label="原密码" prop="origin_password" clearable>
                <el-input v-model="passwordForm.origin_password" placeholder="请输入原始密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password" clearable>
                <el-input v-model="passwordForm.password" placeholder="请输入新密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password" clearable>
                <el-input v-model="passwordForm.password2" placeholder="请再次输入新密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changePswd('passwordForm')">提交</el-button>
            </el-form-item>
        </el-form>
        <br>
    </div>


</template>

<script>
import {get} from "@/request/axios";
import {ElMessage} from "element-plus";

export default {
    name: "EditPassword",
    mounted() {
        this.passwordForm.studentID = sessionStorage.getItem("studentID")
    },
    data() {
        return {
            passwordForm: {
                studentID: "",
                origin_password: "",
                password: "",
                password2: ""
            },
            passwordRule: {
                password: [
                    {required: true, message: "密码不可为空", trigger: "blur"},
                    {min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: "blur"}
                ]
            }
        }
    },
    methods: {
        changePswd(formName) {
            this.$refs[formName].validate((valid => {
                    if (valid) {
                        let resp = get('/api/changePassword', this.passwordForm)
                        resp.then((res) => {
                            console.log(res)
                            if (res.data === true) {
                                ElMessage({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                })
                                Object.keys(this.passwordForm).forEach(key => {
                                    this.passwordForm[key] = ''
                                })
                                sessionStorage.removeItem('token')
                                this.$router.push({
                                        path: "/login"
                                    }
                                )
                            } else {
                                ElMessage({
                                    showClose: true,
                                    message: '修改失败',
                                    type: 'error',
                                    duration: 1000
                                })
                            }
                        }).catch(e => {
                            console.log(e)
                        })
                    } else {
                        console.log("验证失败")
                        return false
                    }
                }
            ))
        }
    }
}
</script>

<style scoped>

.passwordForm {
    text-align: center;
    margin: auto;
    max-width: 300px;
}

.main {
    width: 400px;
    margin-left: 100px;
    background-color: white;
    box-shadow: grey 0px 0px 3px;
    border-radius: 6px;
}

.title {
    margin-bottom: 20px;
    font-family: "Microsoft YaHei UI", "Microsoft YaHei", "微软雅黑", "宋体", "sans-serif";
    font-weight: bold;
    font-size: larger;
}
</style>