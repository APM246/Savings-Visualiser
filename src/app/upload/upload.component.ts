import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { BankFormData } from '../../types/types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  bankwestFile!: File | null;
  commbankFile!: File | null;
  @Output() graphImage: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();

  readonly banks: BankFormData[] = [
    {
      mainText: "Upload Bankwest transactions",
      formControlName: "bankwestData",
      handleInput: this.handleBankwestInput,
      file: this.bankwestFile
    },
    {
      mainText: "Upload Commbank transactions (optional)",
      formControlName: "commbankData",
      handleInput: this.handleCommbankInput,
      file: this.commbankFile
    }
  ]

  form = new FormGroup({
    bankwestData: new FormControl<File | null>(null, [Validators.required]),
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
