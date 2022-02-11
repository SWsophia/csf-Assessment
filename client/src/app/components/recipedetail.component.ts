import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {

  id: string= ""
  title: string = ""
  recipe!: Recipe

  constructor(private recipeSvc: RecipeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id']
    this.recipeSvc.getRecipeById(this.id)
      .then(results => {
        this.recipe = results
      })
      .catch(error => {
        console.error(">>>> error: ", error)
      })
  }

}
