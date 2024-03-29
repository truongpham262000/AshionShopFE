import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-download-template',
    templateUrl: './btn-download-template.component.html',
    styleUrls: ['./btn-download-template.component.scss']
})
export class BtnDownloadTemplateComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.downloadTemplate;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}
