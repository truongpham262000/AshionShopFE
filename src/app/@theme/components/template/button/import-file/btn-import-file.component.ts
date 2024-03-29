import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-import-file',
    templateUrl: './btn-import-file.component.html',
    styleUrls: ['./btn-import-file.component.scss']
})
export class BtnImportFileComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.importFile;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'success';
    }
}
