import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import{HttpClientModule} from '@angular/common/http';
import{FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { SharedService } from './shared.service';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { NewgameComponent } from './components/user-menu/newgame/newgame.component';
import { LoadgameComponent } from './components/user-menu/loadgame/loadgame.component';
import { CreatepuzzleComponent } from './components/admin-menu/createpuzzle/createpuzzle.component';
import { ListpuzzleComponent } from './components/admin-menu/listpuzzle/listpuzzle.component';
import { GalleryComponent } from './components/admin-menu/gallery/gallery.component';
import { DifficultyComponent } from './components/admin-menu/difficulty/difficulty.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingupComponent,
    AdminMenuComponent,
    UserMenuComponent,
    NewgameComponent,
    LoadgameComponent,
    CreatepuzzleComponent,
    ListpuzzleComponent,
    GalleryComponent,
    DifficultyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
