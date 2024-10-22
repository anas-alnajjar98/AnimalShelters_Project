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
import { AllcategoryComponent } from './dima/allcategory/allcategory.component';
import { RegisterComponent } from './hosam/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './hosam/reset-password/reset-password.component';
import { VirifyOtpComponent } from './hosam/virify-otp/virify-otp.component';
import { PasswordResetComponent } from './hosam/password-reset/password-reset.component';
import { AnimalComponent } from './dima/animal/animal.component';
import { AnimalDetailsComponent } from './dima/animal-details/animal-details.component';
import { AdoptionFormComponent } from './dima/adoption-form/adoption-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PostFormComponent,
    LoginComponent,
    AllcategoryComponent,
   
    AnimalComponent,
  
   
    RegisterComponent,
    ResetPasswordComponent,
    VirifyOtpComponent,
    PasswordResetComponent,
    AnimalDetailsComponent,
    AdoptionFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule, HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'postForm', component: PostFormComponent },
      { path: 'Categories', component: AllcategoryComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'virifyOtp', component: VirifyOtpComponent },
      { path: 'password-reset', component: PasswordResetComponent },

    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
