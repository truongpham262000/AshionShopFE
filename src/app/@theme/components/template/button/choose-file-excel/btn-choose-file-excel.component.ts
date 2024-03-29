import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

class Guid {
    static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
@Component({
    selector: 'ngx-btn-choose-file-excel',
    templateUrl: './btn-choose-file-excel.component.html',
    styleUrls: ['./btn-choose-file-excel.component.scss']
})
export class BtnChooseFileExcelComponent implements OnInit {
    lbl: any = LBL_DISPLAY;
    @Input() multiple: boolean;
    @Input() color: string;
    idFile: string = Guid.newGuid();
    constructor() { }

    ngOnInit(): void {
      this.color = this.color ?? 'primary';
    }
}
