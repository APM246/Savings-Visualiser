import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() text!: string;
  @Input() number!: string;
  fileName!: string;
  srcImage!: string | ArrayBuffer | null;

  constructor(public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    const file: File | null = (event.target as HTMLInputElement).files!.item(0);
    if (file != null) {
      this.fileName = file.name;
      this.fileUploadService.postFile(file).subscribe(
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
