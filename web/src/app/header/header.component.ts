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

  isAuthenticatedUser = false;

  private subscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.subscription = this.loginService.getAuthenticatedUserObservable().subscribe(value => {
      this.isAuthenticatedUser = value;
    });
    this.isAuthenticatedUser = LocalStorageUtils.isAuthenticatedUser();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    LocalStorageUtils.clearAuthenticatedUser();
    this.loginService.setAuthenticatedUser(false);
    this.router.navigate(['']);
  }
}
