import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../@core/customs/constants';

@Component({
  selector: 'ngx-btn-cancel',
  templateUrl: './btn-cancel.component.html',
  styleUrls: ['./btn-cancel.component.scss']
})
export class BtnCancelComponent implements OnInit {
  @Input() color: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
    this.text = this.text ?? LBL_DISPLAY.cancel;
    this.color = this.color ?? 'outline-secondary';
  }

}
