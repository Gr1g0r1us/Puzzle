import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { LoadgameComponent } from './components/user-menu/loadgame/loadgame.component';
import { NewgameComponent } from './components/user-menu/newgame/newgame.component';
import { CreatepuzzleComponent } from './components/admin-menu/createpuzzle/createpuzzle.component';
import { DifficultyComponent } from './components/admin-menu/difficulty/difficulty.component';
import { GalleryComponent } from './components/admin-menu/gallery/gallery.component';
import { ListpuzzleComponent } from './components/admin-menu/listpuzzle/listpuzzle.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'singup', component: SingupComponent},
  {path: 'user-menu', component: UserMenuComponent},
  {path: 'admin-menu', component: AdminMenuComponent},
  {path: 'loadgame', component: LoadgameComponent},
  {path: 'newgame', component: NewgameComponent},
  {path: 'createpuzzle', component: CreatepuzzleComponent},
  {path: 'difficulty', component: DifficultyComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'listpuzzle', component: ListpuzzleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
