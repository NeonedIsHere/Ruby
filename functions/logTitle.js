function logTitle(text, firstLine = true, length = 60, char = "─") {
    const side = Math.floor((length - text.length - 2) / 2);
    const line = char.repeat(side) + " " + text + " " + char.repeat(side);

    if (firstLine) {
        console.log(`┌──${line}`);
    } else {
        console.log(`├──${line}`);
    }
}

module.exports = logTitle;