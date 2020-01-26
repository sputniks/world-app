import { Component, ViewChild, OnInit }  from '@angular/core';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';



@Component({
  selector: 'app-debugpanel',
  templateUrl: './debugpanel.component.html',
  styleUrls: ['./debugpanel.component.css']
})
export class DebugpanelComponent implements OnInit {
  @ViewChild('debugPanel', { static: false }) debugPanel: jqxPanelComponent;

  
  
  constructor() { }

  ngOnInit() {
  }

  getCurrentTime() {
    let date: Date = new Date();  
    return date.getTime();
  }

  debug(message) {
    this.debugPanel.prepend('<div style="margin-top: 5px;">' + this.getCurrentTime() + ' ' + message + '</div>');
  }



}
