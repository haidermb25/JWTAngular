import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup' 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
