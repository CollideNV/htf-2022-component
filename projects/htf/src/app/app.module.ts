import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
})
export class AppModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    customElements.define(
      'htf-2023',
      createCustomElement(AppComponent, { injector: this.injector })
    );
  }
}
