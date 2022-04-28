//时间戳转日期
import OSS from "ali-oss";
import {ElMessage} from "element-plus";

export function formatDate(time) {
    let date = new Date(parseInt(time));
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + MM + '-' + d;
}

export function createOSSClient() {
    return new OSS({
        bucket: 'xxxxxxxxxxx',
        region: 'xxxxxxxxxxx',
        accessKeyId: 'xxxxxxxxxxxxxxxxxx',
        accessKeySecret: 'xxxxxxxxxxxxxxxxxx'
    })
}

export function beforeImageUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
        ElMessage({
            showClose: true,
            message: '请上传jpg或png格式的图像',
            type: 'error',
            duration: 1000
        })
    }
    if (!isLt2M) {
        ElMessage({
            showClose: true,
            message: '图片大小不能超过2MB',
            type: 'error',
            duration: 1000
        })
    }
    return isJPG && isLt2M
}

export async function put_image(name, file, client, item) {
    try {
        let fileName = new Date().getTime() + name;
        let result = await client.put(fileName, file);
        if (Object.prototype.hasOwnProperty.call(item, "imageUrl")){
            item.imageUrl = result.url;
        }else if(Object.prototype.hasOwnProperty.call(item, "avatarurl")){
            item.avatarurl = result.url;
        }
        ElMessage({
            showClose: true,
            message: '上传成功',
            type: 'success',
            duration: 500
        })
    } catch (e) {
        console.log(e);
    }
}

export function uploadImage(event, client,item) {
    console.log(event)
    let file = event.file
    if (!file) {
        if (Object.prototype.hasOwnProperty.call(item, "imageUrl")){
            item.imageUrl = null;
        }else if(Object.prototype.hasOwnProperty.call(item, "avatarurl")){
            item.avatarurl = null;
        }
    } else {
        console.log(file.name);
        let param = new FormData();
        param.append('file', file, file.name);
        put_image(file.name, file, client,item);
    }
}

export function disabledDate(time) {
    return time.getTime() > Date.now()
}