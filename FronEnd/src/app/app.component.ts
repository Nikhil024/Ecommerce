import {Component, OnInit} from '@angular/core';
import {DeviceService} from './app-services/device.service';
import {Devices} from './app-models/phones.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DeviceService]
})
export class AppComponent implements OnInit {
  title = 'app';
  dev: Devices[];
  constructor(private deviceService: DeviceService) { }
  ngOnInit() {
    this.deviceService.getAllDevicesList().subscribe(
      data => this.dev = data
    );


  }
}
