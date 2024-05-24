const http = require("http");
const fs = require("fs");
const os = require("os");
const zlib = require("zlib");
const path = require("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Сервер на Node.js [Добинда Юра]</h1>");
    } else if (req.url === "/about") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Про нас</h1><p>Текстовий абзац деякої інформації про нас</p>");
    } else if (req.url === "/getdata") {
        const data = {
            date: new Date().toISOString(),
            user: os.userInfo().username,
        };
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
    } else if (req.url === "/myfile") {
        const filePath = path.join(__dirname, "data", "file1.txt");
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Error reading file");
                return;
            }
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(data);
        });
    } else if (req.url === "/mydownload") {
        const filePath = path.join(__dirname, "data", "file2.txt");
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="file2.txt"',
        );
        fs.createReadStream(filePath).pipe(res);
    } else if (req.url === "/myarchive") {
        const filePath = path.join(__dirname, "data", "file1.txt");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/gzip");
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="file1.txt.gz"',
        );
        const readStream = fs.createReadStream(filePath);
        const gzip = zlib.createGzip();
        readStream.pipe(gzip).pipe(res);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Сторінку не знайдено</h1>");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
