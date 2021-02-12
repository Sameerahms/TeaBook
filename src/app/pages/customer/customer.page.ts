import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup, FormControl}from '@angular/forms'
import { HomeService }  from'src/app/services/home.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  get name(){
    return this.registrationform.get('name');
  }
  get address(){
    return this.registrationform.get('address');
  }
  get cardno(){
    return this.registrationform.get('cardno');
  }
  get phoneno(){
    return this.registrationform.get('phoneno');
  }

  validationMessages = {
    name:[
      { type: 'required', message: 'Name is required.' },
      { type: 'maxlength', message: 'Card Number must be 50 characters long.' }
    ],
    address :[
      { type: 'required', message: 'Address is required.' },
      { type: 'maxlength', message: 'Card Number must be 100 characters long.' }
    ],
    cardno: [
      { type: 'required', message: 'Card Number is required.' },
      { type: 'maxlength', message: 'Card Number must be 4 characters long.' }
    ],
    phoneno :[
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Enter a valid Phone number.' }
    ],
  }
  
  registrationform = this.formBuilder.group({
    name : ['', [Validators.required, Validators.maxLength(10)]],
    address : ['', [Validators.required, Validators.maxLength(100)]],
    cardno :['', [Validators.required, Validators.maxLength(4)]],
    phoneno :['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')]]
  });

  
  constructor(
                private formBuilder: FormBuilder,
                private homeService : HomeService,
                private alertCtrl :AlertController
              ) { }

  ngOnInit() {

    // this.registrationform = this.formBuilder.group({

    //   name: new FormControl('', Validators.compose([
    //     Validators.required
    //   ])),
    //   address: new FormControl('', Validators.compose([
    //     Validators.required
    //   ])),
    //   cardno: new FormControl('', Validators.compose([

    //     Validators.maxLength(4)
    //   ])),
    //   phoneno: new FormControl('', Validators.compose([
    //     //Validators.pattern('^\(?([0]{1})\)?[-. ]?([7]{1})[-. ]?([0-9]{8})$/'),
    //     Validators.required
    //   ]))
    // })
  }

  //register the customer
  async regSubmit(){

    var regData = {name: this.registrationform.value.name, address: this.registrationform.value.address, cadrNo: this.registrationform.value.cardno, phoneNo: this.registrationform.value.phoneno};
    console.log('regDate', regData);

    
    this.homeService.saveCustomer(regData);
    this.registrationform.reset();

    const alert = await this.alertCtrl.create({  
      header: 'DONE',  
      //subHeader: 'SubTitle',  
      message: 'Customer is registed!',  
      buttons: ['OK']  

    });  
    await alert.present();

  }

}
