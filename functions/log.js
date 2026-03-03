const fs = require('fs')

function log(type, error) {
    const time = new Date().toISOString();
    const content = `[${time}] [${type}]\n${error?.stack || error}\n\n`;

    console.error(content);
    fs.appendFileSync("./logs/anticrash.log", content);
}

module.exports = log