# YNU-Loss-Found

校园内，在同学们日常生活中，遗失物品是非常常见的事情。如：在食堂，临走时忘记了放在桌上的书本、背包；在运动场，忘记了自己放在一旁的衣服，物件等。诸如此类的事，往往会给失主带来经济上的损失。为了减少此类现象的发生，让失物更快的回到失主的手上，我们设计了“YNU-Loss-Found”这款校园失物招领网站。该项目采用前后端分离的设计，此为前端仓库，后端仓库地址为：[AlphaGogoo/YNU-LossFound-BackEnd (github.com)](https://github.com/AlphaGogoo/YNU-LossFound-BackEnd)

## 功能说明：

- 注册页面

    ![image-20220419183825810](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419183825-image-20220419183825810.png)

- 登录页面

    ![image-20220419183921699](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419183921-image-20220419183921699.png)

- 发布寻物启事

    若用户丢失了物品，可在发布启事界面选择发布寻物启事，填写失物的名称、丢失时间、丢失地点、失物的图片以及失主联系方式等信息，方便拾到失物的人快速联系到失主。

    ![image-20220419184015040](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419184015-image-20220419184015040.png)

- 发布招领启事

    若拾取失物者发现了某人遗失的物品，可在发布启事界面选择发布招领启事，填写拾取物的名称、丢失时间、丢失地点、拾取物的图片以及拾取者联系方式等信息，方便失主与拾取失物者联系。

    ![image-20220419184053173](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419184053-image-20220419184053173.png)

    **邮箱提醒功能**

    若失物上有失主的学号或者手机号信息，拾取失物者发布招领启事时可填写上失主的学号或手机号信息，那么系统就会从数据库中根据学号或者手机号检索注册用户，如果该用户注册了此系统，系统就会读取他的邮箱信息，并将“您有丢失物品被找到”消息发送到这个邮箱里。（若失物有邮箱信息，系统就会直接发送“您有丢失物品被找到”到这个邮箱里。）
    同时会附上拾取者留下的联系方式，让失主能在最短时间内找到失物。

    ![1](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419185306-1.png)

- 寻物广场与招领广场

    每有一篇寻物启事/招领启事被发布，就能够在寻物广场/招领广场找到相应的寻物/招领贴。

    ![2](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419185317-2.png)

    ![3](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419185320-3.png)

- 用户信息界面

    **查看与修改个人信息。**

    ![1](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419184645-1.png)

    ![2](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419184650-2.png)

    **修改密码**

    ![image-20220419184720559](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419184720-image-20220419184720559.png)

    **查看与删除自己发布的信息**

    ![3](https://ynu-lost-found.oss-cn-beijing.aliyuncs.com/20220419184837-3.png)

## 项目启动

本项目采用阿里云OSS存储图像，正常启动本项目，需要修改/src/utils/index.js目录下的createOSSClient()：

```js
export function createOSSClient() {
    return new OSS({
        bucket: 'xxxxxxxxxxx',
        region: 'xxxxxxxxxx',
        accessKeyId: 'xxxxxxxxxxx',
        accessKeySecret: 'xxxxxxxxxxxxxxxxxx'
    })
}
```



首先将本项目clone至本地：

```bash
git clone git@github.com:AlphaGogoo/YNU-LossFound-FrontEnd.git
```

进入项目路径下，下载相关依赖

```
cd YNU-LossFound-FrontEnd
npm install
```

### 开发环境的编译和热加载

```
npm run serve
```

### 生产环境下的编译和打包

```
npm run build
```

