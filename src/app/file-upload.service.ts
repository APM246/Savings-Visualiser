import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankType } from 'src/types/types';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  post(files: File[], bankTypes: BankType[], hideAxis: boolean): Observable<Blob> {;
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
        formData.append('bankTypes', bankTypes[i])
    }

    formData.append('hideAxis', JSON.stringify(hideAxis));

    return this.http.post(environment.apiUrl, formData, {responseType: 'blob'})
  }
}
