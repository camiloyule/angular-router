import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[]=[];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categorieService: CategoriesService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getCategories();
    this.authService.user$
    .subscribe(data=>{
      this.profile=data;
    })
  }
  getCategories(){
    this.categorieService.getAll()
    .subscribe(categories=>{
      this.categories=categories;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.route.navigate(['/profile']);
    });
  }
  logOut(){
    this.authService.logOut();
    this.profile=null;
    this.route.navigate(['/home']);

  }

}
