import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( private http: HttpClient) { }

  getCitydata(city): Observable<any>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=97ed217e5f30e185abc346a3bd94496e`;
    return this.http.get<any>(url)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  getLocation(lat, lon): Observable<any>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=97ed217e5f30e185abc346a3bd94496e`;
    return this.http.get<any>(url)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  getNearbyLocation(lat, lon): Observable<any>{
    const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&units=metric&appid=97ed217e5f30e185abc346a3bd94496e`;
    return this.http.get<any>(url)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ProgressEvent) {
      // server-side error
      errorMessage = 'Server Error';
    } else {
      // client-side error
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }

}