import { Component, ViewChild, ElementRef, AfterViewInit, OnInit}  from '@angular/core';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'

import { HttpService } from '../http.service';

import { generatedata } from '../../../sampledata/generatedata';

import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';

import { jqxMenuComponent } from 'jqwidgets-ng/jqxmenu';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})

export class DatagridComponent implements AfterViewInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('beginEdit', { static: false }) beginEdit: ElementRef;
  @ViewChild('endEdit', { static: false }) endEdit: ElementRef;

  @ViewChild('myPanel', { static: false }) myPanel: jqxPanelComponent;

  @ViewChild('myMenu', { static: false }) myMenu: jqxMenuComponent;





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

  refreshBtnOnClick(): void {
    // this.source.localdata = generatedata(500, false);
    // passing 'cells' to the 'updatebounddata' method will refresh only the cells values when the new rows count is equal to the previous rows count.
    this.myGrid.updatebounddata('cells');
  }

  clearBtnOnClick(): void {
    // this.myGrid.clear();
    this.source.localdata = [];
    this.myGrid.updatebounddata('cells');

  }

  cellBeginEditEvent(event: any): void {
    let args = event.args;
    this.beginEdit.nativeElement.innerHTML = 'Event Type: cellbeginedit, Column: ' + args.datafield + ', Row: ' + (1 + args.rowindex) + ', Value: ' + args.value;
  }

  cellEndEditEvent(event: any): void {
    let args = event.args;
    this.endEdit.nativeElement.innerHTML = 'Event Type: cellendedit, Column: ' + args.datafield + ', Row: ' + (1 + args.rowindex) + ', Value: ' + args.value;
  }

  tableOnPageSizeChanged(event: any): void {
    this.myPanel.clearcontent();
    let args = event.args;
    let eventData = '<div>Page:' + (1 + args.pagenum) + ', Page Size: ' + args.pageSize + ', Old Page Size: ' + args.oldPageSize + '</div>';
    this.myPanel.prepend('<div style="margin-top: 5px;">' + eventData + '</div>');
  };

  myGridOnRowClick(event: any): void | boolean {
    if (event.args.rightclick) {
      this.myGrid.selectrow(event.args.rowindex);
      let scrollTop = window.scrollY;
      let scrollLeft = window.scrollX;
      this.myMenu.open(parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
      return false;
    }
  }

  myGridOnContextMenu(): boolean {
    return false;
  }

}