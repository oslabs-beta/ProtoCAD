// @ts-ignore
const fs = require('fs');
// @ts-ignore
const path = require('path');

module.exports = (path, data) => {
    const exists = fs.existsSync(path);
    if (exists) {
        fs.writeFile(path, data, err => {

        });
    } else {

    }
};