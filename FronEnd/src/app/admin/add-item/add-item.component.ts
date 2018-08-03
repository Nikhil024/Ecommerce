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

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  constructor(private router: Router,
    private activatedRouted: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private loginService: LoginService,
    private registerService: RegisterService,
    private roleService: RoleService) {}



  private users: User;
  private itemType: string;
  private products: Product[];
  private productCategories: ProductCategory[];
  public seachFilterUI = '';
  private currentUser: User;
  roles: Role[];

  ngOnInit() {
    
    this.getAllProductCategories();

    this.activatedRouted.params.subscribe(
      (params: Params) => {
        this.itemType = params['item'];
      }
    );

    this.roleService.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      error => {

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
    
    if(newCategoryForm.value.categoryEnabled !== '' && !newCategoryForm.value.categoryEnabled) {
      categoryEnabled = false;
    } else if(newCategoryForm.value.categoryEnabled) {
      categoryEnabled = true;
    }
    
    
    const category = new ProductCategory(newCategoryForm.value.categoryName, 
                                         newCategoryForm.value.categoryType, 
                                         categoryEnabled);
    console.log(JSON.stringify(category));
  }
  
  createNewProduct(createProductFrom) {
    
  }

   getAllProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe(
      (productCategories: ProductCategory[]) => {
        this.productCategories = productCategories;
      }
    );
  }

}
