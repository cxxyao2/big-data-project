import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = 'http://localhost:3000/api/all-users';

  constructor(private readonly http: HttpClient) { }

  getAllUsers(): Observable<{ count: number; users: User[] }> {
    return this.http.get<{ count: number; users: User[] }>(this.url, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  // Alternative: Stream data progressively
  getAllUsersStreaming(): Observable<any> {
    return this.http.get(this.url, {
      reportProgress: true,
      responseType: 'text'
    });
  }
}
