const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// let data = this;
// console.log("this", data); // this {}

// =============================================
const myLogger = function (req, res, next) {
    console.log("LOGGED");
    next();
};

// To load M func, call app.use(), specifying M func.
// M funcs that are loaded first are also executed first.
// app.get("/", myLogger); // так тоже работает
app.use(myLogger);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// =============================================
const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime);

app.get("/time", (req, res) => {
    let responseText = 'Hello World!<br>';
    responseText += `<small>Requested at: ${req.requestTime}</small>`;
    res.send(responseText);
});

// =====================??????========================
async function cookieValidator(cookies) {
    try {
        await externallyValidateCookie(cookies.testCookie)
    } catch {
        throw new Error('Invalid cookies')
    }
}

async function validateCookies(req, res, next) {
    console.log(req.cookies)
    await cookieValidator(req.cookies);
    next();
};

// почему тут вызов функции, а дальше - нет??
app.use(cookieParser());

app.use(validateCookies);

// error handler
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

app.listen(3000);