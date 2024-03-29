
import { DatePipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import {
  TITLE_NOTICE,
  SUCCESS_NOTICE,
  ROLE,
} from './constants';
import { MatDialogConfig } from '@angular/material/dialog';
import { SysUserModel } from '../data/ashion-shop.service';

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(
    private toastrService: NbToastrService,
  ) {}

  getUserInfor() {
    const data = localStorage.getItem("User");
    const dataUser: SysUserModel = new SysUserModel(JSON.parse(data));
    return dataUser;
  }

  getCurrentWeekOfCurrentYear() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor(
      (<any>currentDate - <any>startDate) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil(days / 7);
  }

  getWeekNumber(d: Date) {
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((<any>d - <any>yearStart) / 86400000 + 1) / 7);
    return [d.getFullYear(), weekNo];
  }

  weeksInYear(year) {
    const d = new Date(year, 11, 31);
    const week = this.getWeekNumber(d)[1];
    return week === 1 ? 52 : week;
  }

  mapRole(lstRole: string[]): IRole {
    const role: IRole = {
      XEM: lstRole.some((x) => x === ROLE.XEM),
      THEM: lstRole.some((x) => x === ROLE.THEM),
      CAPNHAT: lstRole.some((x) => x === ROLE.CAPNHAT),
      XOA: lstRole.some((x) => x === ROLE.XOA),
      IMPORT: lstRole.some((x) => x === ROLE.IMPORT),
      CHIASE: lstRole.some((x) => x === ROLE.CHIASE),
      THUHOI: lstRole.some((x) => x === ROLE.THUHOI),
      DONGBO: lstRole.some((x) => x === ROLE.DONGBO),
    };
    return role;
  }

  toastrSuccess(message?: string, title?: string) {
    this.toastrService.success(
      message ?? SUCCESS_NOTICE,
      title ?? TITLE_NOTICE,
      { icon: "" }
    );
  }

  base64FileImg(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
     return reader.result.toString();
    };
  }

  listFileString: string[] = [];
  base64ListFile(event: File[]) {
    for (let i = 0; i < event.length; i++) {
    const reader = new FileReader();
    reader.readAsDataURL(event[i]);
    reader.onload = () => {
      this.listFileString.push(reader.result.toString());
    };
  }
    return this.listFileString;
  }

  durationDefault = 3000;
  toastrPrimary(message: string, duration?: number, title?: string) {
    this.toastrService.primary(message, title ?? TITLE_NOTICE, {
      icon: "",
      duration: duration ?? this.durationDefault,
    });
  }

  toastrWarning(message: any, duration?: number, title?: string) {
    this.toastrService.warning(message, title ?? TITLE_NOTICE, {
      icon: "",
      duration: duration ?? this.durationDefault,
    });
  }

  toastrDanger(message: string, duration?: number, title?: string) {
    this.toastrService.danger(message, title ?? TITLE_NOTICE, {
      icon: "",
      duration: duration ?? this.durationDefault,
    });
  }

  toastrInfo(message: string, duration?: number, title?: string) {
    this.toastrService.info(message, title ?? TITLE_NOTICE, {
      icon: "",
      duration: duration ?? this.durationDefault,
    });
  }

  toastrShow(message: string, duration?: number, title?: string) {
    this.toastrService.show(message, title ?? TITLE_NOTICE, {
      icon: "",
      duration: duration ?? this.durationDefault,
    });
  }

  toastrDefault(message: string, duration?: number, title?: string) {
    this.toastrService.default(message, title ?? TITLE_NOTICE, {
      icon: "",
      duration: duration ?? this.durationDefault,
    });
  }

  getListYear(value: number = 16): number[] {
    const lstYear: number[] = [];
    for (
      let i = new Date().getFullYear() + value;
      i >= new Date().getFullYear() - value;
      i--
    ) {
      lstYear.push(i);
    }
    return lstYear;
  }

  configDialog(widthDialog: string, data: any): MatDialogConfig {
    const DIALOG_CONFIG = new MatDialogConfig();
    DIALOG_CONFIG.disableClose = false;
    DIALOG_CONFIG.width = widthDialog;
    DIALOG_CONFIG.height = "auto";
    // DIALOG_CONFIG.maxWidth = WIDTH_DIALOG;
    // DIALOG_CONFIG.maxHeight = HEIGHT_DIALOG;
    DIALOG_CONFIG.data = data;
    return DIALOG_CONFIG;
  }
}

// tslint:disable-next-line: component-class-suffix
export class VitualScrollNgSelect {
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  vitualData = [];
  lstVitualScroll = [];
  bufferSize = 10;

  constructor() {}

  setDataForVitualScroll(lst: any[]) {
    this.vitualData = lst;
    this.lstVitualScroll = this.vitualData.slice(0, this.bufferSize);
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.vitualData.length <= this.lstVitualScroll.length) {
      return;
    }

    if (
      end + this.numberOfItemsFromEndBeforeFetchingMore >=
      this.lstVitualScroll.length
    ) {
      this.fetchMore();
    }
  }
  private fetchMore() {
    const len = this.lstVitualScroll.length;
    const more = this.vitualData.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.lstVitualScroll = this.lstVitualScroll.concat(more);
    }, 200);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  filter(array, string) {
    function convertDate(params: string, str: string) {
      if ((params !== null || params !== undefined) && params.length === 8) {
        try {
          const year = params.substr(0, 4);
          const month = params.substr(4, 2);
          const day = params.substr(6, 2);
          if (`${day}/${month}/${year}`.includes(str)) {
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return false;
    }
    function checkData(params: string, str: string) {
      return params.toLowerCase().includes(str.toLowerCase()) ||
        convertDate(params, str)
        ? true
        : false;
    }
    if (
      (array !== null || array !== undefined) &&
      (string !== null || string !== undefined) &&
      string !== ''
    ) {
      return array.filter((o) =>
        Object.keys(o).some((k) =>
          typeof o[k] === 'string'
            ? checkData(o[k], string)
            : typeof o[k] === 'number'
            ? o[k].toString().includes(string.toLowerCase())
            : false
        )
      );
    }
    return array;
  }

  searchItem(string: string, obj: any) {
    function convertDate(params: string, str: string) {
      if ((params !== null || params !== undefined) && params.length === 8) {
        try {
          const year = params.substr(0, 4);
          const month = params.substr(4, 2);
          const day = params.substr(6, 2);
          if (`${day}/${month}/${year}`.includes(str)) {
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return false;
    }

    function checkData(params: string, str: string) {
      return params.toLowerCase().includes(str.toLowerCase()) ||
        convertDate(params, str)
        ? true
        : false;
    }

    return Object.keys(obj).some((k) =>
      typeof obj[k] === 'string'
        ? checkData(obj[k], string)
        : typeof obj[k] === 'number'
        ? obj[k].toString().includes(string.toLowerCase())
        : false
    );
  }
}

@Pipe({
  name: 'pipeDate',
})
export class ConvertDatePipe implements PipeTransform {
  //#region CONVERT_DATE

  transform(value: any) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'yyyy-MM-dd');
    return value;
  }

  convertDateToString(target: Date): string {
    if (target) {
      return this.transform(target.toString());
    }
    return null;
  }
  convertStringToDateString(target: string): string {
    if (target) {
      if (target.length === 8) {
        const year = target.substr(0, 4);
        const month = target.substr(4, 2);
        const day = target.substr(6, 2);
        return day + '/' + month + '/' + year;
      } else if (target.length === 10) {
        const year = target.substr(0, 4);
        const month = target.substr(5, 2);
        const day = target.substr(8, 2);
        return day + '/' + month + '/' + year;
      }
      return target;
    }
  }
  convertStringToDate(target: string): Date {
    if (target && target.length === 8) {
      const year = +target.substr(0, 4);
      const month = +target.substr(4, 2);
      const day = +target.substr(6, 2);
      return new Date(year, month, day);
    }
    return null;
  }

  convertStringVnToDate(target: string): Date {
    if (target && target.length === 10) {
      const year = +target.substr(6, 4);
      const month = +target.substr(3, 2);
      const day = +target.substr(0, 2);
      return new Date(year, month, day);
    }
    return null;
  }

  convertStringToFormatInput(target: string): string {
    if (target && target.length === 8) {
      const year = target.substr(0, 4);
      const month = target.substr(4, 2);
      const day = target.substr(6, 2);
      return year + '-' + month + '-' + day;
    }
    return target;
  }

  convertStringddMMyyyyToFormatTextVN(target: string) {
    if (target && target.length === 8) {
      const year = target.substr(0, 4);
      const month = target.substr(4, 2);
      const day = target.substr(6, 2);
      return 'Ngày ' + day + ' tháng ' + month + ' năm ' + year;
    }
    return target;
  }

  convertStringDisplayToDateString(target: string) {
    if (target && target.length === 10) {
      const year = target.substr(0, 4);
      const month = target.substr(5, 2);
      const day = target.substr(8, 2);
      return year + month + day;
    }
    return target;
  }
  //#endregion
}

export interface IRole {
  XEM: boolean;
  THEM: boolean;
  CAPNHAT: boolean;
  XOA: boolean;
  IMPORT: boolean;
  CHIASE: boolean;
  THUHOI: boolean;
  DONGBO: boolean;
}

export class Role implements IRole {
  XEM: boolean;
  THEM: boolean;
  CAPNHAT: boolean;
  XOA: boolean;
  IMPORT: boolean;
  CHIASE: boolean;
  THUHOI: boolean;
  DONGBO: boolean;
}
