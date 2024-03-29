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
    selector: 'ngx-btn-file',
    templateUrl: './btn-file.component.html',
    styleUrls: ['./btn-file.component.scss']
})
export class BtnFileComponent implements OnInit {
    lbl: any = LBL_DISPLAY;
    @Input() multiple: boolean;
    idFile: string = Guid.newGuid();
    constructor() { }

    ngOnInit(): void {
      let file  = null;
     }
}
