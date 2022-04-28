<template>
    <div class="myLosses" v-for="item in this.myLosses" :key="item.releaseTime">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>{{ item.lossName }}</span>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        icon-color="red"
                        title="确定删除？"
                        @confirm="deleteLoss(item.lossID)"
                    >
                        <template #reference>
                            <el-button class="button" type="text">删除</el-button>
                        </template>
                    </el-popconfirm>
                </div>
            </template>
            <div class="card-body">
                <div class="card-body-left">
                    <el-image v-if="item.imageUrl" class="image" :src="item.imageUrl" :fit="'contain'"></el-image>
                    <el-image v-else class="image" :src="require('../assets/empty.jpg')" :fit="'contain'"></el-image>
                </div>
                <div class="card-body-right">
                    <div class="card-body-right-top">
                        <div>丢失地点：{{ item.lossLocation }}</div>
                        <div>丢失时间：{{ time(item.lossTime) }}</div>
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
import {get} from "@/request/axios";
import {ElMessage} from "element-plus";
import {formatDate} from "@/utils";
// import {InfoFilled} from "@element-plus/icons-vue";

export default {
    name: "MyLosses",
    components: {
        // InfoFilled,
    },
    mounted() {
        this.studentID = sessionStorage.getItem('studentID');
        let resp = get('/api/selectLossByStudentID', {"studentID":this.studentID});
        resp.then(res=>{
            res.data.forEach(item=>{
                this.myLosses.push(item);
            });
        }).catch(err=>{
            console.log(err);
        });
        console.log(this.myLosses);
    },
    data() {
        return {
            studentID: "",
            myLosses: [],
        }
    },
    methods:{
        deleteLoss(lossID){
            let resp = get('/api/deleteLossByID', {"lossID":lossID});
            resp.then(res=>{
                if (res.data === true){
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                        duration: 500
                    });
                    for (let i = 0; i < this.myLosses.length; i++){
                        if (this.myLosses[i].lossID === lossID){
                            this.myLosses.splice(i, 1);
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
    },

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
.myLosses{
    margin:20px;
}
</style>