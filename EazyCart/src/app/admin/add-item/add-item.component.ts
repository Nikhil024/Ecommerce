import {Product} from '../../app-models/product.model';
import {ProductCategory} from '../../app-models/productCategory.model';
import {Role} from '../../app-models/role.model';
import {User} from '../../app-models/user.model';
import {LoginService} from '../../app-services/login.service';
import {ProductCategoryService} from '../../app-services/product.category.service';
import {ProductService} from '../../app-services/product.service';
import {RegisterService} from '../../app-services/register.service';
import {RoleService} from '../../app-services/role.service';
import {UserService} from '../../app-services/user.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FileUploadService} from '../../app-services/file-upload.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [FileUploadService]
})
export class AddItemComponent implements OnInit {
  constructor(private router: Router,
    private activatedRouted: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private loginService: LoginService,
    private registerService: RegisterService,
    private roleService: RoleService,
    private fileUploadService: FileUploadService) {}



  itemType: string;
  productCategories: ProductCategory[];
  roles: Role[];
  private fileList: FileList;

  ngOnInit() {
     this.activatedRouted.params.subscribe(
      (params: Params) => {
        this.itemType = params['item'];

        if (this.itemType === 'user') {
          this.getAllRoles();
        } else if (this.itemType === 'product') {
          this.getAllProductCategories();
        }

      }
    );


  }

  createNewUser(newUserForm: NgForm) {
    let userEnabled = false;
    console.log('username:: ' + newUserForm.value.username);
    console.log('password:: ' + newUserForm.value.password);
    console.log('confirmPassword:: ' + newUserForm.value.confirmPassword);
    console.log('role:: ' + newUserForm.value.role);
    console.log('email:: ' + newUserForm.value.email);
    if (newUserForm.value.enabled === '') {
      userEnabled = false;
    } else if (newUserForm.value.enabled) {
      userEnabled = true;
    }
    console.log('enabled:: ' + userEnabled);

    const newUser = new User(newUserForm.value.username, newUserForm.value.password,
      newUserForm.value.confirmPassword, newUserForm.value.role,
      newUserForm.value.email, userEnabled);

console.log(JSON.stringify(newUser));
    this.registerService.registerNewUser(newUser).subscribe(
      response => {
        console.log('Success::: ' + JSON.stringify(response));
      },
      error => {
        console.log('Error::: ' + JSON.stringify(error));
      }
    );


  }
  createNewCategory(newCategoryForm: NgForm) {
    let categoryEnabled = false;
    if (newCategoryForm.value.categoryEnabled !== '' && !newCategoryForm.value.categoryEnabled) {
      categoryEnabled = false;
    } else if (newCategoryForm.value.categoryEnabled) {
      categoryEnabled = true;
    }
    const category = new ProductCategory(newCategoryForm.value.categoryName,
                                         newCategoryForm.value.categoryType, categoryEnabled);

    this.productCategoryService.createNewCategory(category).subscribe(
      response => {
        console.log('Success::: ' + JSON.stringify(response));
      },
      error => {
        console.log('Error::: ' + JSON.stringify(error));
      }
    );

  }
  createNewProduct(createProductForm: NgForm) {
    let productEnabled = false;
    if (createProductForm.value.productEnabled !== '' && !createProductForm.value.productEnabled) {
      productEnabled = false;
    } else if (createProductForm.value.productEnabled) {
      productEnabled = true;
    }

    const product = new Product(createProductForm.value.productCode,
      createProductForm.value.description,
        createProductForm.value.stock,
        createProductForm.value.price,
        createProductForm.value.offerPrice,
        createProductForm.value.productCategory,
      createProductForm.value.productCode + '.jpg',
      productEnabled);

    this.productService.createNewProduct(product).subscribe(
      response => {
        console.log('Success::: ' + JSON.stringify(response));
      }, error => {
        console.log('Error::: ' + JSON.stringify(error));
      }
    );

    if (this.fileList.length > 0) {
      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, createProductForm.value.productCode + '.jpg');
      this.fileUploadService.uploadProductImage(formData).subscribe(
        response => {
          console.log('Success::: ' + JSON.stringify(response));
        }, error => {
          console.log('Error::: ' + JSON.stringify(error));
        }
      );
    }


  }

   getAllProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe(
      (productCategories: ProductCategory[]) => {
        this.productCategories = productCategories;
      }
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      error => {

      }

    );
  }


  fileChange(event) {
    this.fileList = event.target.files;
  }

}
