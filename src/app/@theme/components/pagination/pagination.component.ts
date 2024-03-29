import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';

interface ItemPerPageMap {
    key: string;
    value: number;
}
@Component({
    selector: 'ngx-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class MdPaginationComponent implements OnInit {
    @Input() totalPages: number;
    @Input() currentPage: number;
    @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() pageSize: EventEmitter<number> = new EventEmitter<number>();

    selectRecordInPage: number = 10;
    activePage: number;
    lstRecordInPage: any[] = [
        { Value: 10, Text: '10 dòng' },
        { Value: 15, Text: '15 dòng' },
        { Value: 20, Text: '20 dòng' },
        { Value: 25, Text: '25 dòng' },
    ];
    constructor() {
    }

    ngOnInit(): void {
        this.activePage = this.currentPage;
    }

    previous() {
        if (this.activePage > 1) {
            this.activePage--;
            this.changeTotalItems();
        }
    }
    next() {
        if (this.activePage < this.totalPages) {
            this.activePage++;
            this.changeTotalItems();
        }
    }

    pageFirst() {
        if (this.activePage !== 1) {
            this.activePage = 1;
            this.changeTotalItems();
        }
    }

    pageLast() {
        if (this.activePage !== this.totalPages) {
            this.activePage = this.totalPages;
            this.changeTotalItems();
        }
    }

    changeNumberPage() {
        if (this.currentPage !== null && this.currentPage !== undefined && this.currentPage > 0 && this.currentPage < this.totalPages) {
            this.activePage = this.currentPage;
            this.changeTotalItems();
        }
    }

    pageNumber: 1;
    changeTotalItems() {
        return this.pageChange.emit(this.activePage);
    }

    changePerPage() {
        this.activePage = 1;
        return this.pageSize.emit(this.selectRecordInPage);
    }

}
