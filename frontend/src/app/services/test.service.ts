import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Test, CreateTestDto, UpdateTestDto } from '../models/test.model';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private apiUrl = `${environment.apiUrl}/tests`;

    constructor(private http: HttpClient) { }

    /**
     * Get all tests
     */
    getAll(): Observable<Test[]> {
        return this.http.get<Test[]>(this.apiUrl)
            .pipe(catchError(this.handleError));
    }

    /**
     * Get test by ID
     */
    getById(id: number): Observable<Test> {
        return this.http.get<Test>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Create a new test
     */
    create(dto: CreateTestDto): Observable<Test> {
        return this.http.post<Test>(this.apiUrl, dto)
            .pipe(catchError(this.handleError));
    }

    /**
     * Update an existing test
     */
    update(id: number, dto: UpdateTestDto): Observable<Test> {
        return this.http.put<Test>(`${this.apiUrl}/${id}`, dto)
            .pipe(catchError(this.handleError));
    }

    /**
     * Delete a test
     */
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    /**
     * Handle HTTP errors
     */
    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            if (error.error?.message) {
                errorMessage = error.error.message;
            }
        }

        console.error('API Error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}
