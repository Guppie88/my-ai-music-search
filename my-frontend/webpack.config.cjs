const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/', // För att stödja React Router och historyApiFallback
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
        static: {
            directory: path.resolve(__dirname, 'public'), // För att servera statiska filer från 'public'-mappen
        },
        hot: true, // Aktivera Hot Module Replacement (HMR)
        open: true, // Öppna webbläsaren automatiskt när servern startar
        port: 8080, // Utvecklingsserverns port
        proxy: [
            {
                context: ['/api'], // Specificera vilka vägar som ska proxas
                target: 'http://localhost:5000', // Backend-serverns URL
                changeOrigin: true, // Ändra origin för proxade förfrågningar
                secure: false, // Tillåt osäkra certifikat för lokal utveckling
            },
        ],
        historyApiFallback: true, // För att stödja React SPA-routing (Single Page Applications)
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Tillåt import utan att ange filändelse
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env), // Stöd för miljövariabler i frontend
        }),
    ],
};
