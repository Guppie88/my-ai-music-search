const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Säkerställ att output-filen matchar referensen i HTML
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
        static: './public', // Säkerställ att mappen public används för statiska filer
        hot: true,
        open: true,
        port: 8080,
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Tillåter att importera filer utan tillägg
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
