import { MatDialog } from '@angular/material/dialog';
import { Component, NgModuleFactoryLoader } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './shared/models/login.model';
import { AuthenticationService } from './shared/services/authentication.service';
import { CartService } from './shared/services/cart.service';
import { Observable } from 'rxjs';
import { Category, CategoryCollection } from './shared/models/category.model';
import { CategoryService } from './shared/services/category.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookstore';
  currentUser: Login;
  isLogin = false;
  isAdmin = false;
  titleModal = 'Example Angular 8 Material Dialog';
  cartQuantity: number;
  cateCollection: CategoryCollection[];

  name: string;
  animal: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private categoryService: CategoryService,
  ) {
      // this.authenticationService.currentUser.subscribe(x => {
      //     if (x != null) {
      //       this.currentUser = x;
      //       this.isLogin = true;

      //       (this.currentUser.roles).forEach(element => {
      //         if (element.match(`ROLE_ADMIN`)) {
      //           this.isAdmin = true;
      //         }
      //       });
      //     }
      //   }
      // );
  }

  ngOnInit(): void {
    const currentAccount = this.authenticationService.currentUserValue;
      if (currentAccount) {
        this.cartQuantity = this.cartService.getCartQuantity || 0;
      }

    this.getCategoryCollection();
  }

  logout() {
      this.authenticationService.logout();
      this.ngOnInit();
  }

  getCategoryCollection(): void {
    this.categoryService.getAllParentCategories().subscribe((parentCate: Category[]) => {
      this.cateCollection = parentCate.map(cate => new CategoryCollection({parentCate: cate, childCate: []}))
      this.cateCollection.forEach(cateCollect => {
        this.categoryService.getChildCategories(cateCollect.parentCate.id).subscribe((childCate: Category[]) => {
          cateCollect.childCate = childCate;
        })
      });
      console.log(this.cateCollection);
    })
  }
}
