import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() text!: string;
  @Input() number!: string;
  fileName!: string;
  @Output() fileChanged: EventEmitter<File> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInput(event: Event) {
    const uploadedFile: File | null = (event.target as HTMLInputElement).files!.item(0);
    if (uploadedFile != null) {
      this.fileName = uploadedFile.name;
      this.fileChanged.emit(uploadedFile);
    }
  }
}
