//index.js
const http = require("http");
const fs = require("fs");

const myserver = http.createServer((req, resp) => {
    const log = `${Date.now()} - New Request Received: ${req.url}`;
    fs.appendFile('log.txt', log, (err, data) => {
        if (err) {
            console.error(err);
        }
    });

    switch (req.url) {
        case "/":
            resp.end("HomePage");
            break;
        case "/about":
            resp.end("About Page");
            break;
        default:
            resp.end("404 Not Found");
    }
});

myserver.listen(3000, () => console.log("Server Started"));
