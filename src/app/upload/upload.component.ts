import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { BankType } from '../../types/types';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    readonly MAX_FILE_NAME_LENGTH = 35;

    files: File[] = [];
    banks: BankType[] = [];
    @Output() graphImage: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();

    constructor(public fileUploadService: FileUploadService) { }

    ngOnInit(): void {}

    handleInput(event: Event) {
        const uploadedFile: File | null = (event.target as HTMLInputElement).files!.item(0);
        if (uploadedFile != null) {
            this.files.push(uploadedFile);
            this.banks.push(BankType.Bankwest);
        }
    }

    handleSelect(index: number, event: MatSelectChange) {
        this.banks[index] = event.value;
    }

    getGraph() {
        console.log("hi")
        if (this.files.length != 0) {
            this.fileUploadService.post(this.files, this.banks, false).subscribe(
                (data: Blob) => {
                    this.extractImage(data);
                })
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