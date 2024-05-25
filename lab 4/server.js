const express = require('express');
const os = require('os');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Сервер на Express.js [Добинда Юра]</h1>');
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/getdata', (req, res) => {
    res.json({
        date: new Date().toISOString(),
        user: os.userInfo().username
    });
});

app.get('/myfile', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'file1.txt'));
});

app.get('/mydownload', (req, res) => {
    res.download(path.join(__dirname, 'data', 'file2.txt'), 'file2.txt', {
        headers: {
            'Content-Type': 'text/plain',
            'Content-Disposition': 'attachment; filename="file2.txt"'
        }
    });
});

app.get('/myarchive', (req, res) => {
    res.download(path.join(__dirname, 'data', 'file1.txt.gz'), 'file1.txt.gz', {
        headers: {
            'Content-Type': 'application/gzip',
            'Content-Disposition': 'attachment; filename="file1.txt.gz"'
        }
    });
});

app.use((req, res) => {
    res.status(404).send('There is no such resource');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
