<template>
    <div class="main">
        <br>
        <el-form
            :label-position="'right'"
            :rules="lossRules"
            ref="lossFrom"
            label-width="120px"
            :model="loss"
            class="lossForm"

        >
            <el-form-item label="名称" prop="lossName">
                <el-input v-model="loss.lossName" placeholder="请输入丢失物品名称" clearable></el-input>
            </el-form-item>

            <el-form-item label="地点" prop="lossLocation">
                <el-input v-model="loss.lossLocation" placeholder="请输入丢失地点" clearable></el-input>
            </el-form-item>

            <el-form-item label="丢失时间" prop="lossTime" clearable>
                <el-date-picker
                    v-model="loss.lossTime"
                    type="datetime"
                    placeholder="选择日期和时间"
                    :disabled-date="disabledDate"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="联系方式" prop="authorTeleMethod">
                <el-input v-model="loss.authorTeleMethod" placeholder="请输入联系方式" clearable></el-input>
            </el-form-item>

            <el-form-item label="上传图片" prop="imageUrl">
                <el-upload
                    class="image-uploader"
                    action="#"
                    accept=".png,.jpg"
                    :show-file-list="false"
                    :http-request="uploadLossImage"
                    :before-upload="beforeImageUpload"
                >
                    <el-image v-if="loss.imageUrl" class="image" :src="loss.imageUrl" :fit="'contain'"
                              crossOrigin="anonymous" referrerPolicy="no-referrer"></el-image>
                    <el-image v-else class="upload-icon" :src="require('../assets/upload.svg')"
                              :fit="'contain'"></el-image>

                </el-upload>
            </el-form-item>

            <el-form-item label="学号信息" prop="studentIDFeature">
                <el-input v-model="loss.studentIDFeature" placeholder="请输入物品上学号信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item label="手机号信息" prop="phoneFeature">
                <el-input v-model="loss.phoneFeature" placeholder="请输入物品上的手机号信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item label="邮箱信息" prop="emailFeature">
                <el-input v-model="loss.emailFeature" placeholder="请输入物品上的邮箱信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item label="其他信息" prop="otherFeature">
                <el-input type="textarea" :rows="'3'" resize="none" v-model="loss.otherFeature"
                          placeholder="请输入物品上的其他信息（可选）" clearable></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitLoss('lossFrom')">提交</el-button>
            </el-form-item>
        </el-form>
        <br>
    </div>
</template>

<script>

import {ElMessage} from "element-plus";
import {get} from "@/request/axios";
import {createOSSClient, beforeImageUpload, uploadImage, disabledDate} from "@/utils";

export default {

    name: "PostLoss",
    mounted() {
        this.client = createOSSClient();
    },
    data() {
        return {
            loading: false,
            loss: {
                lossName: null,
                lossLocation: null,
                lossTime: null,
                releaseTime: null,
                imageUrl: null,
                studentIDFeature: null,
                phoneFeature: null,
                emailFeature: null,
                otherFeature: null,
                authorTeleMethod:null,
                author: null,
                isFound: false
            },
            client: null,
            lossRules: {
                lossName: [
                    {required: true, message: "名称不能为空", trigger: "blur"},
                    {max: 100, message: '长度小于 100 个字符', trigger: "blur"}
                ],
                lossLocation: [
                    {required: true, message: "地点不能为空", trigger: "blur"},
                    {max: 100, message: '长度小于 100 个字符', trigger: "blur"}
                ],
                lossTime: [
                    {required: true, message: "丢失时间不能为空", trigger: "blur"}
                ],
                imageUrl: [
                    {required: false, message: "图片不能为空", trigger: "blur"}
                ],
                studentIDFeature: [
                    {required: false, trigger: "blur"}
                ],
                phoneFeature: [
                    {required: false, trigger: "blur"},
                    {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号", trigger: "blur"}
                ],
                emailFeature: [
                    {required: false, trigger: "blur"}
                ],
                authorTeleMethod:[
                    {required: true, trigger: "blur",message:"联系方式不能为空"}
                ],
                otherFeature: [
                    {required: false, trigger: "blur"}
                ]
            },
        }
    },
    methods: {
        beforeImageUpload,
        disabledDate,
        uploadLossImage(event) {
            uploadImage(event, this.client, this.loss);
        },
        submitLoss(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    //发布时间戳
                    this.loss.releaseTime = Math.round(new Date().getTime()).toString();
                    //将Date格式修改为String格式
                    this.loss.lossTime = this.loss.lossTime.getTime()
                    //作者学号
                    this.loss.author = sessionStorage.getItem("studentID");
                    console.log(this.loss)
                    let resp = get('/api/postLoss', this.loss);

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
                            Object.keys(this.loss).forEach((key) => {
                                this.loss[key] = null;
                            })
                            this.loading = false;
                        } else {
                            ElMessage({
                                showClose: true,
                                message: "发布失败",
                                type: "error",
                                duration: 500
                            })
                            this.loading = false;
                        }
                    }).catch(e => {
                        console.log(e);
                    })
                } else {
                    return false;
                }
            })
        },
    }
}
</script>

<style scoped>
.lossForm {
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

.main {
    margin-left: 100px;
    width: 600px;
    background-color: white;
    box-shadow: grey 0px 0px 2px;
    border-radius: 6px;
}

.upload-icon {
    width: 120px;
    height: 120px;
    display: block;
    border: 1px dashed gray;
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