import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';

@Injectable()
export class FileUploadService {
  private fileUploadUrl = ApplicationProperties.BackendRestUrl + 'admin/upload';

  constructor(private httpClient: HttpClient) {}


  uploadProductImage(formData: FormData) {
    return this.httpClient.post(this.fileUploadUrl, formData);
  }


}
