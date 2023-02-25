module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '././' : './',
  "transpileDependencies": [
    "vuetify"
  ]
  ,
  devServer: {
    // proxy: 'https://localhost:8080'
    // proxy: 'https://apiemovil1234.herokuapp.com/'
  }
}