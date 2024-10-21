import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Tuqa/home/home.component';
import { NavbarComponent } from './Tuqa/navbar/navbar.component';
import { FooterComponent } from './Tuqa/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PostFormComponent } from './Fawareh/post-form/post-form.component';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { LoginComponent } from './hosam/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PostFormComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'postForm', component: PostFormComponent },

    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
