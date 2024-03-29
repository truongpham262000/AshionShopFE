import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-save',
    templateUrl: './btn-save.component.html',
    styleUrls: ['./btn-save.component.scss']
})
export class BtnSaveComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.save;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}
