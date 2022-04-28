<template>
    <el-form
        ref="editForm"
        :model="userInfo"
        :rules="editRules"
        label-width="0px"
        class="registerFrom"
    >
        <el-descriptions
            title="个人信息"
            direction="'horizontal'"
            :column="1"
            border
        >
            <el-descriptions-item label="头像">
                <el-avatar v-if="show" shape="square" :size="80" :fit="'contain'" :src="this.userInfo.avatarurl"/>
                <el-form-item v-else-if="!show" prop="avatarurl">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        accept=".png,.jpg"
                        :show-file-list="false"
                        :http-request="uploadAvatar"
                        :before-upload="beforeImageUpload">
                        <el-image v-if="this.userInfo.avatarurl" class="avatar" :src="this.userInfo.avatarurl" :fit="'contain'"></el-image>
                        <el-image v-else class="upload-icon" :src="require('../assets/upload.svg')"
                                  :fit="'contain'"></el-image>
                    </el-upload>
                </el-form-item>
            </el-descriptions-item>
            <el-descriptions-item label="昵称">
                <div v-if="show">
                    {{ this.userInfo.name }}
                </div>
                <el-form-item v-else-if="!show" prop="name">
                    <el-input
                        v-model="userInfo.name"
                        type="text"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-descriptions-item>
            <el-descriptions-item label="学号">
                <div v-if="show">
                    {{ this.userInfo.studentID }}
                </div>
                <el-form-item v-else-if="!show" prop="studentID">
                    <el-input
                        v-model="userInfo.studentID"
                        type="text"
                        clearable
                        disabled
                    ></el-input>
                </el-form-item>
            </el-descriptions-item>
            <el-descriptions-item label="手机">
                <div v-if="show">
                    {{ this.userInfo.phone }}
                </div>
                <el-form-item v-else-if="!show" prop="phone">
                    <el-input
                        v-model="userInfo.phone"
                        type="text"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
                <div v-if="show">
                    {{ this.userInfo.email }}
                </div>
                <el-form-item v-else-if="!show" prop="email">
                    <el-input
                        v-model="userInfo.email"
                        type="text"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-descriptions-item>
            <el-descriptions-item label="操作">
                <el-button v-if="show" type="primary" @click="edit">编辑</el-button>
                <el-button v-else-if="!show" type="success" @click="submitEdit('editForm')">保存</el-button>
            </el-descriptions-item>
        </el-descriptions>
    </el-form>

</template>

<script>
import {ElMessage} from "element-plus";
import {get} from "@/request/axios";
import {createOSSClient, beforeImageUpload, uploadImage} from "@/utils";
export default {
    name: "MyInfo",
    data() {
        return {
            userInfo: {
                studentID: "",
                name: "",
                email: "",
                phone: "",
                avatarurl: ""
            },
            show: true,
            client:null,
            editRules: {
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
                    {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号", trigger: "blur"}
                ],
                email: [
                    {required: true, message: "邮箱不能为空", trigger: "blur"},
                    {type: "email", message: '请输入正确的邮箱格式', trigger: "blur"}
                ],
                avatarurl: [
                    {required: true, message: "请上传头像", trigger: "blur"},
                ]
            }
        }
    },
    mounted() {
        this.userInfo.studentID = sessionStorage.getItem('studentID')
        this.userInfo.name = sessionStorage.getItem('name')
        this.userInfo.email = sessionStorage.getItem('email')
        this.userInfo.phone = sessionStorage.getItem('phone')
        this.userInfo.avatarurl = sessionStorage.getItem('avatarurl')
        this.client = createOSSClient();
    },
    methods: {
        beforeImageUpload,
        edit() {
            this.show = false
        },
        submitEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    /**
                     * TODO:学号相同过滤，待补充
                     */
                    let resp = get("/api/update", this.userInfo);

                    resp.then((res) => {
                        if (res.data === true) {
                            ElMessage({
                                showClose: true,
                                message: '修改成功',
                                type: "success",
                                duration: 500
                            })
                            this.$router.push({
                                path: `/Me`
                            })
                            this.show = true
                            sessionStorage.setItem('studentID', this.userInfo.studentID)
                            sessionStorage.setItem('name', this.userInfo.name)
                            sessionStorage.setItem('email', this.userInfo.email)
                            sessionStorage.setItem('phone', this.userInfo.phone)
                            sessionStorage.setItem('avatarurl', this.userInfo.avatarurl)
                        } else {
                            ElMessage({
                                showClose: true,
                                message: '失败',
                                type: "error",
                                duration: 500
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },


        uploadAvatar(event) {
            uploadImage(event, this.client, this.userInfo)
        },
    }

}
</script>

<style scoped>

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
    width: 80px;
    height: 80px;
    display: block;
    border: 1px dashed gray;
    border-radius: 6px;
}

.avatar {
    width: 80px;
    height: 80px;
    display: block;
    border: 1px dashed gray;
    border-radius: 50%;
}
.el-avatar{
    border-radius: 50%;
}
</style>