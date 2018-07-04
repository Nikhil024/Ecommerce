import {Address} from '../app-models/address.model';
import {Card} from '../app-models/card.model';
import {AddressService} from '../app-services/address.service';
import {CardService} from '../app-services/card.service';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CartService} from '../app-services/cart.service';
import {Cart} from '../app-models/cart.model';
import {Order} from '../app-models/order.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [CardService, AddressService]

})
export class AddressComponent implements OnInit {
  cardFormInputDisabled = false;
  card: Card;
  public totalCartCost = 0;
  address: Address[];
  addressIsEmpty = false;
  cart = new Cart(null, null);
  shippingFName = '';
  shippingLName = '';
  shippingAddr = '';
  shippingPCode = '';
  order = new Order(null, null, null);

  constructor(private cardService: CardService,
              private addressService: AddressService,
              private cartService: CartService) {}


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
    this.cartService.getCart(parseInt(localStorage.getItem('cartId'), 10)).subscribe(
      response => {
        this.cart = response;
        for (const product of this.cart.product) {
          this.totalCartCost += product.offerPrice;
        }
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  submitOrder(addressForm: NgForm) {
    if (localStorage.getItem('xAuthToken') != null) {
      this.cardService.validateCard(new Card(addressForm.value.cardNumber, addressForm.value.cardType, addressForm.value.cardExpiryYear, addressForm.value.cardExpiryMonth)).subscribe(
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

  copyAddress(addressForm: NgForm) {
    this.shippingFName = addressForm.value.shippingFirstName;
    this.shippingLName = addressForm.value.shippingLastName;
    this.shippingAddr = addressForm.value.shippingAddress;
    this.shippingPCode = addressForm.value.shippingPostalCode;
  }

  toggleAddress(event) {
    if ( !event.target.checked ) {
      this.shippingFName = '';
      this.shippingLName = '';
      this.shippingPCode = '';
      this.shippingAddr = '';
    }
  }
}
