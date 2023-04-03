import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FileUpload } from 'src/app/model/file-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() fileEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() multiples: boolean = true;
  @Input() inputName: string = 'image_path';

  uploadedFiles: FileUpload[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  selectFile(event: any) {
    for(let file of event.target.files) {
      const myFileSelected:FileUpload = {base64Src:'',file}
      let reader = new FileReader();
      reader.onload = (e: any) => {
        myFileSelected.base64Src=e.target.result;
      }
      reader.readAsDataURL(file);    
      this.uploadedFiles.push(myFileSelected);
    }
    this.fileEmitter.emit(this.uploadedFiles);
  }

}
