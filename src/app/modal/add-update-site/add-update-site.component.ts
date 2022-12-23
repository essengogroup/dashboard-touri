import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SiteService} from "../../service/site.service";
import {Site} from "../../model/site";

@Component({
  selector: 'app-add-update-site',
  templateUrl: './add-update-site.component.html',
  styleUrls: ['./add-update-site.component.css']
})
export class AddUpdateSiteComponent implements OnInit {
  site:Site;
  siteForm:FormGroup;
  alias:string[] = ['name', 'description', 'price', 'departement_id','media_id','activite_id'];
  constructor(
    private siteService:SiteService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.site= this.config.data;
    this.siteForm = this.formBuilder.group({
      name: [this.site.name, [Validators.required]],
      description: [this.site.description, [Validators.required]],
      price: [this.site.price, [Validators.required]],
      departement_id: ['', [Validators.required]],
      media_id: ['', [Validators.required]],
      activite_id: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.siteForm.valid) {
      return
    }

    console.log(this.siteForm.value);
  }

}
