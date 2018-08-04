export class Card {
  cardNumber: number;
  cartType: string;
  cardExpiryYear: number;
  cardExpiryMonth: number;
  status: string;

  constructor(cardNumber: number, cartType: string, cardExpiryYear: number, cardExpiryMonth: number) {
    this.cartType = cartType;
    this.cardNumber = cardNumber;
    this.cardExpiryYear = cardExpiryYear;
    this.cardExpiryMonth = cardExpiryMonth;
  }
}