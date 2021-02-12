import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';

  constructor(
    private homeService: HomeService
    )
     { 
    // this.router.events.subscribe((event: RouterEvent) => {
    //   this.selectedPath = event.url;
    // });
  }

  ngOnInit() {
    // console.log('home service');
  this.results = this.homeService.searchData(this.searchTerm);
  }

  searchChanged() {
    // Call our service function which returns an Observable
    
    this.results = this.homeService.searchData(this.searchTerm);
    console.log('this', this.results);
  }
}
