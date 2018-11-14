var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './build/desktop-win32-x64',
    outputDirectory: './build/installer64',
    authors: 'Lambda App Inc.',
    exe: 'desktop.exe',
    description: 'Electron App'
  });

return resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));