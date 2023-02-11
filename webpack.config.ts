import { Configuration } from 'webpack';
import path from 'path';

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: [path.resolve(__dirname, './src/index.ts')],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.config.json',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      // '~': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts'],
  },
};

export default config;
