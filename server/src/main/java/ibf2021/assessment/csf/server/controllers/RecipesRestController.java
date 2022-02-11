package ibf2021.assessment.csf.server.controllers;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonObject;



/* Write your request hander in this file */

@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

    

    @Autowired
    private RecipeService recipeSvc;

    @GetMapping(path = "/recipes")
    public ResponseEntity<String> getRecipes() {

        List<Recipe> recipes = recipeSvc.getAllRecipes();
        List<String> recipeSummary = new LinkedList<String>();
        
        for (Recipe recipe: recipes) {
            JsonObject jo = Json.createObjectBuilder()
                .add("id", recipe.getId())
                .add("title", recipe.getTitle())
                .build();
            
            recipeSummary.add(jo.toString());
        }

        String responseBody = recipeSummary.toString();

        return ResponseEntity.ok(responseBody);
    }

}