import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Favorite } from '../../models/favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite[];
  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {

    this.favorites = this.favoritesService.getFavorites();
  }

  onFavoriteDetails(favorite: Favorite) {
    localStorage.setItem('currentCityKey', favorite.key);
    localStorage.setItem('currentCityName', favorite.localizedName);
  }
}
