import {Card} from '../app-models/card.model';
import { ApplicationProperties } from '../properties/applicationproperties';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class CardService {
  private validateCardURL = ApplicationProperties.BackendRestUrl + 'validateCard';
  constructor(private httpClient: HttpClient) {}


  validateCard(cardDetails: Card) {
      return this.httpClient.post<Card>(this.validateCardURL, cardDetails);
  }
}
