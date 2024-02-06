const express = require("express");
// const fs = require("fs");
// const url = require("url");

const app = express();
const port = 3000;

app.get('/', (req, resp) => {
    return resp.send("Hello from home page");
});

app.get("/about", (req, resp) => {
    return resp.send("Hello ${req.query.name}");
});

app.all('/signup', (req, resp) => {
    if (req.method === "GET") {
        return resp.send('This is a signup form');
    } else if (req.method === "POST") {
        // Handle signup form submission (database query, etc.)
        return resp.send("Success");
    }
});

// Logging middleware
app.use((req, res, next) => {
    const log = `${Date.now()} - New Request Received: ${req.url}`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile('log.txt', log, (err, data) => {
        if (err) {
            console.error(err);
        }
    });

    next();
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
