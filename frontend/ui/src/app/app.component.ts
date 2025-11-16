import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test, TestService } from './core/services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tests: Test[] = [];

  title = 'ui';
  constructor(private testService: TestService) {}
    ngOnInit(): void {
    this.testService.getTests().subscribe((data: Test[]) => {
      this.tests = data;
      console.log('Tests fetched:', this.tests);
    });
  }
}
