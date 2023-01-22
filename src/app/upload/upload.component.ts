import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { BankFormData, BankType } from '../../types/types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  bankwestFile: File | null = null;
  commbankFile!: File | null;
  @Output() graphImage: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();

  handleInput(event: Event, bankType: BankType) {
    const uploadedFile: File | null = (event.target as HTMLInputElement).files!.item(0);
    if (uploadedFile != null) {
        switch (bankType) {
            case BankType.Bankwest: {
                this.bankwestFile = uploadedFile;
                break;
            }
            default: {
                this.commbankFile = uploadedFile
                break;
            }
        }
    }
  }

  readonly banks: BankFormData[] = [
    {
      mainText: "Upload Bankwest transactions",
      formControlName: "bankwestData",
      handleInput: (event) => this.handleInput(event, BankType.Bankwest),
    },
    {
      mainText: "Upload Commbank transactions (optional)",
      formControlName: "commbankData",
      handleInput: (event) => this.handleInput(event, BankType.Commbank),
    }
  ]

  form = new FormGroup({
    bankwestData: new FormControl<File | null>(null, [Validators.required]),
    commbankData: new FormControl<File | null>(null),
    hideAxis: new FormControl<boolean>(false, {nonNullable: true})
  })

  constructor(public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  getGraph() {
    if (this.bankwestFile != null) {
        let files: File[];
        let bankTypes: BankType[]
        if (this.commbankFile != null) {
            files = [this.bankwestFile, this.commbankFile]
            bankTypes = [BankType.Bankwest, BankType.Commbank]
        }
        else {
            files = [this.bankwestFile]
            bankTypes = [BankType.Bankwest]
        }
        this.fileUploadService.post(files, bankTypes, this.form.value.hideAxis ?? false).subscribe(
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
