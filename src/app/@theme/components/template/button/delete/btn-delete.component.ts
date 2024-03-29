import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-delete',
    templateUrl: './btn-delete.component.html',
    styleUrls: ['./btn-delete.component.scss']
})
export class BtnDeleteComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.delete;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'danger';
    }
}
