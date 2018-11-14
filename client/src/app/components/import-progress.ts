import { Component, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-import-progress',
    template: `Import progress: <progress value="{{onProgressChanged$ | async}}" max="100"></progress>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportProgressComponent {

    onProgressChanged$ = new EventEmitter<number>();

    constructor(private electronService: ElectronService, private changeDetectorRef: ChangeDetectorRef) {

        this.electronService.ipcRenderer.on('progressChanged', (sender, data) => {
            console.log('progressChanged', data);
            this.onProgressChanged$.next(data);
            this.changeDetectorRef.detectChanges();
        });
    }
}
