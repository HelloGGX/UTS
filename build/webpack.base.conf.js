const productionConfig = require('./webpack.prod.conf') // 生产环境配置
const developmentConfig = require('./webpack.dev.conf') // 开发环境配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const HappyPack = require('happypack')
const globalConfig = require('./global.conf')
const pagesConfig = require('./pages.conf')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const extractCss = new MiniCssExtractPlugin({
  filename: 'css/[name]-bundle-[chunkHash:5].css',
  chunkFilename: 'css/[name]-bundle-[chunkHash:5].css'
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const generateConfig = (env) => {
  const scriptLoader = [ 'babel-loader' ]
  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        camelCase: true,
        minimize: true,
        sourceMap: env === 'development'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: env === 'development',
        plugins: [
          // 自动加浏览器前缀
          require('autoprefixer')()
        ]
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: env === 'development'
      }
    }
  ]
  const styleLoader = env === 'production'
    ? [{
      loader: MiniCssExtractPlugin.loader
    }].concat(cssLoaders) : [{
      loader: 'style-loader'
    }].concat(cssLoaders)

  const fileLoader = (path) => {
    return env === 'development'
      ? [
        {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:5].[ext]',
            publicPath: '../imgs',
            outputPath: path
          }
        }
      ]
      : [
        {
          loader: 'url-loader', // 带图片转base64功能
          options: {
            name: '[name]-[hash:5].[ext]',
            limit: 1600, // 1600=16kb
            outputPath: path,
            publicPath: '/imgs'
          }
        }
      ]
  }

  const entry = (env) => {
    let obj = { base: resolve('src/common/js/base.js') }
    if (env === 'development') {
      return Object.assign(obj, { libs: globalConfig.dependencies })
    } else {
      return obj
    }
  }

  return {
    mode: env,
    target: 'web',
    context: path.resolve(__dirname, '../'),
    entry: entry(env),
    resolve: {
      extensions: [ '.js', '.json' ],
      alias: {
        '@': resolve('src'),
        common: resolve('src/common'),
        components: resolve('src/components'),
        assets: resolve('src/assets'),
        vendor: resolve('src/vendor'),
        example: resolve('src/example')
      }
    },
    externals: {
      Swiper: 'Swiper',
      BMap: 'BMap'
    },
    output: {
      path: resolve('dist'),
      filename: 'js/[name].[hash:5].js',
      chunkFilename: 'js/[name].[chunkhash:5].js',
      publicPath: env === 'production' ? '/' : '',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: '/node_modules/',
          enforce: 'pre'
        },
        {
          // 处理js
          test: /\.js$/,
          include: [
            resolve('src/common/js'),
            resolve('src/components/'),
            resolve('src/examples/'),
            resolve('src/vendor')
          ],
          exclude: [ resolve('src/dll'), '/node_modules/' ],
          use: scriptLoader
        },
        {
          // 处理less
          test: /\.less$/,
          use: styleLoader
        },
        {
          // 处理css
          test: /\.css$/,
          use: styleLoader
        },
        {
          // 图片的转换和压缩
          test: /\.(png|jpg|jpeg|gif)$/,
          use: fileLoader('imgs/').concat(
            env === 'production'
              ? {
                loader: 'img-loader', // 压缩图片
                options: {
                  pngquant: {
                    quality: 80
                  }
                }
              }
              : []
          )
        },
        {
          // 处理字体文件
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: fileLoader('fonts/')
        }
      ]
    },
    plugins: [
      extractCss,
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
    ]
  }
}

module.exports = (env) => {
  const baseConfig = merge([ generateConfig(env) ].concat(pagesConfig))
  let runConfig = env === 'production' ? productionConfig : developmentConfig

  return merge(baseConfig, runConfig)
}
