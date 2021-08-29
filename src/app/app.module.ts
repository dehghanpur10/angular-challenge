import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from "./header/header.component";
import { ListItemsComponent } from './list-items/list-items.component';
import { ItemComponent } from './list-items/item/item.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListItemsComponent,
    ItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{path:'',component:ListItemsComponent}]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
