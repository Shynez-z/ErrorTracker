import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://localhost:3000/api/v1/tests';
  constructor(private http: HttpClient) { }

  getTests() {
    return this.http.get<Test[]>(this.apiUrl);
  }
}

export interface Test {
  id: number;
  name: string;
}
