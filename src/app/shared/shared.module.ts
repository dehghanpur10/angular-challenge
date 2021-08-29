import {NgModule} from "@angular/core";

import {ErrorComponent} from "./error/error.component";
import {MaterialModule} from "./material/material.module";
import {LoadingComponent} from './loading/loading.component';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [ErrorComponent, LoadingComponent],
  imports: [BrowserModule],
  exports: [ErrorComponent, MaterialModule, LoadingComponent, BrowserModule]
})
export class SharedModule {
}
