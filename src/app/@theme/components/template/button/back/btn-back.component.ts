import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-back',
    templateUrl: './btn-back.component.html',
    styleUrls: ['./btn-back.component.scss']
})
export class BtnBackComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.back;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'outline-secondary';
    }
}
