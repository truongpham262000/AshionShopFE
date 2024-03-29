import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
  selector: 'ngx-btn-download',
  templateUrl: './btn-download.component.html',
  styleUrls: ['./btn-download.component.scss']
})
export class BtnDownloadComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() color: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
    this.text = this.text ?? LBL_DISPLAY.download;
    this.disabled = this.disabled ?? false;
    this.color = this.color ?? 'success';
  }

}
