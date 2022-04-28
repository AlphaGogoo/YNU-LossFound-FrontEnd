<template>
    <el-container>
        <el-main>
            <div class="main">
                <!--                <button class="changePage" @click="getPrePage" :disabled="page === 0">前一页</button>-->
                <div class="left">
                    <el-card class="box-card" v-for="item in this.found.slice(0,Math.ceil(this.found.length/2))"
                             :key="item">
                        <template #header>
                            <div class="card-header">
                                <span>{{ item.foundName }}</span>
                                <el-popover
                                    placement="right-end"
                                    title="详细信息"
                                    :width="300"
                                    trigger="hover"
                                >
                                    <template #reference>
                                        <el-button type="text">详细信息</el-button>
                                    </template>

                                    <div>学号信息：{{ item.studentIDFeature }}</div>
                                    <div>手机信息：{{ item.phoneFeature }}</div>
                                    <div>邮箱信息：{{ item.emailFeature }}</div>
                                    <div>联系方式：{{ item.authorTeleMethod }}</div>
                                    <div>物品当前位置：{{ item.foundNowLocation }}</div>
                                </el-popover>
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

                                    <div>发布时间：{{ time(item.releaseTime) }}</div>
                                </div>
                                <div class="card-body-right-bottom">

                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>

                <div class="right">
                    <el-card class="box-card"
                             v-for="item in this.found.slice(Math.ceil(this.found.length/2),this.found.length)"
                             :key="item">
                        <template #header>
                            <div class="card-header">
                                <span>{{ item.foundName }}</span>
                                <el-popover
                                    placement="left"
                                    title="详细信息"
                                    :width="300"
                                    trigger="hover"
                                >
                                    <template #reference>
                                        <el-button type="text">详细信息</el-button>
                                    </template>
                                    <div>学号信息：{{ item.studentIDFeature }}</div>
                                    <div>手机信息：{{ item.phoneFeature }}</div>
                                    <div>邮箱信息：{{ item.emailFeature }}</div>
                                    <div>联系方式：{{ item.authorTeleMethod }}</div>
                                    <div>物品当前位置：{{ item.foundNowLocation }}</div>

                                </el-popover>
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

                                    <div>发布时间：{{ time(item.releaseTime) }}</div>
                                </div>
                                <div class="card-body-right-bottom">

                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <!--                <button class="changePage" @click="getNextPage" :disabled="page === totalPages-1">下一页</button>-->
            </div>
        </el-main>
        <el-footer>
            <el-button type="primary" class="nextPage" @click="getNextPage" :disabled="page === totalPages-1 || page===totalPages">下一页</el-button>
        </el-footer>
    </el-container>
</template>

<script>
import {get} from "@/request/axios";
import {formatDate} from "@/utils";

export default {
    name: "new_Found",
    mounted() {
        //计算总页数
        let pagesResp = get('/api/foundPages');
        pagesResp.then(res => {
            console.log(res)
            this.totalPages = res.data
        })
        //获取第一页的内容
        let resp = get('/api/selectFound', {start: 0});
        resp.then(res => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                this.found.push(res.data[i]);
            }
            this.loading = false;
        }).catch(e => {
            console.log(e)
        })
    },
    data() {
        return {
            loading: true,
            page: 0,
            totalPages: 0,
            found: []
        }
    },
    computed: {
        time() {
            return function (time) {
                return formatDate(time)
            }
        }
    },
    methods: {
        // getPrePage() {
        //     this.loading = true;
        //     this.page--;
        //     let resp = get('/api/selectFound', {start: this.page * 10});
        //     resp.then(res => {
        //         console.log(res);
        //         this.found.length = 0   //数组清空
        //         for (let i = 0; i < res.data.length; i++) {
        //             this.found.push({
        //                 foundName: res.data[i].foundName,
        //                 foundLocation: res.data[i].foundLocation,
        //                 foundTime: formatDate(res.data[i].foundTime),
        //                 releaseTime: res.data[i].releaseTime,
        //                 imageUrl: res.data[i].imageUrl,
        //                 studentIDFeature: res.data[i].studentIDFeature,
        //                 phoneFeature: res.data[i].phoneFeature,
        //                 emailFeature: res.data[i].emailFeature,
        //                 otherFeature: res.data[i].otherFeature,
        //                 isReturn: false
        //             })
        //         }
        //         this.loading = false;
        //     }).catch(e => {
        //         console.log(e)
        //     })
        // },
        getNextPage() {
            this.loading = true;
            this.page++;
            let resp = get('/api/selectFound', {start: this.page * 10});
            resp.then(res => {
                console.log(res);
                // this.found.length = 0   //数组清空
                for (let i = 0; i < res.data.length; i++) {
                    this.found.push(res.data[i]);
                }
                this.loading = false;
            }).catch(e => {
                console.log(e)
            })
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

.card-body {
    display: flex;
    flex-direction: row;
}

.card-body-left {
    width: 100px;
}

.card-body-right {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
}

.card-body-right-top {
    text-align: left;
}

.box-card {
    margin-bottom: 40px;
    width: 480px;
}

.main {
    width: 75%;
    justify-content: space-between;
    margin: auto;
    display: flex;
    flex-direction: row;
}

.left {
    display: flex;
    flex-direction: column;
}

.right {
    display: flex;
    flex-direction: column;
}

.nextPage{
    width: 75%;
}
</style>