const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Функція для створення нового файлу
function CreateFileFunc() {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(filePath, 'Свіжий і бадьорий', (err) => {
                if (err) throw err;
                console.log('File created successfully');
            });
        } else {
            console.log('CREATE operation failed');
        }
    });
}

// Функція для копіювання папки
function CopyFilesFunc() {
    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    fs.access(destDir, fs.constants.F_OK, (err) => {
        if (err) {
            fs.cp(srcDir, destDir, { recursive: true }, (err) => {
                if (err) throw err;
                console.log('Directory copied successfully');
            });
        } else {
            console.log('COPY operation failed');
        }
    });
}

// Функція для перейменування файлу
function RenameFileFunc() {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');

    fs.access(oldPath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.access(newPath, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw err;
                        console.log('File renamed successfully');
                    });
                } else {
                    console.log('RENAME operation failed');
                }
            });
        } else {
            console.log('RENAME operation failed');
        }
    });
}

// Функція для видалення файлу
function DeleteFileFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(filePath, (err) => {
                if (err) throw err;
                console.log('File deleted successfully');
            });
        } else {
            console.log('DELETE operation failed');
        }
    });
}

// Функція для виведення списку файлів
function ListFilesFunc() {
    const dirPath = path.join(__dirname, 'files');

    fs.access(dirPath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.readdir(dirPath, (err, files) => {
                if (err) throw err;
                console.log('Files:', files);
            });
        } else {
            console.log('LIST operation failed');
        }
    });
}

// Функція для читання файлу
function ReadFileFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) throw err;
                console.log('File content:', data);
            });
        } else {
            console.log('READ operation failed');
        }
    });
}

// Функція для читання файлу з використанням потоку
function ReadStreamFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            const readStream = fs.createReadStream(filePath, 'utf8');
            readStream.on('data', (chunk) => {
                console.log('File content:', chunk);
            });
            readStream.on('error', (err) => {
                console.log('READ STREAM operation failed');
            });
        } else {
            console.log('READ STREAM operation failed');
        }
    });
}

// Функція для запису у файл з використанням потоку
function WriteStreamFunc(data) {
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            const writeStream = fs.createWriteStream(filePath);
            writeStream.write(data);
            writeStream.end();
            console.log('Data written successfully');
        } else {
            console.log('WRITE STREAM operation failed');
        }
    });
}

// Функція для стиснення файлу
function CompressFunc() {
    const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const compressedPath = path.join(__dirname, 'archives', 'archive.gz');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.access(compressedPath, fs.constants.F_OK, (err) => {
                if (err) {
                    const readStream = fs.createReadStream(filePath);
                    const writeStream = fs.createWriteStream(compressedPath);
                    const gzip = zlib.createGzip();

                    readStream.pipe(gzip).pipe(writeStream).on('finish', (err) => {
                        if (err) throw err;
                        console.log('File compressed successfully');
                    });
                } else {
                    console.log('COMPRESS operation failed');
                }
            });
        } else {
            console.log('COMPRESS operation failed');
        }
    });
}

// Функція для розпакування файлу
function DecompressFunc() {
    const compressedPath = path.join(__dirname, 'archives', 'archive.gz');
    const decompressedPath = path.join(__dirname, 'files', 'decompressedFile.txt');

    fs.access(compressedPath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.access(decompressedPath, fs.constants.F_OK, (err) => {
                if (err) {
                    const readStream = fs.createReadStream(compressedPath);
                    const writeStream = fs.createWriteStream(decompressedPath);
                    const gunzip = zlib.createGunzip();

                    readStream.pipe(gunzip).pipe(writeStream).on('finish', (err) => {
                        if (err) throw err;
                        console.log('File decompressed successfully');
                    });
                } else {
                    console.log('DECOMPRESS operation failed');
                }
            });
        } else {
            console.log('DECOMPRESS operation failed');
        }
    });
}

// Виклик функцій для тестування
CreateFileFunc();
CopyFilesFunc();
RenameFileFunc();
DeleteFileFunc();
ListFilesFunc();
ReadFileFunc();
ReadStreamFunc();
WriteStreamFunc('Some data to write to the file');
CompressFunc();
DecompressFunc();
