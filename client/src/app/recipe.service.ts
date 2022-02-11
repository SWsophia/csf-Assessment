import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Message, Recipe, RecipeSummary } from "./models";

@Injectable()
export class RecipeService {



  constructor(private http: HttpClient) { }

  getAllRecipes(){
    return lastValueFrom(
      this.http.get<any>(`http://localhost:8080/api/recipes`)

    )
  }

  getRecipeById(id: string): Promise<Recipe> {
    return lastValueFrom(
       this.http.get<Recipe>(`http://localhost:8080/api/recipes/${id}`)
    )
  }

  addRecipe(recipe:Recipe){
    return lastValueFrom(
      this.http.post<any>(`http://localhost:8080/api/recipes`, recipe))
  }
}
