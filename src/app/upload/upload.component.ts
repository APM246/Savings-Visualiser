import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { BankType } from '../../types/types';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  animations: [
    trigger('fade', [
        transition(':enter', [
            style({opacity : 0}),
            animate(500, style({opacity: 1}))
        ])
    ])
  ]
})
export class UploadComponent implements OnInit {
    readonly MAX_FILE_NAME_LENGTH = 35;

    files: File[] = [];
    banks: BankType[] = [];
    isHideAxisChecked: boolean = false;
    @Output() graphImage: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();

    constructor(public fileUploadService: FileUploadService, private snackBar: MatSnackBar) { }

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

    handleHideAxis(event: Event) {
        this.isHideAxisChecked = (event.target as HTMLInputElement).checked;
    }

    getGraph() {
        if (this.files.length != 0) {
            this.fileUploadService.post(this.files, this.banks, this.isHideAxisChecked)
                .subscribe(
                    (data: Blob) => {
                        this.extractImage(data);
                    },
                    (error: Error) => {
                        this.snackBar.open("Incorrect configuration", "", {
                            duration: 4000
                        });
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