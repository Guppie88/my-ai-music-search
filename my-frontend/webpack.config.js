import path from 'path';

export default {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        static: './public',
        hot: true,
        open: true,
        port: 8080,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
