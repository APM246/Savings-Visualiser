import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  post(bankwestFile: File, commbankFile: File | null, hideAxis: boolean): Observable<Blob> {;
    const formData: FormData = new FormData();
    formData.append('bankwest', bankwestFile, bankwestFile.name);
    if (commbankFile != null) {
      formData.append('commbank', commbankFile, commbankFile.name);
    }
    formData.append('hideAxis', JSON.stringify(hideAxis));

    return this.http.post(environment.apiUrl, formData, {responseType: 'blob'})
  }
}
