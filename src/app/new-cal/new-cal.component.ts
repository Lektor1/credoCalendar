import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-cal',
  templateUrl: './new-cal.component.html',
  styleUrls: ['./new-cal.component.scss']
})
export class NewCalComponent implements OnInit {

  constructor() {
    
  }

  Days = [
    "Mo",
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
    'Su'
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

  State = [
    'StateDay',
    'StateMonth',
    'StateYear'
  ];
  i = 0;
  StateOn = this.State[this.i];

  Before_month=[];
  Month_numbers=[];
  After_month=[];

  Year_numbers=[];

  Month = new Date().getMonth();
  todayMonth = this.Month;
  Year = new Date().getFullYear();

  todayYear = this.Year;
  dayNumber = new Date(this.Year, this.Month + 1, 0).getDate();
  lastMonthdayNumber = new Date(this.Year, this.Month, 0).getDate();
  firstDay = new Date(this.Year, this.Month, 1).getDay();
  todayNumber = new Date().getDate();
  //test day
  //todayNumber = 8;

  
  DisMnth;
  DisYear;
  DisDecade;
  
  ngOnInit(): void {
    
    this.fillDayNumbers(this.firstDay, this.lastMonthdayNumber, this.dayNumber);

    this.showTitle(this.Months[this.Month], this.Year);

    this.fillYearNumbers(this.Year);

    //console.log(this.Month + " " + this.DisMnth);
  }

  // achvenebs shuashi teksts
  showTitle(mnth, yr){
    this.DisMnth = mnth;
    this.DisYear = yr;
  }

  // avsebs wlebis masivs
  fillYearNumbers(start){
    for(var i = start; i <= start + 11; i++){
      this.Year_numbers.push(i);
    }
  }

  // cvlis dgeebis, tveebis, wlebis 
  change(){
    this.i++;

    if(this.i == 3){
      this.i = 0;
    }

    this.StateOn = this.State[this.i];

    if(this.i == 0){
      this.DisDecade = '';
      this.showTitle(this.Months[this.Month], this.Year);
    }else if(this.i == 1){
      this.showTitle('', this.Year);
    }else if(this.i == 2){
      this.showTitle('','');
      this.DisDecade = this.Year + " - " + (this.Year + 11);
      // this.DisYear = 
    }

  }

  // avsebs dgeebis masivs
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
      if(this.Before_month.length + this.After_month.length < 11){
        len = this.After_month.length + 1;
        for(i = len; i <= len + 6; i++){
          this.After_month.push(i);
        }
      }
    }
    this.firstDay = 8 - _firstDay;
  }

  //shemdegi tve
  next(){
    if(this.i == 0 ){

      if(this.Month == 11){
        this.Month = 0;
        this.Year += 1;
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

      this.showTitle(this.Months[this.Month], this.Year);

    }else if(this.i == 1){

      this.DisYear += 1;
      var st = +(this.DisYear);

    }else if(this.i == 2){

      // this.fir += 11;
      

      var st = +this.Year_numbers[11];
      // console.log(st);
      this.Year_numbers = [];
      this.fillYearNumbers(st);

      this.DisDecade = st + " - " + (st + 11);

    }
    
    // console.log(this.Month);
  }

  // wina tve
  previous(){

      if(this.i == 0 ){

      if(this.Month == 0){
        this.Month = 11;
        this.Year -= 1;
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

      this.showTitle(this.Months[this.Month], this.Year);

    }else if(this.i == 1){

      this.DisYear -= 1;

    }else if(this.i == 2){

      var st = +this.Year_numbers[0];
      st -=11;
      // console.log(st);
      this.Year_numbers = [];
      this.fillYearNumbers(st);

      this.DisDecade = st + " - " + (st + 11);

    }
  }
}
