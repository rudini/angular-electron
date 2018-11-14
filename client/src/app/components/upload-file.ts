import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-open-file',
    template: `
    <div>
        <button type="button" id="openFile" (click)="uploadFile()">Open File</button>
    </div>`
})
export class UploadFileComponent {
    constructor(private electronService: ElectronService) { }

    public uploadFile() {
        this.electronService.ipcRenderer.send('openFile');
    }
}
