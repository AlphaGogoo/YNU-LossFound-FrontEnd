<template>
    <el-container style="text-align: center">
        <el-header style="{margin:auto}">
            <el-menu
                :default-active="'/'+this.$route.path.split('/')[1]"
                mode="horizontal"
                :router="true"
                :style="{background:'#f7f7f7'}"
                :ellipsis="false"
            >
<!--                <el-menu-item index="/">首页</el-menu-item>-->
                <el-menu-item index="/Lost">寻物广场</el-menu-item>
                <el-menu-item index="/Found">招领广场</el-menu-item>
                <el-menu-item index="/Post">发布启事</el-menu-item>
                <el-menu-item index="/Me">我的</el-menu-item>
                <el-menu-item index="/Login">登录</el-menu-item>
                <el-menu-item index="/Register">注册</el-menu-item>
            </el-menu>

        </el-header>


        <el-main>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component"/>
                </keep-alive>
            </router-view>
        </el-main>
    </el-container>


</template>


<script>
export default {
    mounted() {
    },
    data() {
        return {
        }
    },
    // 创建节点之前设置背景色
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#f7f7f7')
        document.querySelector('html').setAttribute('style', 'background:#f7f7f7')
    },
// 销毁节点之前删除属性
    beforeUnmount() {
        document.querySelector('body').removeAttribute('style')
        document.querySelector('html').removeAttribute('style')
    }
}

</script>


<style>

.el-header {
    margin: auto;
}


</style>
