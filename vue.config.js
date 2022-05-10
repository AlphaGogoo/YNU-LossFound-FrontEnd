let proxyObj = {}
proxyObj['/']={
    ws:false,
    target:'http://127.0.0.1:8888',
    changeOrigin: true,
    pathRewrite:{
        '^/':'/'
    }
}


module.exports={
    devServer:{
        host:'127.0.0.1',
        port:8080,
        proxy:proxyObj
    },
    publicPath:'./'
}