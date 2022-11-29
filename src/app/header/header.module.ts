import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatSlideToggleModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {}
