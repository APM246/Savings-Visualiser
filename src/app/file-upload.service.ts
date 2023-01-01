import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  post(bankwestFile: File, commbankFile: File | null): Observable<Blob> {
    const endpoint = 'http://localhost:8000/api/graph';
    const formData: FormData = new FormData();
    formData.append('bankwest', bankwestFile, bankwestFile.name);
    if (commbankFile != null) {
      formData.append('commbank', commbankFile, commbankFile.name);
    }
    return this.http.post(endpoint, formData, {responseType: 'blob'})
  }
}
