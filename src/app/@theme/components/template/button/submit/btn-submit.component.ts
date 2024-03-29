import { LBL_DISPLAY } from './../../../../../@core/customs/constants';
import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-btn-submit',
    templateUrl: './btn-submit.component.html',
    styleUrls: ['./btn-submit.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class BtnSubmitComponent implements OnInit {
    @Input() text: string;
    @Input() color: string;
    @Input() disabled: boolean;
    @Input() icon: string;
    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.save;
        this.icon = this.icon ?? 'fas fa-save';
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}
