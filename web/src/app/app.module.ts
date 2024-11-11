import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {HomeModule} from "./home/home.module";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {PostComponent} from './post/post.component';
import {AlbumComponent} from './album/album.component';
import {FileUploadModule} from "primeng/fileupload";
import {HttpClientModule} from "@angular/common/http";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PostDetailComponent} from './post/post-detail/post-detail.component';
import {AlbumDetailComponent} from './album/album-detail/album-detail.component';
import {GalleriaModule} from "primeng/galleria";
import {FieldsetModule} from "primeng/fieldset";
import {NotFoundComponent} from './not-found/not-found.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {appReducer} from "./state/app.reducer";
import {appEffects} from "./state/app.effects";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    PostComponent,
    AlbumComponent,
    PostDetailComponent,
    AlbumDetailComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    FileUploadModule,
    EditorModule,
    CommonModule,
    ToastModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GalleriaModule,
    FieldsetModule,
    StoreModule.forRoot(appReducer, { /*runtimeChecks: { strictStateImmutability: false, strictActionImmutability: false }*/ }),
    EffectsModule.forRoot(appEffects)
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
