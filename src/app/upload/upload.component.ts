import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  fileName!: string;
  bankwestFile!: File | null;
  commbankFile!: File | null;
  @Output() graphImage: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();

  form = new FormGroup({
    bankwestData: new FormControl<File | null>(null),
    commbankData: new FormControl<File | null>(null)
  })

  constructor(public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  handleBankwestInput(event: Event) {
    const uploadedFile: File | null = (event.target as HTMLInputElement).files!.item(0);
    if (uploadedFile != null) {
      this.bankwestFile = uploadedFile;
    }
  }

  handleCommbankInput(event: Event) {
    const uploadedFile: File | null = (event.target as HTMLInputElement).files!.item(0);
    if (uploadedFile != null) {
      this.commbankFile = uploadedFile;
    }
  }

  getGraph() {
    if (this.bankwestFile != null) {
      this.fileUploadService.post(this.bankwestFile, this.commbankFile).subscribe(
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
      this.graphImage.emit(reader.result);
    }
  }
}
