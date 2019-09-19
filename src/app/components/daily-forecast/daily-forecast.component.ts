import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css']
})
export class DailyForecastComponent implements OnInit {

  @Input() date: string;
  @Input() icon: number;
  @Input() tempMinimum: number;
  @Input() tempMaximum: number;
  newDate: any;
  day: string;
  weekDay: string[];

  constructor() {
    this.weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }

  ngOnInit() {
    this.newDate = new Date(this.date);
    this.day = this.weekDay[this.newDate.getDay()];
  }
}
