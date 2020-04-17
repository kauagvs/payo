import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Launchs } from 'src/app/shared/launchs.interface';
import { itemLauch } from './../../../shared/item-lauch.interface';


@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss']
})
export class DefaultTableComponent implements OnInit {


  constructor() { }

  @Input() dataTable: any[];
  tableHeader: any[];
  tableRow: any[];

  ngOnInit(): void {
    this.tableHeader = this.dataTable.map((item: itemLauch) => {
      return item
    })
    console.log(this.tableHeader);
  }
}
