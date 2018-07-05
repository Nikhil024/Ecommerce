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
import {OrderService} from '../app-services/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [CardService, AddressService, OrderService]

})
export class AddressComponent implements OnInit {
  card: Card;
  public totalCartCost = 0;
  address: Address[];
  addressIsEmpty = false;
  cart = new Cart(null, null);
  shippingFName = '';
  shippingLName = '';
  shippingAddr = '';
  shippingPCode = '';

  order: Order;
  billingAddress: Address;


  constructor(private cardService: CardService,
    private addressService: AddressService,
    private cartService: CartService,
    private orderService: OrderService) {}


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

            this.addressService.saveAddress(new Address(addressForm.value.shippingFirstName, addressForm.value.shippingLastName,
              addressForm.value.shippingAddress, addressForm.value.shippingPostalCode)).subscribe(
              billingAddressResponse => {
                this.billingAddress = billingAddressResponse;
                console.log('billing Address' + JSON.stringify(billingAddressResponse));
                this.orderService.saveOrder(new Order(this.cart.product, billingAddressResponse, 'success')).subscribe(
                  orderResponse => {
                    console.log(JSON.stringify(orderResponse));
                  },
                  error => {
                    console.log(JSON.stringify(error));
                  }
                );
              },
              error => {

              }
              );




          } else if (response.status === ApplicationProperties.CardFraud) {
          } else if (response.status === ApplicationProperties.CardFailure) {
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
    if (!event.target.checked) {
      this.shippingFName = '';
      this.shippingLName = '';
      this.shippingPCode = '';
      this.shippingAddr = '';
    }
  }
}
