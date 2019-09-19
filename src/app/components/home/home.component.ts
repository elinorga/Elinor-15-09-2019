import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../models/city';
import { Favorite } from 'src/app/models/favorite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('citySearch') citySearch: ElementRef;
  citiesResults: City[];
  city: City;
  cityName: string;
  cityKey: string;
  forecastOf5Days: City[];
  isFavorite: boolean;
  btnFavorite: string;
  isExist: boolean;
  favorite: Favorite;

  constructor(private weatherService: WeatherService, private favoritesService: FavoritesService, private toastr: ToastrService) {
    this.cityName = "Tel Aviv";
    this.cityKey = "215854";
  }

  ngOnInit() {
    if (localStorage.getItem('currentCityKey')) {
      this.cityKey = localStorage.getItem('currentCityKey');
      this.cityName = localStorage.getItem('currentCityName');
    }
    this.onCityFavoriteExist(this.cityKey);
    this.getWeather(this.cityKey);
    this.get5DaysForecast(this.cityKey);
  }

  @HostListener('window:beforeunload')
  removeKeyAndName() {
    localStorage.removeItem('currentCityKey');
    localStorage.removeItem('currentCityName');
  }

  autocomplete() {
    let regex = /^[A-Za-z ]*$/;
    let isEnglish = regex.test(this.citySearch.nativeElement.value);
    if (isEnglish) {
      this.weatherService.getCityAutocomplete(this.citySearch.nativeElement.value).subscribe((data) => {
        this.citiesResults = data;
      }, error => {
        this.errorMessage(error.name);
      });
    } else {
      this.errorMessage('English letters only');
    }
  }

  setCity(city: City) {
    this.cityName = city.LocalizedName;
    this.cityKey = city.Key;
    this.citiesResults = [];
    this.citySearch.nativeElement.value = this.cityName + ", " + city.Country.LocalizedName;
    localStorage.setItem('currentCityKey', this.cityKey);
    localStorage.setItem('currentCityName', this.cityName);
    this.onCityFavoriteExist(this.cityKey);
    this.getWeather(this.cityKey);
    this.get5DaysForecast(this.cityKey);
  }

  getWeather(key: string) {
    this.weatherService.getCurrentWeather(key).subscribe((data) => {
      this.city = data[0];
    }, error => {
      this.errorMessage(error.name);
    });
  }

  get5DaysForecast(key: string) {
    this.weatherService.get5DaysForecast(key).subscribe((data) => {
      this.forecastOf5Days = data;
    }, error => {
      this.errorMessage(error.name);
    });
  }

  onFavoriteClick() {
    this.isExist = this.favoritesService.checkFavoriteExist(this.cityKey);
    if (this.isExist) {
      this.removeFavorite();
      this.btnFavorite = 'Add To Favorites';
      this.isFavorite = false;
    }
    else {
      this.addFavorite();
      this.successMessage("City added successfully");
      this.btnFavorite = 'Remove From Favorites';
      this.isFavorite = true;
    }
  }

  removeFavorite() {
    this.favoritesService.removeFromFavorites(this.cityKey);
  }

  addFavorite() {
    this.favorite = {
      key: this.cityKey,
      localizedName: this.cityName,
      tempValue: this.city.Temperature.Metric.Value,
      weatherText: this.city.WeatherText
    }
    this.favoritesService.addToFavorites(this.favorite);
  }

  onCityFavoriteExist(key: string) {
    this.isExist = this.favoritesService.checkFavoriteExist(key);
    if (this.isExist) {
      this.btnFavorite = 'Remove From Favorites';
      this.isFavorite = true;
    } else {
      this.btnFavorite = 'Add To Favorites';
      this.isFavorite = false;
    }
  }

  errorMessage(error: string) {
    this.toastr.error("Error:" + JSON.stringify(error));
  }

  successMessage(success: string) {
    this.toastr.success("success:" + JSON.stringify(success));
  }
}
