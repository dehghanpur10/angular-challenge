import {NgModule} from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

import {LoadingComponent} from './loading/loading.component';
import {BrowserModule} from "@angular/platform-browser";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";



const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressBarModule
]
@NgModule({
  declarations: [LoadingComponent],
  imports: [BrowserModule, materialComponents, ],
  exports: [ LoadingComponent, BrowserModule,materialComponents]
})
export class SharedModule {
}
