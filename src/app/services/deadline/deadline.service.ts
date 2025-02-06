import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private apiUrl = 'http://localhost:3000/api/deadline';

  constructor(private http: HttpClient) { }

  getDeadline() {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl);
  }
}
