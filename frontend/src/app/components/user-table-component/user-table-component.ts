import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user-service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-table-component',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-table-component.html',
  styleUrl: './user-table-component.css',
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'salary'];

  allUsers: User[] = [];
  pageUsers: User[] = [];

  pageSize = 100;
  currentPage = 1;
  totalPage = 0;
  isLoading = true;

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((res) => {
      this.allUsers = res.users;
      this.totalPage = Math.ceil(this.allUsers.length / this.pageSize);
      this.updatePage();
      this.isLoading = false;
    });
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pageUsers = this.allUsers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

}
