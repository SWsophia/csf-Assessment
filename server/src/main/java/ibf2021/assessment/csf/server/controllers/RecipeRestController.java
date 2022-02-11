package ibf2021.assessment.csf.server.controllers;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;

/* Write your request hander in this file */

@RestController
@RequestMapping(path = "/api/recipes", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

    @Autowired
    private RecipeService recipeSvc;

    @GetMapping(path = "/{id}")
    public ResponseEntity<String> getRecipeById(@PathVariable String id) {

        Optional<Recipe> recipeById = recipeSvc.getRecipeById(id);
              
        if (recipeById.isEmpty()) {
            System.out.println("Oops, the recipe not created!");
            JsonObject jo = Json.createObjectBuilder()
                .add("Message", "The recipe not created!")
                .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(jo.toString());
        } else {
            Recipe recipe = recipeById.get();
            JsonArrayBuilder ingredientBuilder = Json.createArrayBuilder();
            for (String i: recipe.getIngredients()){
                ingredientBuilder.add(i);
            }
            JsonArray getIngredients = ingredientBuilder.build();

            JsonObject jo = Json.createObjectBuilder()
                .add("id", recipe.getId())
                .add("title", recipe.getTitle())
                .add("image", recipe.getImage())
                .add("ingredients",getIngredients)
                .add("instruction", recipe.getInstruction())
                .build();
            
            return ResponseEntity.ok(jo.toString());

        }
    }

    @PostMapping(path="/recipes")
    public ResponseEntity<String> saveRecipe(@RequestBody String request){
            
        Recipe recipe = new Recipe();

        try (InputStream is = new ByteArrayInputStream(request.getBytes())){
            JsonReader reader = Json.createReader(is);
            JsonObject savedRecipe = reader.readObject();

            recipe.setTitle(savedRecipe.getString("title"));
            recipe.setImage(savedRecipe.getString("image"));
            recipe.setInstruction(savedRecipe.getString("instruction"));
            JsonArray ingredients = savedRecipe.getJsonArray("ingredients");
            for (JsonValue ingredient: ingredients) {
                recipe.addIngredient(ingredient.toString().replaceAll(" ", "\\+"));
            }

            recipeSvc.addRecipe(recipe);

            JsonObject jo = Json.createObjectBuilder()
                .add("message", "created!")
                .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(jo.toString());

        }
        catch (IOException e){
            JsonObject jo = Json.createObjectBuilder()
                .add("Message", e.toString())
                .build();
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(jo.toString());
        }
    
    }
}