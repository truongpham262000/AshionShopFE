import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
    selector: 'ngx-btn-search',
    templateUrl: './btn-search.component.html',
    styleUrls: ['./btn-search.component.scss']
})
export class BtnSearchComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.search;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}
