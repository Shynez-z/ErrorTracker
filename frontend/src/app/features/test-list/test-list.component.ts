import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { Test, CreateTestDto } from '../../models/test.model';

@Component({
    selector: 'app-test-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './test-list.component.html',
    styleUrl: './test-list.component.css'
})
export class TestListComponent implements OnInit {
    tests: Test[] = [];
    loading = false;
    error: string | null = null;
    newTestName = '';

    constructor(private testService: TestService) { }

    ngOnInit(): void {
        this.loadTests();
    }

    loadTests(): void {
        this.loading = true;
        this.error = null;

        this.testService.getAll().subscribe({
            next: (tests) => {
                this.tests = tests;
                this.loading = false;
            },
            error: (err) => {
                this.error = err.message;
                this.loading = false;
            }
        });
    }

    createTest(): void {
        if (!this.newTestName.trim()) {
            return;
        }

        const dto: CreateTestDto = {
            name: this.newTestName.trim()
        };

        this.testService.create(dto).subscribe({
            next: (test) => {
                this.tests.push(test);
                this.newTestName = '';
            },
            error: (err) => {
                this.error = err.message;
            }
        });
    }

    deleteTest(id: number): void {
        if (!confirm('Are you sure you want to delete this test?')) {
            return;
        }

        this.testService.delete(id).subscribe({
            next: () => {
                this.tests = this.tests.filter(t => t.id !== id);
            },
            error: (err) => {
                this.error = err.message;
            }
        });
    }
}
