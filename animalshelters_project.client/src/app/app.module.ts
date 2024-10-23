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
import { ContactUsComponent } from './Tuqa/contact-us/contact-us.component';
import { ProfileComponent } from './hosam/profile/profile.component';
import { AdoptionFormComponent } from './dima/adoption-form/adoption-form.component';
import { OurCommunityComponent } from './Fawareh/our-community/our-community.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AllcategoriesComponent } from './admin/allcategories/allcategories.component';
import { UpdateCategoryComponent } from './admin/update-category/update-category.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { GetAllUsersComponent } from './admin/get-all-users/get-all-users.component';
import { AllSheltersComponent } from './admin/all-shelters/all-shelters.component';
import { UpdateShelterComponent } from './admin/update-shelter/update-shelter.component';
import { AddShelterComponent } from './admin/add-shelter/add-shelter.component';
import { GetAllAnimalComponent } from './admin/get-all-animal/get-all-animal.component';
import { UpdateAnimalComponent } from './admin/update-animal/update-animal.component';
import { AddAnimalComponent } from './admin/add-animal/add-animal.component';



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
    ContactUsComponent,

    AnimalDetailsComponent,
    ProfileComponent,
    OurCommunityComponent,
    AllcategoriesComponent,
    AdminDashboardComponent,
    UpdateCategoryComponent,
    AddCategoryComponent,
    AdoptionFormComponent,
    ProfileComponent,
    GetAllUsersComponent,
    AllSheltersComponent,
    UpdateShelterComponent,
    AddShelterComponent,
    GetAllAnimalComponent,
    UpdateAnimalComponent,
    AddAnimalComponent
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
      { path: 'contactUs', component: ContactUsComponent },
      { path: 'Home', component: HomeComponent },



      { path: 'profile', component: ProfileComponent },

      { path: 'ourCommunity', component: OurCommunityComponent },

      {
        path: 'AdminDashBoard', component: AdminDashboardComponent, children: [
          { path: "AllCategories", component: AllcategoriesComponent },
          { path: "UpdateCategory/:id", component: UpdateCategoryComponent },
          { path: "AddCategory", component: AddCategoryComponent },
          { path: "AllShelters", component: AllSheltersComponent },
          { path: "AllAnimal", component: GetAllAnimalComponent },
          { path: "UpdateAnimal/:id", component: UpdateAnimalComponent },
          { path: "UpdateShelter/:id", component: UpdateShelterComponent },
          { path: "AddShelter", component: AddShelterComponent },
          { path: "AddAnimals", component: AddAnimalComponent },

        ]
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
