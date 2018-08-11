export class User {
  public id: number;
  public username: string;
  public firstName: string;
  public password: string;
  public confirmPassword: string;
  public email: string;
  public enabled: boolean;
  public role: string;
  public createdOn: string;
  public lastUpdatedOn: string;

  constructor(username: string, password: string, confirmPassword: string, role: string, email: string, enabled: boolean) {
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = role;
    this.email = email;
    this.enabled = enabled;
  }
}
