export class ProductCategory {
  id: number;
  type: string;
  code: string;
  enabled: boolean;
  createdOn: string;
  lastUpdatedOn: string;
  
  constructor(type: string, code: string, enabled: boolean) {
    this.type = type;
    this.code = code;
    this.enabled = enabled;
  }
}
