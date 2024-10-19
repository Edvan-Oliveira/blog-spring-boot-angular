import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {PostComponent} from "./post/post.component";
import {AlbumComponent} from "./album/album.component";
import {PostDetailComponent} from "./post/post-detail/post-detail.component";
import {AlbumDetailComponent} from "./album/album-detail/album-detail.component";
import {authGuard} from "./services/auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'publicacao', component: PostComponent, canActivate: [authGuard] },
  { path: 'publicacao/:id', component: PostDetailComponent },
  { path: 'album', component: AlbumComponent, canActivate: [authGuard]  },
  { path: 'album/:id', component: AlbumDetailComponent },

  { path: 'nao-encontrado', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
