import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { RecipelistComponent } from './components/recipelist.component';
import { RecipedetailComponent } from './components/recipedetail.component';
import { RecipeaddComponent } from './components/recipeadd.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './components/recipe.component';
import { RecipeService } from './recipe.service';

const appRoutes: Routes = [
  { path: '', component: RecipelistComponent},
  { path: 'recipe/:id', component: RecipedetailComponent},
  { path: 'add', component: RecipeaddComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    AppComponent,
    RecipelistComponent,
    RecipedetailComponent,
    RecipeaddComponent,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
