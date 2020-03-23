import { Component, OnInit } from '@angular/core';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  Days = [
    { id: 0, name: 'M' },
    { id: 1, name: 'T' },
    { id: 2, name: 'W' },
    { id: 3, name: 'T' },
    { id: 4, name: 'F' },
    { id: 5, name: 'S' },
    { id: 6, name: 'S' }
  ];
  Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  Before_month=[];
  Month_numbers=[];
  After_month=[];

  Month = new Date().getMonth();
  todayMonth = this.Month;
  Year = new Date().getFullYear();
  todayYear = this.Year;
  dayNumber = new Date(this.Year, this.Month + 1, 0).getDate();
  lastMonthdayNumber = new Date(this.Year, this.Month, 0).getDate();
  firstDay = new Date(this.Year, this.Month, 1).getDay();
  todayNumber = new Date().getDate();
  
  
  ngOnInit() {
    
    this.fillDayNumbers(this.firstDay, this.lastMonthdayNumber, this.dayNumber);

    this.showMonth(this.Months[this.Month], this.Year);

  }

  showMonth(mnth, yr){
    var str = mnth + " " + yr;
    document.getElementById("month").innerHTML = str;
  }

  fillDayNumbers(_firstDay, _lastMonthdayNumber, _dayNumber){
    if(_firstDay == 0){
      _firstDay = 7;
    }

    for(var i = _firstDay-2; i >= 0; i--){
      this.Before_month.push(_lastMonthdayNumber - i);
    }
    for(var i = 1; i <= _dayNumber; i++){
      this.Month_numbers.push(i);
    }

    var lastDay = new Date(this.Year, this.Month, this.Month_numbers.length).getDay();

    if(lastDay != 0){
      for(var i = 1; i <= 7-lastDay; i++){
        this.After_month.push(i);
      }
    }
    // console.log(this.After_month.length);
    if(this.Before_month.length + this.After_month.length < 11){
      var len = this.After_month.length + 1;
      for(i = len; i <= len + 6; i++){
        this.After_month.push(i);
      }
    }
    this.firstDay = 8 - _firstDay;
  }

  next(){
    if(this.Month == 11){
      this.Month = 0;
      this.Year += 1;
      //daematos weliwadis gazrda
    }else{
      this.Month += 1;
    }

    this.Before_month=[];
    this.Month_numbers=[];
    this.After_month=[];
    this.firstDay = new Date(this.Year, this.Month, 1).getDay();
    this.lastMonthdayNumber = new Date(this.Year, this.Month, 0).getDate();
    this.dayNumber = new Date(this.Year, this.Month + 1, 0).getDate();

    this.fillDayNumbers(this.firstDay, this.lastMonthdayNumber, this.dayNumber);

    this.showMonth(this.Months[this.Month], this.Year);
    // console.log(this.Month);
  }

  previous(){
    if(this.Month == 0){
      this.Month = 11;
      this.Year -= 1;
      //daematos weliwadis shemcireba
    }else{
      this.Month -= 1;
    }

    this.Before_month=[];
    this.Month_numbers=[];
    this.After_month=[];
    this.firstDay = new Date(this.Year, this.Month, 1).getDay();
    this.lastMonthdayNumber = new Date(this.Year, this.Month, 0).getDate();
    this.dayNumber = new Date(this.Year, this.Month + 1, 0).getDate();

    this.fillDayNumbers(this.firstDay, this.lastMonthdayNumber, this.dayNumber);

    this.showMonth(this.Months[this.Month], this.Year);

    // console.log(this.Month);
  }
  

}


