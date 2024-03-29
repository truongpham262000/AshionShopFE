import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-btn-sync',
    templateUrl: './btn-sync.component.html',
    styleUrls: ['./btn-sync.component.scss']
})
export class BtnSyncComponent implements OnInit {
    @Input() disabled: boolean;
    @Input() color: string;
    @Input() text: string;

    constructor() {
    }

    ngOnInit(): void {
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'warning';
    }
}
