import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {PostComponent} from "./post/post.component";
import {AlbumComponent} from "./album/album.component";
import {PostDetailComponent} from "./post/post-detail/post-detail.component";
import {AlbumDetailComponent} from "./album/album-detail/album-detail.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'publicacao', component: PostComponent },
  { path: 'publicacao/:id', component: PostDetailComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'album/:id', component: AlbumDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
