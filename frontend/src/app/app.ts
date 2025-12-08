import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from "./components/user-table-component/user-table-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
