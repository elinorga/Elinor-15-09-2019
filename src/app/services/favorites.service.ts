import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: Favorite[];

  constructor() {

    this.favorites = [];
  }

  checkFavoriteExist(key: string) {
    const index = this.favorites.findIndex(item => item.key === key);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  addToFavorites(favorite: Favorite) {
    this.favorites.push(favorite);
  }

  removeFromFavorites(key: string) {
    const index = this.favorites.findIndex(item => item.key === key);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
  }

  getFavorites() {
    return this.favorites;
  }
}
