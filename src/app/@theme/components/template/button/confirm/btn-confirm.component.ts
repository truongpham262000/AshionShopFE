import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-confirm',
    templateUrl: './btn-confirm.component.html',
    styleUrls: ['./btn-confirm.component.scss']
})
export class BtnConfirmComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.confirm;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'success';
    }
}
