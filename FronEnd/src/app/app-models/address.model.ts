export class Address {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  addressType: AddressType;
  postalCode: number;
  userId: number;
  createdOn: string;
  lastUpdatedOn: string;
  
  constructor(firstName: string,lastName: string, address: string, postalCode: number, ) {
  this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.postalCode = postalCode;
  }
}
