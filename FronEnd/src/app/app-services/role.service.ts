import { Role } from '../app-models/role.model';
import { ApplicationProperties } from '../properties/applicationproperties';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  
   private getAllRolesUrl = ApplicationProperties.BackendRestUrl + 'admin/getAllRoles';

  
  getAllRoles() {
     const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get<Role[]>(this.getAllRolesUrl, {headers: headers});
  }
  
  
}
