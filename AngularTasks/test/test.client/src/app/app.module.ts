import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // <-- Import ReactiveFormsModule for forms
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { RahafComponent } from './rahaf/rahaf.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// Import AuthGuard if needed for protecting routes
import { authGuard } from './auth.guard';  // <-- Add this if you want to protect the dashboard route

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CategoriesComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    RahafComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,  // <-- Add ReactiveFormsModule here for forms support
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "Categories", component: CategoriesComponent },
      { path: "Product/:id", component: RahafComponent },
      { path: "About Us", component: AboutUsComponent },
      { path: "Contact Us", component: ContactUsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },  // <-- Protect the dashboard route with AuthGuard
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
