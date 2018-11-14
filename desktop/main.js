"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// import { app, BrowserWindow, ipcMain, dialog } from 'electron';
const url = require("url");
const path = require("path");
let win;
const Knex = require("knex");
const knex = Knex({
    client: "sqlite3",
    connection: {
        filename: path.join(__dirname, "../db/", "database.sqlite")
    }
});
knex.schema
    .createTableIfNotExists("facts", tableBuilder => {
    tableBuilder.increments("id");
    tableBuilder.integer("time_dimension");
    tableBuilder.integer("index_dimension");
    tableBuilder.decimal("index_value");
})
    .then(_ => {
    return knex.insert({ time_dimension: 1, index_dimension: 1, index_value: 1017.1 }).into("facts");
}).then(rows => {
    console.log(rows);
}).catch(e => console.log(e));
electron_1.ipcMain.on('openFile', (_, __) => {
    if (win !== null) {
        // const selectedFiles: string[] = 
        electron_1.dialog.showOpenDialog(win, { title: 'Open a file to import' });
        win.webContents.send('progressChanged', 10);
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "app/index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on("closed", () => {
        // dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    // on macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // on macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map