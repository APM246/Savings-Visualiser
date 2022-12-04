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

  constructor(public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    const file: File | null = (event.target as HTMLInputElement).files!.item(0);
    this.fileName = file?.name || "";
    console.log(this.text);
    this.fileUploadService.postFile(file).subscribe()
  }

}
