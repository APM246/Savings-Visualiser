import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'savings-visualiser';
  srcImage!: string | ArrayBuffer | null
  buttonEnabled!: boolean;
  file!: File;

  constructor(public fileUploadService: FileUploadService) {
    this.buttonEnabled = false;
   }

  fileChange(uploadedFile: File) {
    this.buttonEnabled = true;
    this.file = uploadedFile;
  }

  getGraph() {
    if (this.file != null) {
      this.fileUploadService.postFile(this.file).subscribe(
        (data: Blob) => {
          this.extractImage(data);
        }
      )
    }
  }

  private extractImage(data: Blob) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => { 
      this.srcImage = reader.result
    }
  }
}
