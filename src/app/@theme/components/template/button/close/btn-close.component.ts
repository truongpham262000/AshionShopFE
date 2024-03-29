import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-close',
    templateUrl: './btn-close.component.html',
    styleUrls: ['./btn-close.component.scss']
})
export class BtnCloseComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.close;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'outline-secondary';
    }
}
