import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Output() fileEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() multiples: boolean = true;
  @Input() inputName: string = 'image_path';

  uploadedFiles: any[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  selectFile(event: any) {
    for(let file of event.target.files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        file.src=e.target.result;
      }
      reader.readAsDataURL(file);
      this.uploadedFiles.push(file);
    }
    this.fileEmitter.emit(this.uploadedFiles);
  }

}
