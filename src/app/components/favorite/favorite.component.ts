import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  @Input() favorite: Favorite;
  @Output() favoriteEvent = new EventEmitter<Favorite>();
  constructor() { }

  ngOnInit() {
  }

  showMoreDetails() {
    this.favoriteEvent.emit(this.favorite);
  }
}
