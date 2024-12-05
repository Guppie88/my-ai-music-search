const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
        proxy: [
            {
                context: ['/api'], // Vägar som ska proxas
                target: 'http://localhost:5000', // Backend-servern
                changeOrigin: true,
                secure: false, // Tillåt osäkra certifikat för lokal utveckling
            },
        ],
        historyApiFallback: true, // För React SPA-routing
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};