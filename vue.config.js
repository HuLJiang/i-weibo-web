module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = "微博";
        return args;
      })
  },
  devServer: {
    // development server port 8000
    port: 8083,
    // If you want to turn on the proxy, please remove the mockjs /src/main.js L16
    proxy: {
      '/api': {
        //目标地址
        target: 'http://localhost:8899',
        // ws: false,
        changeOrigin: true,
        //通过pathRewrite重写地址，将前缀/api转为/
        pathRewrite: {
          '^/api': ''
        },
      }
    },
  }
}