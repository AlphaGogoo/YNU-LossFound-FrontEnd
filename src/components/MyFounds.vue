<template>
    <div class="myFounds" v-for="item in this.myFounds" :key="item.releaseTime">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ item.foundName }}</span>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        icon-color="red"
                        title="确定删除？"
                        @confirm="deleteFound(item.foundID)"
                    >
                        <template #reference>
                            <el-button class="button" type="text">删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
            <div class="card-body">
                <div class="card-body-left">
                    <el-image class="image" :src="item.imageUrl" :fit="'contain'"></el-image>
                </div>
                <div class="card-body-right">
                    <div class="card-body-right-top">
                        <div>发现地点：{{ item.foundLocation }}</div>
                        <div>发现时间：{{ time(item.foundTime) }}</div>
                        <div>学号信息：{{ item.studentIDFeature }}</div>
                        <div>手机信息：{{ item.phoneFeature }}</div>
                        <div>邮箱信息：{{ item.emailFeature }}</div>
                        <div>发布时间：{{time(item.releaseTime)}}</div>
                    </div>
                    <div class="card-body-right-bottom">

                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import {get} from '@/request/axios';
import {formatDate} from "@/utils";
import {ElMessage} from "element-plus";
export default {
    name: "MyFounds",
    mounted() {
        this.studentID = sessionStorage.getItem('studentID');
        let resp = get('/api/selectFoundByStudentID', {"studentID":this.studentID});
        resp.then(res=>{
            res.data.forEach(item=>{
                this.myFounds.push(item);
            });
        }).catch(err=>{
            console.log(err);
        });
        console.log(this.myFounds);
    },
    data() {
        return {
            studentID: "",
            myFounds: [],
        }
    },
    methods:{
        deleteFound(foundID){
            let resp = get('/api/deleteFoundByID', {"foundID":foundID});
            resp.then(res=>{
                if (res.data === true){
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                        duration: 500
                    });
                    for (let i = 0; i < this.myFounds.length; i++){
                        if (this.myFounds[i].foundID === foundID){
                            this.myFounds.splice(i, 1);
                            break;
                        }
                    }
                }
            }).catch(err=>{
                console.log(err);
            });
        },
    },
    computed:{
        time(){
            return function (paramTime) {
                return formatDate(paramTime);
            }
        }
    }
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-body{
    display: flex;
    flex-direction: row;
}
.card-body-left{
    /*height: 100px;*/
    width: 100px;
}
.card-body-right{
    display: flex;
    flex-direction: column;
    margin-left: 50px;
}
.card-body-right-top{
    text-align: left;
}
.box-card {
    width: 480px;
}
.myFounds{
    margin:20px;
}
</style>