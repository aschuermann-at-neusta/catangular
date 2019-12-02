import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { CommonSelectOptionInterface } from './common-select-option.interface';

@Component({
    selector: 'app-common-select',
    templateUrl: './common-select.component.html',
    styleUrls: [ './common-select.component.scss' ]
})
export class CommonSelectComponent implements OnInit {

    @Output() selectedOption: EventEmitter<CommonSelectOptionInterface>
        = new EventEmitter<CommonSelectOptionInterface>();
    @Input() options: CommonSelectOptionInterface[];

    constructor() {
    }

    ngOnInit() {
    }

    selectionChanged(selected: MatSelectChange) {
        const selectValue = this.options.find((option) => option.id === selected.value);
        this.selectedOption.emit(selectValue);
    }

}
