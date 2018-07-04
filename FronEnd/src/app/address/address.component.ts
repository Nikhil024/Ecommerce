import {Address} from '../app-models/address.model';
import {Card} from '../app-models/card.model';
import {AddressService} from '../app-services/address.service';
import {CardService} from '../app-services/card.service';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [CardService, AddressService]

})
export class AddressComponent implements OnInit {
  cardFormInputDisabled = false;
  card: Card;
  constructor(private cardService: CardService,
    private addressService: AddressService) {}
  address: Address[];
  addressIsEmpty = false;

  ngOnInit() {
    this.addressService.getAddress().subscribe(
      response => {
        this.address = response;
        if (response.length === 0) {
          this.addressIsEmpty = true;
          console.log(JSON.stringify(response));
        } else {
          this.addressIsEmpty = false;
        }
      }
    ); 
  }

  validateCard(form: NgForm) {
    console.log(form.value.cardNumber);
    console.log(form.value.cardType);
    console.log(form.value.cardExpiryMonth);
    console.log(form.value.cardExpiryYear);
    if (localStorage.getItem('xAuthToken') != null) {
      this.cardService.validateCard(new Card(form.value.cardNumber, form.value.cardType, form.value.cardExpiryYear, form.value.cardExpiryMonth)).subscribe(
        response => {
          if (response.status === ApplicationProperties.CardSuccess) {
            this.cardFormInputDisabled = true;
          } else if (response.status === ApplicationProperties.CardFraud) {
            this.cardFormInputDisabled = false;
          } else if (response.status === ApplicationProperties.CardFailure) {
            this.cardFormInputDisabled = false;
          }
        },
        error => {
          console.log('faced Error for card' + JSON.stringify(error));
        }
      );
    } else {
      console.log('not logged in ');
    }
  }
  
  validateAddress(f: NgForm) {
    
  }
  
}
