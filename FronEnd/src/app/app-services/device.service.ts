import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeviceService {
  private urlValue = 'http://localhost:1234';
  constructor(private httpClient: HttpClient) {}

  getAllDevicesList() {
    return this.httpClient.get(this.urlValue).subscribe();
  }
}
