import {NgModule} from "@angular/core";

import {ErrorComponent} from "./error/error.component";
import {MaterialModule} from "./material/material.module";

@NgModule({
  declarations:[ErrorComponent],
  // imports:[MaterialModule],
  exports:[ErrorComponent,MaterialModule]
})
export class SharedModule{}
