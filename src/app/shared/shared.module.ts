import {NgModule} from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import {ErrorComponent} from "./error/error.component";
import {LoadingComponent} from './loading/loading.component';
import {BrowserModule} from "@angular/platform-browser";



const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatCardModule
]
@NgModule({
  declarations: [ErrorComponent, LoadingComponent],
  imports: [BrowserModule,materialComponents],
  exports: [ErrorComponent, LoadingComponent, BrowserModule,materialComponents]
})
export class SharedModule {
}
