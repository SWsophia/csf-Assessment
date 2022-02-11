import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipeadd',
  templateUrl: './recipeadd.component.html',
  styleUrls: ['./recipeadd.component.css']
})
export class RecipeaddComponent implements OnInit {

  form!:FormGroup
  ingredients!: FormArray
  newRecipe!: Recipe


  constructor(private fb: FormBuilder, private recipeSvc: RecipeService,
              private route: Router) { }

  ngOnInit(): void {
    this.form = this.createForm()

  }
  createForm(): FormGroup {
    this.ingredients = this.fb.array([],[Validators.required, Validators.min(1)])
    this.addIngredient()
    return this.fb.group({
      "title": this.fb.control('', [ Validators.required, Validators.minLength(3) ]),
      "image": this.fb.control('', [ Validators.required ]),
      "instruction": this.fb.control('', [ Validators.required, Validators.minLength(3) ]),
      "ingredients": this.ingredients
    })
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('',[Validators.required, Validators.minLength(3)]))
  }

  deleteIngredient(i:number) {
    this.ingredients.removeAt(i)
  }

  processForm(){
    console.log(this.form.value)
    this.newRecipe = this.form.value as Recipe
    this.recipeSvc.addRecipe(this.newRecipe)
      .then(result=>
      {this.form.reset();
      console.info (">>> newRecipe: ", result)})

    this.route.navigate(['/'])


  }


}
