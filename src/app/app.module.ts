import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {HeaderComponent} from "./components/header/header.component";
import { ListItemsComponent } from './components/list-items/list-items.component';
import { ItemComponent } from './components/list-items/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListItemsComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{path:'',component:ListItemsComponent}]),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
