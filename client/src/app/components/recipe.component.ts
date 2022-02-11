import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeSummary } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipes: RecipeSummary[] =[]
  constructor(private router: Router, private recipeSvc: RecipeService) { }

  ngOnInit(): void {

    this.recipeSvc.getAllRecipes()
      .then(result => {
        this.recipes = result
      })
      .catch(error => {
        console.error(">>>> error:", error)
      })
  }

  go(id: string){
    this.router.navigate(['/recipe', id])
  }

}
