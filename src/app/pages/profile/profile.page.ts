import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  quantityDetails =null;

  constructor(private activatedRoute: ActivatedRoute, private homeService: HomeService) { }
   

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('cadrNo');

    this.homeService.getQuantityId(id).subscribe(results =>{
      console.log('details', results);
      this.quantityDetails = results;
    });

  }

}
