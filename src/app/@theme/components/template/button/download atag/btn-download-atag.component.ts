import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
  selector: 'ngx-btn-download-atag',
  templateUrl: './btn-download-atag.component.html',
  styleUrls: ['./btn-download-atag.component.scss']
})
export class BtnDownloadATagComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
    this.text = this.text ?? LBL_DISPLAY.download;
  }

}
