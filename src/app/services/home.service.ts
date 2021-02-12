import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

export enum searchType{
  all = ''
}

@Injectable({
  providedIn: 'root'
})
export class HomeService  {
  
 url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  //search customers
  searchData(title: string): Observable<any> {
    return this.http.get(`${this.url}?keyword=${encodeURI(title)}`);  
  }

  //get custermer id
  getDetails(id) {
    console.log('id',id);
    return this.http.get(`${this.url}${id}`
    );
  }

  //get custermer's Quantities and dates
  getQuantityId(id) {
    console.log('id',id);
    return this.http.get(`${this.url}quntity/?qunId=${id}`);
  }

  // Save quanity and date to databse
   saveQuantity(postdata){
    console.log('save', postdata);
    this.http.post(`http://localhost:8080/quntitySave`, postdata).subscribe(data => {}
    );
    }

    // register customer
    saveCustomer(regData){
      this.http.post(`${this.url}customer`,regData).subscribe();
    }
}


  // resolve (route: ActivatedRouteSnapshot) {
  //   let id = route.paramMap.get('id');
  //   return this.http.get(`${this.url}${id}`);
  // }

