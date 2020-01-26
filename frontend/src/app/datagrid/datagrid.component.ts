import { Component, ViewChild, ElementRef, AfterViewInit, OnInit }  from '@angular/core';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'

import { HttpService } from '../http.service';

import { generatedata } from '../../../sampledata/generatedata';

import { jqxMenuComponent } from 'jqwidgets-ng/jqxmenu';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})

export class DatagridComponent implements AfterViewInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;  
  @ViewChild('rcMenu', { static: false }) rcMenu: jqxMenuComponent;

  @Output() emitter = new EventEmitter<any>();


  constructor(private httpService: HttpService) { }  

  source: any =
  {
    localdata: [{ "ID": "Number ID", 
                  "Name": "String as Name", 
                  "CountryCode": "String as CountryCode", 
                  "District": "String as District", 
                  "Population": "Number as Population"},
                 ],
    datafields:
    [
      { name: 'ID', type: 'number' },
      { name: 'Name', type: 'string' },
      { name: 'CountryCode', type: 'string' },
      { name: 'District', type: 'string' },
      { name: 'Population', type: 'number' },
    ],
    datatype: 'array'
  }

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] =
  [
    { text: 'Id', datafield: 'ID', columntype: 'textbox', width: 120 },
    { text: 'Name', datafield: 'Name', columntype: 'textbox', width: 240 },
    { text: 'Country Code', datafield: 'CountryCode', columntype: 'textbox', width: 120 },
    { text: 'District', datafield: 'District', columntype: 'textbox', width: 180 },

    {
      text: 'Population', datafield: 'Population', width: 120, align: 'right', cellsalign: 'right', columntype: 'numberinput',
      validation: (cell: any, value: number): any => {
        if (value < 0 || value > 150) {
          return { result: false, message: 'Population should be in the 0-150 interval' };
        }
        return true;
      },
      createeditor: (row: number, cellvalue: any, editor: any): void => {
        editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
      }
    },
  ];

  fireEvent() {
    this.emitter.emit("This is the message.")
  }

  getData() {
    this.httpService.getCities()
      .subscribe((data) => {
        this.source.localdata = data;
        this.myGrid.updatebounddata('cells');
      });
  };

  ngAfterViewInit() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    this.getData();
  }

  getWidth() : any {
    if (document.body.offsetWidth < 850) {
      return '99%';
    }
    
    return '100%';
  }


  debug(message) {
    return false;
  }

  refreshBtnOnClick(): void {
    // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
    this.myGrid.updatebounddata('cells');
  }

  clearBtnOnClick(): void {
    this.source.localdata = [];
    this.myGrid.updatebounddata('cells');
  }

  onCellBeginEdit(event: any): void {
    this.debug('onCellBeginEdit - Column: ' + event.args.datafield + ', Row: ' + (1 + event.args.rowindex) + ', Value: ' + event.args.value);
  }

  onCellEndEdit(event: any): void {
    this.debug('onCellEndEdit Column: ' + event.args.datafield + ', Row: ' + (1 + event.args.rowindex) + ', Value: ' + event.args.value);
  }

  onPageSizeChanged(event: any): void {
    this.debug('onPageSizeChanged Page:' + (1 + event.args.pagenum) + ', Page Size: ' + event.args.pageSize + ', Old Page Size: ' + event.args.oldPageSize);
  };

  onRowClick(event: any): void | boolean {
    this.emitter.emit({ "key1" : "SOME ARGUMENTS PASSED FROM DATAGRID.ONROWCLICK" } );
    this.debug('onRowClick Column: ' + event.args.datafield + ', Row: ' + (1 + event.args.rowindex) + ', Value: ' + event.args.value);
    if (event.args.rightclick) {
      this.myGrid.selectrow(event.args.rowindex);
      let scrollTop = window.scrollY;
      let scrollLeft = window.scrollX;
      this.rcMenu.open(parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
      return false;
    }
  }

  onContextMenu(): boolean {
    this.debug("onContextMenu : No event here!");
    return false;
  }
}















