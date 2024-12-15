import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image?: string;
  recipes?: ObjectId[];
  favorites?: ObjectId[];
  createdAt: Date;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeImage {
  imageUrl: string;
  description?: string;
}

export interface Step {
  description: string;
  imageUrl?: string;
}

export interface Recipe {
  _id: string | ObjectId;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[];
  images: RecipeImage[];
  ratings: Rating[];
  averageRating: number;
  totalRatings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  userId: string;
  score: number;
  comment: string;
  createdAt: Date;
}

export interface Review {
  _id: ObjectId;
  recipeId: ObjectId;
  userId: ObjectId;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Rating {
  _id?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
}
