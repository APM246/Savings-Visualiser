import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  postFile(file: File | null): Observable<boolean> {
    if (file == null) return of(false);

    const endpoint = '';
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http
    .post(endpoint, formData)
    .pipe(
      map(() => true)
    )
  }
}
