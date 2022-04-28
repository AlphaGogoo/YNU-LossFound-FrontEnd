<template>
    <el-container>
        <el-main>
            <div class="main">
                <!--                <button class="changePage" @click="getPrePage" :disabled="page === 0">前一页</button>-->
                <div class="left">
                    <el-card class="box-card" v-for="item in this.loss.slice(0,Math.ceil(this.loss.length/2))"
                             :key="item">
                        <template #header>
                            <div class="card-header">
                                <span>{{ item.lossName }}</span>
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
                                    <div>其他信息：{{ item.otherFeature }}</div>
                                </el-popover>
                            </div>
                        </template>
                        <div class="card-body">
                            <div class="card-body-left">
                                <el-image v-if="item.imageUrl" class="image" :src="item.imageUrl" :fit="'contain'"></el-image>
                                <el-image v-else class="image" :src="require('../assets/empty.jpg')" :fit="'contain'" ></el-image>
                            </div>
                            <div class="card-body-right">
                                <div class="card-body-right-top">
                                    <div>丢失地点：{{ item.lossLocation }}</div>
                                    <div>丢失时间：{{ time(item.lossTime) }}</div>
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
                             v-for="item in this.loss.slice(Math.ceil(this.loss.length/2),this.loss.length)"
                             :key="item">
                        <template #header>
                            <div class="card-header">
                                <span>{{ item.lossName }}</span>
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
                                    <div>其他信息：{{ item.otherFeature }}</div>
                                </el-popover>
                            </div>
                        </template>
                        <div class="card-body">
                            <div class="card-body-left">
                                <el-image v-if="item.imageUrl" class="image" :src="item.imageUrl" :fit="'contain'"></el-image>
                                <el-image v-else class="image" :src="require('../assets/empty.jpg')" :fit="'contain'" ></el-image>
                            </div>
                            <div class="card-body-right">
                                <div class="card-body-right-top">
                                    <div>丢失地点：{{ item.lossLocation }}</div>
                                    <div>丢失时间：{{ time(item.lossTime) }}</div>
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
            <el-button type="primary" class="nextPage" @click="getNextPage" :disabled="page === totalPages-1 || page===totalPages">
                下一页
            </el-button>
        </el-footer>
    </el-container>
</template>

<script>
import {get} from "@/request/axios";
import {formatDate} from "@/utils";

export default {
    name: "new_Lost",
    computed: {
        time() {
            return function (time) {
                console.log(formatDate(time));
                return formatDate(time)
            }
        }
    },
    data() {
        return {
            loss: [],
            page: 0,
            totalPages: 0,
            loading: null
        }
    },
    mounted() {
        //查询总页数
        this.loading = true;
        let pagesResp = get('/api/lossPages');
        pagesResp.then(res => {
            this.totalPages = res.data
        })
        //获取第一页的loss
        let resp = get('/api/selectLoss', {start: 0});
        resp.then(res => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                this.loss.push(res.data[i]);
            }
            this.loading = false;
        }).catch(e => {
            console.log(e)
        })
    },
    methods: {
        getPrePage() {
            this.loading = true;
            this.page--;
            let resp = get('/api/selectLoss', {start: this.page * 10});
            resp.then(res => {
                console.log(res);
                this.loss.length = 0   //数组清空
                for (let i = 0; i < res.data.length; i++) {
                    this.loss.push(res.data[i]);
                }
                this.loading = false;
            }).catch(e => {
                console.log(e)
            })
        },
        getNextPage() {
            this.loading = true;
            this.page++;
            let resp = get('/api/selectLoss', {start: this.page * 10});
            resp.then(res => {
                console.log(res);
                // this.loss.length = 0   //数组清空
                for (let i = 0; i < res.data.length; i++) {
                    this.loss.push(res.data[i]);
                }
                this.loading = false;
            }).catch(e => {
                console.log(e)
            })
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
    width: 480px;
    flex-direction: column;
}

.right {
    display: flex;
    width: 480px;
    flex-direction: column;
}

.nextPage {
    width: 75%;
}
</style>