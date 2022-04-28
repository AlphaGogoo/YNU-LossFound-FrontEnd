<template>
    <div class="post">
        <el-container>
            <el-aside width="15%">
                <el-menu
                    :default-active="this.$route.path"
                    :router="true"
                >
                    <el-menu-item index="/Post/PostLoss">
                        <template #title>
                            <el-icon>
                                <SortDown/>
                            </el-icon>
                            <span>寻物启事</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="/Post/PostFound">
                        <template #title>
                            <el-icon>
                                <SortUp/>
                            </el-icon>
                            <span>招领启事</span>
                        </template>
                    </el-menu-item>
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
import {SortDown, SortUp} from '@element-plus/icons-vue'

export default {
    name: "Post",
    components: {
        SortDown,
        SortUp
    },
}
</script>

<style scoped>
.post {
    width: 80%;
    margin: auto;
}
</style>