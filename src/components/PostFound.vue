<template>
    <div class="main">
        <br>
        <el-form
            :label-position="'right'"
            :rules="foundRules"
            ref="foundFrom"
            label-width="120px"
            :model="found"
            class="foundForm"
        >
            <el-form-item label="名称" prop="foundName">
                <el-input v-model="found.foundName" placeholder="请输入捡到的物品名称"></el-input>
            </el-form-item>

            <el-form-item label="地点" prop="foundLocation">
                <el-input v-model="found.foundLocation" placeholder="请输入捡到物品的地点" clearable></el-input>
            </el-form-item>

            <el-form-item label="捡到时间" prop="foundTime">
                <el-date-picker
                    v-model="found.foundTime"
                    type="datetime"
                    placeholder="选择日期和时间"
                    :disabled-date="disabledDate"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="上传图片" prop="imageUrl">
                <el-upload
                    class="image-uploader"
                    action="#"
                    accept=".png,.jpg"
                    :show-file-list="false"
                    :http-request="uploadFoundImage"
                    :before-upload="beforeImageUpload"
                >
                    <el-image v-if="found.imageUrl" class="image" :src="found.imageUrl" :fit="'contain'"
                              crossOrigin="anonymous" referrerPolicy="no-referrer"></el-image>
                    <el-image v-else class="upload-icon" :src="require('../assets/upload.svg')"
                              :fit="'contain'"></el-image>

                </el-upload>
            </el-form-item>

            <el-form-item label="物品现地点" prop="foundNowLocation">
                <el-input v-model="found.foundNowLocation" placeholder="请输入物品当前位置" clearable></el-input>
            </el-form-item>

            <el-form-item label="联系方式" prop="authorTeleMethod">
                <el-input v-model="found.authorTeleMethod" placeholder="请输入您的联系方式" clearable></el-input>
            </el-form-item>

            <el-form-item label="学号信息" prop="studentIDFeature">
                <el-input v-model="found.studentIDFeature" placeholder="请输入物品上学号信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item label="手机号信息" prop="phoneFeature">
                <el-input v-model="found.phoneFeature" placeholder="请输入物品上的手机号信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item label="邮箱信息" prop="emailFeature">
                <el-input v-model="found.emailFeature" placeholder="请输入物品上的邮箱信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item label="其他信息" prop="otherFeature">
                <el-input type="textarea" :rows="'3'" resize="none" v-model="found.otherFeature"
                          placeholder="请输入物品上的其他信息（可选）"></el-input>
            </el-form-item>



            <el-form-item>
                <el-button v-loading.fullscreen.lock="loading" type="primary" @click="submitFound('foundFrom')">提交
                </el-button>
            </el-form-item>
        </el-form>
        <br>
    </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {get} from "@/request/axios";
import {createOSSClient, beforeImageUpload, disabledDate, uploadImage} from "@/utils";

export default {
    name: "PostFound",
    mounted() {
        this.client = createOSSClient();
    },
    data() {
        return {
            loading: false,
            found: {
                foundName: null,
                foundLocation: null,
                foundTime: null,
                releaseTime: null,
                imageUrl: null,
                studentIDFeature: null,
                phoneFeature: null,
                emailFeature: null,
                otherFeature: null,
                isReturn: false,
                foundNowLocation: null,
                authorTeleMethod: null,
                author: null,
            },
            client: null,
            foundRules: {
                foundName: [
                    {required: true, message: "名称不能为空", trigger: "blur"},
                    {max: 100, message: '长度小于 100 个字符', trigger: "blur"}
                ],
                foundLocation: [
                    {required: true, message: "地点不能为空", trigger: "blur"},
                    {max: 100, message: '长度小于 100 个字符', trigger: "blur"}
                ],
                foundTime: [
                    {required: true, message: "丢失时间不能为空", trigger: "blur"}
                ],
                imageUrl: [
                    {required: true, message: "图片不能为空", trigger: "blur"}
                ],
                studentIDFeature: [
                    {required: false, trigger: "blur"}
                ],
                phoneFeature: [
                    {required: false, trigger: "blur"},
                    {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号", trigger: "blur"}
                ],
                emailFeature: [
                    {required: false, trigger: "blur"},
                    {type: "email", message: "请输入合法邮箱", trigger: "blur"}
                ],
                otherFeature: [
                    {required: false, trigger: "blur"}
                ],
                foundNowLocation: [
                    {required: true, trigger: "blur",message: "当前地点不能为空"}
                ],
                authorTeleMethod: [
                    {required: true, trigger: "blur", message: "联系方式不能为空"}
                ]
            }
        }
    },
    methods: {
        beforeImageUpload,
        disabledDate,
        uploadFoundImage(event) {
            uploadImage(event, this.client, this.found);
        },

        submitFound(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.found.foundTime = this.found.foundTime.getTime()
                    this.found.releaseTime = new Date().getTime()
                    this.found.author = sessionStorage.getItem('studentID')
                    console.log(this.found)
                    let resp = get('/api/postFound', this.found);

                    resp.then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            console.log("发布成功");
                            ElMessage({
                                showClose: true,
                                message: "发布成功",
                                type: "success",
                                duration: 500
                            })
                            Object.keys(this.found).forEach((key) => {
                                this.found[key] = null;
                            })
                        }
                        this.loading = false;
                    }).catch(e => {
                        console.log(e);
                        ElMessage({
                            showClose: true,
                            message: "发布失败",
                            type: "success",
                            duration: 500
                        })
                        this.loading = false;
                    })
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
.foundForm {
    max-width: 400px;
    margin: auto;
}

.image-uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.image-uploader:hover {
    border-color: var(--el-color-primary);
}


.upload-icon {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed gray;
    border-radius: 6px;
}

.main {
    margin-left: 100px;
    width: 600px;
    background-color: white;
    box-shadow: grey 0px 0px 2px;
    border-radius: 6px;
}

.image {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed gray;
    border-radius: 6px;
}
</style>