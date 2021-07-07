import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { pipe, throwError } from 'rxjs';
import {  catchError, filter, map, retry, tap } from 'rxjs/operators';
export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
    map(( res: HttpResponse<T> ) => res.body)
  );
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  progress = 0;
  private baseurl = '/api/user';
  constructor(private http: HttpClient) { }
  getallusers()
    {
      return this.http.get(`${this.baseurl}/all`, this.httpOptions).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }

  createuser(userform: any) {
    return this.http.post(`${this.baseurl}/create`, userform, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      uploadProgress(progress => (this.progress = progress)),
      toResponseBody(),
      retry(1),
      catchError(this.handleError)
    );
  }
  updateuser(userform: any, id:number) {
    return this.http.put(`${this.baseurl}/update/${id}`, userform, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );;
  }
  deleteuser(id: number) {
    return this.http.delete(`${this.baseurl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);

      // return an observable with a user-facing error message
      return throwError(
        'Your network is playing tricks on you, please fix and try again!');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.msg}`);
      return throwError(
          `${error.error.msg}`);
        }
    }
}

