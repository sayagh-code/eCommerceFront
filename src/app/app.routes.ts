import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './customer/customer-template/template.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { HomeComponent } from './customer/home/home.component';
import { authenticationGuard } from './guards/authentication.guard';
import { CreateProductsComponent } from './admin/create-products/create-products.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "", component: LoginComponent},
    {path: "admin", component: AdminTemplateComponent, 
    children:[
        {path: "products", component: AdminProductsComponent},
        {path: "users", component: AdminUsersComponent},
        {path: "createProducts", component: CreateProductsComponent},
    ],
    //canActivate : [authenticationGuard]
    },
    {path: "user", component: TemplateComponent, 
    children:[
        {path: "home", component: HomeComponent},
    ],
    //canActivate : [authenticationGuard]
    },
];