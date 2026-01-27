import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  navItems: NavItem[] = [
    { label: 'Home', icon: 'home', route: '/home' }
  ];

  ngAfterViewInit(): void {
    // Ensure sidenav is always open
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
    // Keep sidenav open, just change width via CSS
    if (this.sidenav && !this.sidenav.opened) {
      this.sidenav.open();
    }
  }
}
