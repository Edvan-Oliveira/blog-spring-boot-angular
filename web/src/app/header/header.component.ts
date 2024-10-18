import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoginService} from "../login/services/login.service";
import {LocalStorageUtils} from "../util/local-storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserLogged = false;

  private subscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.subscription = this.loginService.getUserLoggedObservable().subscribe(value => {
      console.log(value)
      this.isUserLogged = value;
    });
    this.isUserLogged = LocalStorageUtils.isUserLogged();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    LocalStorageUtils.clearUserToken();
    this.loginService.setUserLogged(false);
    this.router.navigate(['']);
  }
}
