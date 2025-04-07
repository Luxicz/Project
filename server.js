const http = require('http');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);

http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the custom HTML file
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading HTML file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/list') {
        // Serve the directory listing as JSON
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading directory' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(files));
        });
    } else {
        // Serve static files
        const filePath = path.join(directoryPath, req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(content);
        });
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});