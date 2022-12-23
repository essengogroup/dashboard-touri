import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Departement} from "../../model/departement";

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
export class UserModelComponent implements OnInit {

  @Input() user:Departement={} as Departement;
  constructor() { }

  ngOnInit(): void {
  }

}
