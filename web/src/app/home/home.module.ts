import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {TabViewModule} from "primeng/tabview";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    RouterLink
  ]
})
export class HomeModule {
}
