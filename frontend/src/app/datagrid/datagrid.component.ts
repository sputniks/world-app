import { Component, ViewChild, ElementRef, AfterViewInit, OnInit}  from '@angular/core';

import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid'

import { HttpService } from '../http.service';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})


export class DatagridComponent implements AfterViewInit {
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('beginEdit', { static: false }) beginEdit: ElementRef;
  @ViewChild('endEdit', { static: false }) endEdit: ElementRef;

  constructor(private httpService: HttpService) { }  

  

  source: any =
  {
    localdata: [{"firstname": "Pasha", 
                  "lastname": "Ivanov", 
                  "productname": "Product name", 
                  "available": "false", 
                  "quantity": "3  ", 
                  "price": "7.77", 
                  "date": "Fri Nov 19 2016 00:00:00 GMT-0800 (Pacific Standard Time)"},],
    datafields:
    [
      { name: 'firstname', type: 'string' },
      { name: 'lastname', type: 'string' },
      { name: 'productname', type: 'string' },
      { name: 'quantity', type: 'number' },
      { name: 'price', type: 'number' },
      { name: 'total', type: 'number' }
    ],
    datatype: 'array'
  }

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] =
  [
    { text: 'First Name', columntype: 'textbox', datafield: 'firstname', width: 120 },
    { text: 'Last Name', datafield: 'lastname', columntype: 'textbox', width: 120 },
    { text: 'Product', columntype: 'dropdownlist', datafield: 'productname', width: 195 },
    { text: 'Available', datafield: 'available', columntype: 'checkbox', width: 67 },
    {
      text: 'Ship Date', datafield: 'date', columntype: 'datetimeinput', width: 110, align: 'right', cellsalign: 'right', cellsformat: 'd',
      validation: (cell: any, value: any): any => {
        if (value == '')
          return true;
        let year = value.getFullYear();
        if (year >= 2017) {
          return { result: false, message: 'Ship Date should be before 1/1/2017' };
        }
        return true;
      }
    },
    {
      text: 'Quantity', datafield: 'quantity', width: 70, align: 'right', cellsalign: 'right', columntype: 'numberinput',
      validation: (cell: any, value: number): any => {
        if (value < 0 || value > 150) {
          return { result: false, message: 'Quantity should be in the 0-150 interval' };
        }
        return true;
      },
      createeditor: (row: number, cellvalue: any, editor: any): void => {
        editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
      }
    },
    {
      text: 'Price', datafield: 'price', align: 'right', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput',
      validation: (cell: any, value: number): any => {
        if (value < 0 || value > 15) {
          return { result: false, message: 'Price should be in the 0-15 interval' };
        }
        return true;
      },
      createeditor: (row: number, cellvalue: any, editor: any): void => {
        editor.jqxNumberInput({ digits: 3 });
      }
    }
  ];


  getData() {
    // this.source.localdata = generatedata(500, false);
    // this.myGrid.updatebounddata('cells');
    this.httpService.getCities()
      .subscribe((data) => {
        this.source.localdata = data;
        this.myGrid.updatebounddata('cells');
      });
  };


  ngAfterViewInit() {
    this.getData();
  }


  getWidth() : any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }
    
    return 850;
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

}