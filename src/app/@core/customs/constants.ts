export const SUCCESS_RESPONSE = 'Success';
export const DUPLICATE_RESPONSE = 'Duplicate';
export const DELETED_RESPONSE = 'Deleted';
export const NOTFOUND_RESPONE = 'NotFound';
export const ERROR_RESPONE = 'Error';
export const SUCCESS_NOTICE = 'Thành công';
export const TITLE_NOTICE = 'Thông báo';

export const PAGE_SIZE = 10;

export const WIDTH_DIALOG = '100%';
export const HEIGHT_DIALOG = '100%';
export const SEARCH_LABEL = 'Tìm kiếm';
export const REFRESH_LABEL = 'Làm mới';
export const ADDNEW_LABEL = 'Thêm mới';
export const EDIT_LABEL = 'Cập nhật';
export const DETAIL_LABEL = 'Chi tiết';
export const DELETE_LABEL = 'Xóa';
export const SHARE_LABEL = 'Chia sẻ';
export const RECOVER_LABEL = 'Thu hồi';
export const IMPORT_LABEL = 'Import';

export const LBL_DISPLAY = {
  syncNgsp: 'Đồng bộ NGSP',
  add: 'Thêm mới',
  edit: 'Sửa',
  update: 'Cập nhập',
  delete: 'Xóa',
  view: 'Xem',
  search: 'Tìm kiếm',
  save: 'Lưu',
  close: 'Đóng',
  back: 'Quay lại',
  refresh: 'Làm mới',
  file: 'Chọn file',
  download: 'Tải xuống',
  apidata: 'Dữ liệu API',
  confirm: 'Xác nhận',
  cancel: 'Huỷ',
  print: 'In',
  chooseImportFile: 'Chọn file import',
  downloadTemplate: 'Tải file template',
  importFile: 'Import',
};

export enum PostStatus {
  Drafting = 0,
  Posted = 1,
  Revoked = 2,
}

export enum ShareType {
  Goverment = 0,
  Citizen = 1,
}

export const LIST_STATUS = [
  { value: 0, text: "Không sử dụng" },
  { value: 1, text: "Sử dụng" }
];

export const LIST_STATUS_FEEDBACK = [
  { value: 0, text: "Chưa phản hồi" },
  { value: 1, text: "Đã phản hồi" }
]

export const LIST_STATUS_CLASS_ROOM = [
  { value: 0, text: "Chưa học" },
  { value: 1, text: "Đang học" },
  { value: 2, text: "Hoàn thành" }
];

export const TYPE_COOKIE = 'selected_type';

export const FORM_ACTION = {
  CREATE: 1,
  EDIT: 2,
  DETAIL: 3,
  DELETE: 4,
  SHARE: 5,
  RECOVER: 6,
  IMPORT: 7,
};

export const ACTION_NAMES = [
  { TYPE: FORM_ACTION.CREATE, VALUE: ADDNEW_LABEL },
  { TYPE: FORM_ACTION.EDIT, VALUE: EDIT_LABEL },
  { TYPE: FORM_ACTION.DETAIL, VALUE: DETAIL_LABEL },
  { TYPE: FORM_ACTION.DELETE, VALUE: DELETE_LABEL },
  { TYPE: FORM_ACTION.SHARE, VALUE: SHARE_LABEL },
  { TYPE: FORM_ACTION.RECOVER, VALUE: RECOVER_LABEL },
  { TYPE: FORM_ACTION.IMPORT, VALUE: IMPORT_LABEL },
];

export const ALPHABET_ARRAY = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const ROLE  = {
  XEM: '1',
  THEM: '2',
  CAPNHAT: '3',
  XOA: '4',
  IMPORT: '5',
  CHIASE: '6',
  THUHOI: '7',
  DONGBO: '8',
};

export const STATUS_ACTION = {
  create: 1,
  detail: 2,
  edit: 3,
  dky: 4,
  role: 5,
  import: 6,
  extends: 7,
  records: 8,
  delete: 99
};

export const LIST_DAY = [
  { value: 1, text: 'Thứ 2' },
  { value: 2, text: 'Thứ 3' },
  { value: 3, text: 'Thứ 4' },
  { value: 4, text: 'Thứ 5' },
  { value: 5, text: 'Thứ 6' },
  { value: 6, text: 'Thứ 7' },
  { value: 7, text: 'Chủ nhật' },
];

export const LIST_STATUS_USER = [
  { text: "Đang sử dụng", value: 1 },
  { text: "Không sử dụng", value: 0 }
];

export const LIST_ACTIVE_USER = [
  { text: "Đã kích hoạt", value: 1 },
  { text: "Chưa kích hoạt", value: 0 }
];

export const LIST_GENDER = [
  { text: "Nam", value: 1 },
  { text: "Nữ", value: 0 }
];

export const TYPE_DANHMUC = {
  BAI_VIET: '1',
  PRODUCT: '2',
}

export const LIST_MONTH = [
  { value: 1, text: 'Tháng 1' },
  { value: 2, text: 'Tháng 2' },
  { value: 3, text: 'Tháng 3' },
  { value: 4, text: 'Tháng 4' },
  { value: 5, text: 'Tháng 5' },
  { value: 6, text: 'Tháng 6' },
  { value: 7, text: 'Tháng 7' },
  { value: 8, text: 'Tháng 8' },
  { value: 9, text: 'Tháng 9' },
  { value: 10, text: 'Tháng 10' },
  { value: 11, text: 'Tháng 11' },
  { value: 12, text: 'Tháng 12' },
];