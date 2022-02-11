export interface RecipeSummary {
  id: string
  title: string
}

export interface Recipe extends RecipeSummary {
  image: string
  ingredients: string[]
  instruction: string

}

export interface Message {
  message: string
}
