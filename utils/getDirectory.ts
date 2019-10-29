// @ts-ignore
const fs = require('fs');
// @ts-ignore
const path = require('path');

// input: directory path in str, output: array of objects containing description of files
const recursivelyGetDirectory = directory => new Promise((resolve, reject) => {
    const read = file => new Promise((resolve, reject) => {
        fs.lstat(file, (err, stat) => {
            if (err) reject(err);

            if (stat.isDirectory()) { // is directory
                recursivelyGetDirectory(file).then(result => {
                    resolve({
                        fileName: file,
                        isDirectory: () => true,
                        root: '',
                        children: result
                    })
                }).catch(err2 => reject(err2));
            } else {
                resolve({
                    fileName: file,
                    isDirectory: () => false,
                    root: '',
                    children: []
                });
            }
        });
    });
    read(directory).then(result => {
        resolve({
            file: directory,
            isDirectory: () => true,
            root: '',
            children: result
        });
    }).catch(error => reject(error));
});

// input: path to file, output: promise with file object
const readFile = file => new Promise((resolve, reject) => {
    const basename = path.basename(file);
    fs.lstat(file, (err, stats) => {
        if (err) return reject(err);

        if (stats.isDirectory()) {
            fs.readdir(file, (err, files) => {
                if (err) return reject(err);
                const output = {
                    name: basename,
                    path: file,
                    isDirectory: true,
                    children: []
                };
                files.forEach(eachFile => {
                    const stats2 = fs.lstatSync(file + '/' +eachFile);
                    if (stats2.isDirectory()) {
                        output.children.push({
                            name: eachFile,
                            path: file + '/' + eachFile,
                            isDirectory: true,
                            children: []
                        })
                    } else {
                        output.children.push({
                            name: eachFile,
                            path: file + '/' + eachFile,
                            isDirectory: false,
                            children: []
                        })
                    }
                });
                return resolve(output);
            });
        } else {
            return resolve({
                name: basename,
                path: file,
                isDirectory: false,
                children: [],
            })
        }
    });
});

module.exports = {
    recursivelyGetDirectory,
    readFile
};