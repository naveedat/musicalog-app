import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Album } from '../models/album';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'api/albums';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }  

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched albums')),
        catchError(this.handleError('getAlbums', []))
      );
  }

  getAlbumById(id: string): Observable<Album> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Album>(url).pipe(
      tap(_ => console.log(`fetched album id=${id}`)),
      catchError(this.handleError<Album>(`getAlbumById id=${id}`))
    );
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(apiUrl, album, httpOptions).pipe(
      tap((c: Album) => console.log(`added album`)),
      catchError(this.handleError<Album>('addAlbum'))
    );
  }

  updateAlbum(id: number, album: Album): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, album, httpOptions).pipe(
      tap(_ => console.log(`updated album`)),
      catchError(this.handleError<any>('updateAlbum'))
    );
  }

  deleteAlbum(id: string): Observable<Album> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Album>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted album`)),
      catchError(this.handleError<any>('deleteAlbum'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
