const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'sketch.js',
        path: path.resolve(__dirname, 'build'),
    },
    performance: {
        hints: false
    }
};