import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-refresh',
    templateUrl: './btn-refresh.component.html',
    styleUrls: ['./btn-refresh.component.scss']
})
export class BtnRefreshComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.refresh;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'outline-secondary';
    }
}
