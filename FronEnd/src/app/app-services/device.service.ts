import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DeviceService {
  private urlValue = 'http://localhost:8080/personal/device';
  constructor(private httpClient: HttpClient) {}

 /* getAllDevicesList() {
    return this.httpClient.get<Devices[]>(this.urlValue);
  }*/
}
