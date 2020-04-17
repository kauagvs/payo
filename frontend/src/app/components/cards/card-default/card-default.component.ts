import { Launchs } from './../../../shared/launchs.interface';
import { Component, OnInit, Input } from '@angular/core';
import { LaunchControlTotal } from './../../../shared/launch-control-total.inteface';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-card-default',
  templateUrl: './card-default.component.html',
  styleUrls: ['./card-default.component.scss']
})
export class CardDefaultComponent implements OnInit {

  @Input() dataCard: any[];

  constructor() { }

  ngOnInit() {
  }

}
