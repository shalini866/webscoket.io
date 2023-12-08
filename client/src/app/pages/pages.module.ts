import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ChatComponent } from './chat/chat.component';
import { UsernameComponent } from './username/username.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatComponent,
    UsernameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,

  ]
})
export class PagesModule { }
