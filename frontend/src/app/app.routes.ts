import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { AddReviewComponent } from './components/addreview/addreview.component';
import { BookReviewlistComponent } from './components/bookreviewlist/bookreviewlist.component';
import { authGuard } from './services/authService/auth.guard';
import { ViewreviewComponent } from './components/viewreview/viewreview.component';
import { RegisterComponent } from './components/register/register.component';
import { EditreviewComponent } from './components/editreview/editreview.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'

    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'addReview',component: AddReviewComponent, canActivate: [authGuard]},
            {path: 'allReviews',component: BookReviewlistComponent},
            {path: 'bookReview/:reviewId',component: ViewreviewComponent},
            {path: 'editreview/:reviewId', component: EditreviewComponent, canActivate: [authGuard]},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }