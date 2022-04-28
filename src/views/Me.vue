<template>
    <div class="me">
        <el-container>

            <el-aside width="15%">
                <el-menu
                    :default-active="this.$route.path"
                    :router="true"
                >
                    <el-menu-item index="/Me/MyInfo">
                        <template #title>
                            <el-icon>
                                <User/>
                            </el-icon>
                            <span>个人信息</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="/Me/MyFounds">
                        <template #title>
                            <el-icon>
                                <el-icon>
                                    <Tickets/>
                                </el-icon>
                            </el-icon>
                            <span>我找到的</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="/Me/MyLosses">
                        <template #title>
                            <el-icon>
                                <el-icon>
                                    <Tickets/>
                                </el-icon>
                            </el-icon>
                            <span>我丢失的</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="/Me/EditPassword">
                        <template #title>
                            <el-icon>
                                <el-icon>
                                    <Key/>
                                </el-icon>
                            </el-icon>
                            <span>修改密码</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="/Me/LogOut" @click="dialogVisible = true">
                        <template #title>
                            <el-icon>
                                <el-icon>
                                    <Right/>
                                </el-icon>
                            </el-icon>
                            <span>退出登录</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="/Me/AboutMe">
                        <template #title>
                            <el-icon>
                                <el-icon>
                                    <InfoFilled/>
                                </el-icon>
                            </el-icon>
                            <span>关于我们</span>
                        </template>
                    </el-menu-item>

                    <el-dialog v-model="dialogVisible" title="确定退出？" width="40%">
                        <el-button size="large" type="success" @click="cancelLogOut">取消</el-button>
                        <el-button size="large" type="primary" @click="logOut">确定</el-button>
                    </el-dialog>
                </el-menu>
            </el-aside>


            <el-main>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component"/>
                    </keep-alive>
                </router-view>
            </el-main>

        </el-container>

    </div>
</template>

<script>
import {User, Key, Right, Tickets, InfoFilled} from '@element-plus/icons-vue'

export default {
    name: "Me",
    components: {
        User,
        Key,
        Right,
        Tickets,
        InfoFilled
    },
    data() {
        return {
            default_active: "/Me/MyInfo",
            dialogVisible: false
        }
    },
    mounted() {

    },
    methods: {
        logOut() {
            sessionStorage.clear();
            this.dialogVisible = false;
            this.$router.push({
                path: '/'
            })
        },
        cancelLogOut() {
            this.dialogVisible = false;
            this.$router.push({
                path: '/Me/MyInfo'
            })
        }
    }
}
</script>

<style scoped>
.me {
    width: 80%;
    margin: auto;
}
</style>