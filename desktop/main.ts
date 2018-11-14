import { app, BrowserWindow, ipcMain, WebContents, dialog } from 'electron';
import * as url from 'url';
import * as path from 'path';
let win: BrowserWindow | null;

import * as Knex from 'knex';

const knex: Knex = Knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../db/', 'database.sqlite')
    }
});

knex.schema
    .createTableIfNotExists("facts", tableBuilder => {
        tableBuilder.increments("id");
        tableBuilder.integer("time_dimension");
        tableBuilder.integer("index_dimension");
        tableBuilder.decimal("index_value");
    })
    .then(_ =>  {
        return knex.insert({ time_dimension: 1, index_dimension: 1, index_value: 1017.1 }).into("facts");
    }).then(rows => {
        console.log(rows);
    }).catch(e => console.log(e));

ipcMain.on('openFile', (_: WebContents, __: any) => {
    if (win !== null) {
        // const selectedFiles: string[] = 
        dialog.showOpenDialog(win, { title: 'Open a file to import' });
        win.webContents.send('progressChanged', 10);
    }
    
});

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 });

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "app/index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    win.webContents.openDevTools();

    win.on('closed', () => {
        // dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // on macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on('activate', () => {
    // on macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
