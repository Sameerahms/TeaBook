import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, Validators }from '@angular/forms'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {

  info = null;

  get quantity() {
    return this.addform.get('quantity');
  }

  get date() {
    return this.addform.get('date');
  }

  public errorMessages = {
    date :[
      { type: 'required', message: 'Date is required.'}
    ],
    quantity :[
      { type: 'required', message: 'Quantity is required.'}
    ]
  };
  

  addform = this.formBuilder.group({
    date : ['', Validators.required],
    quantity : ['', Validators.required]
  });


  constructor(
              private activatedRoute: ActivatedRoute,
              private homeService: HomeService,
              private formBuilder:FormBuilder,
              public alertCtrl: AlertController) {} 

   
  
  // set header card values
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.homeService.getDetails(id).subscribe(results =>{
      console.log('details', results);
      this.info = results;
    });

    // console.log('details', this.activatedRoute.snapshot);
    // this.activatedRoute.snapshot.data['info']; 
    
  }
  //add quantitiy to db
  async addSubmit() {
    console.log(this.addform.value);
    console.log('date',this.addform.value.date);

    // let postData = new FormData;
    // postData.append('date',this.addform.value.date);
    // postData.append('quantity',this.addform.value.quantity);
    // postData.append('cardNo',this.info.cadrNo);
    // console.log('cardNo', this.info.cadrNo);
    
    //var arrryS = "'date:'+this.addform.value.date +''+ 'quantity:'+this.addform.value.quantity + 'cardNo' + this.info.cadrNo";
    var quantityData = { date:this.addform.value.date.split('T')[0], quanity:this.addform.value.quantity, cardno:this.info.cadrNo }
    
    console.log('quantityData', quantityData);
    
    this.homeService.saveQuantity(quantityData);
    // console.log('postValue', postData);
    
    this.addform.reset();
    

    const alert = await this.alertCtrl.create({  
      header: 'DONE',  
      //subHeader: 'SubTitle',  
      message: 'Tea Quantity is saved!',  
      buttons: ['OK']  

    });  
    await alert.present();
  }

}
