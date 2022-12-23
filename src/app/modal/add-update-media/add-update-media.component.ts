import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MediaService} from "../../service/media.service";
import {Media} from "../../model/media";

@Component({
  selector: 'app-add-update-media',
  templateUrl: './add-update-media.component.html',
  styleUrls: ['./add-update-media.component.css']
})
export class AddUpdateMediaComponent implements OnInit ,OnDestroy{
  mediaForm:FormGroup;
  media:Media;
  alias:string[] = ['name', 'type', 'is_main'];
  constructor(
    private mediaService:MediaService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.mediaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: [''],
      is_main: [''],
    });
    this.media = this.config.data;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.mediaForm.valid) {
      return
    }

    this.media.type = this.mediaForm.value.type;
    this.media.name = this.mediaForm.value.name;
    this.media.is_main = this.mediaForm.value.is_main;

    console.log(this.media);
  }

  getFile($event: any[]) {
    console.log($event);
  }
}
