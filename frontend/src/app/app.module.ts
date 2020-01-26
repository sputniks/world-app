import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatagridComponent } from './datagrid/datagrid.component';

import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { HttpClientModule }    from '@angular/common/http';

import { jqxDataTableModule }   from 'jqwidgets-ng/jqxdatatable';

import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';

import { jqxMenuModule } from 'jqwidgets-ng/jqxmenu';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { DebugpanelComponent } from './debugpanel/debugpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    DatagridComponent,
    DebugpanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CommonModule, 
    FormsModule,

    jqxGridModule, 
    jqxButtonModule,
    HttpClientModule,

    jqxDataTableModule,

    jqxDropDownListModule, 
    jqxInputModule, 
    jqxPanelModule,

    jqxMenuModule,
    jqxNumberInputModule,
    jqxWindowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

