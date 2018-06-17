export class User {
  id: number;
  username: string;
  firstName: string;
  password: string;
  confirmPassword: string;
  email: string;
  enabled: boolean;
  createdOn: string;
  lastUpdatedOn: string;

  constructor(username: string, password: string, confirmPassword: string) {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }

}
