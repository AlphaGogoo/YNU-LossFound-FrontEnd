<template>
    <el-container>
        <el-main>
            <div class="main">
                <br>
                <div class="title">注册账号</div>

                <el-form
                    ref="registerForm"
                    :model="registerInfo"
                    :rules="registerRules"
                    label-width="100px"
                    class="registerFrom"
                >
                    <el-form-item label="昵称" prop="name">
                        <el-input
                            v-model="registerInfo.name"
                            type="text"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="上传头像" prop="avatarurl">
                        <el-upload
                            class="avatar-uploader"
                            action="#"
                            accept=".png,.jpg"
                            :show-file-list="false"
                            :http-request="uploadAvatar"
                            :before-upload="beforeImageUpload"
                        >
                            <el-image v-if="registerInfo.avatarurl" class="avatar" :src="registerInfo.avatarurl"
                                      :fit="'contain'" crossOrigin="anonymous" referrerPolicy="no-referrer"></el-image>
                            <el-image v-else class="upload-icon" :src="require('../assets/upload.svg')"
                                      :fit="'contain'"></el-image>
                        </el-upload>
                    </el-form-item>


                    <el-form-item label="学号" prop="studentID">
                        <el-input
                            v-model="registerInfo.studentID"
                            type="text"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input
                            v-model="registerInfo.phone"
                            type="text"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input
                            v-model="registerInfo.email"
                            type="text"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            v-model="registerInfo.password"
                            type="password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input
                            v-model="registerInfo.password2"
                            type="password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitRegister('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </el-main>
    </el-container>
</template>

<script>
import {get} from "@/request/axios"
import {ElMessage} from 'element-plus'
import {createOSSClient, beforeImageUpload, uploadImage} from "@/utils";

export default {
    name: "RegisterComponent",
    data() {
        let validatePassword = (rules, value, callback) => {
            if (value === null) {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.registerInfo.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            registerInfo: {
                studentID: null,
                name: null,
                phone: null,
                email: null,
                password: null,
                password2: null,
                avatarurl: null
            },
            client: null,
            registerRules: {
                studentID: [
                    {required: true, message: "学号不能为空", trigger: "blur"},
                ],
                name: [
                    {required: true, message: "昵称不能为空", trigger: "blur"},
                    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: "blur"}
                ],
                phone: [
                    {required: true, message: "请输入手机号", trigger: "blur"},
                    // 这个只能验证手机号
                    // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
                    {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号", trigger: "blur"}
                ],
                email: [
                    {required: true, message: "邮箱不能为空", trigger: "blur"},
                    {type: "email", message: '请输入正确的邮箱格式', trigger: "blur"}
                ],
                password: [
                    {required: true, message: "密码不能为空", trigger: "blur"},
                    {min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: "blur"}
                ],
                password2: [
                    {required: true, message: "密码不能为空", trigger: "blur"},
                    {validator: validatePassword, message: '两次输入密码不一致!', trigger: "blur"}
                ],
                avatarurl: [
                    {required: true, message: "请上传头像", trigger: "blur"},
                ]
            }
        }
    },
    mounted() {
        this.client = createOSSClient();
    },
    methods: {
        beforeImageUpload,
        uploadAvatar(event) {
            uploadImage(event, this.client, this.registerInfo)
        },
        submitRegister(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    delete this.registerInfo.password2;
                    /**
                     * TODO:学号相同过滤，待补充
                     */
                    let resp = get("/api/register", this.registerInfo);

                    resp.then((res) => {
                        if (res.data === true) {
                            ElMessage({
                                showClose: true,
                                message: '注册成功',
                                type: "success",
                                duration: 1000
                            })
                            //注册信息清空
                            Object.keys(this.registerInfo).forEach(key => this.registerInfo[key] = '');
                            this.$router.push({
                                path: '/Login'
                            })
                        } else {
                            ElMessage({
                                showClose: true,
                                message: '学号已存在',
                                type: "error",
                                duration: 1000
                            })
                        }
                    })
                } else {
                    return false
                }
            })

        }
    }
}
</script>

<style scoped>
.registerFrom {
    text-align: center;
    max-width: 350px;
    margin: auto;
    background-color: white;
}

.title {
    /*margin: auto;*/
    margin-bottom: 20px;
    font-size: larger;
    background-color: white;
    font-family: "Microsoft YaHei UI", "Microsoft YaHei", "微软雅黑", "宋体", "sans-serif";
    font-weight: bold;
}

.avatar-uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
    border-color: var(--el-color-primary);
}


.upload-icon {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed gray;
    border-radius: 6px;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed gray;
    border-radius: 6px;
}

.main {
    box-shadow:grey 0px 0px 3px;
    border-radius: 6px;
    height: 550px;
    width: 400px;
    margin: auto;
    background-color: white;
}
</style>