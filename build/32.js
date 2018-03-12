webpackJsonp([32],{

/***/ 1645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginSliderPageModule", function() { return LoginSliderPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login__ = __webpack_require__(1710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginSliderPageModule = (function () {
    function LoginSliderPageModule() {
    }
    return LoginSliderPageModule;
}());
LoginSliderPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__login__["a" /* LoginPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__login__["a" /* LoginPage */]
        ]
    })
], LoginSliderPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 1710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_wallet_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_web3_service__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { FormBuilder, FormControl, Validator } from '@angular/forms';









var LoginPage = (function () {
    function LoginPage(userService, navCtrl, loadingCtrl, alertCtrl, afAuth, global, menuCtrl, walletService, web3Service) {
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.afAuth = afAuth;
        this.global = global;
        this.menuCtrl = menuCtrl;
        this.walletService = walletService;
        this.web3Service = web3Service;
        this.alive = true;
        this.account = {
            username: '',
            password: ''
        };
    }
    LoginPage.prototype.goToLogin = function () {
        this.navCtrl.push('FirebaseLoginPage');
    };
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.slideNext = function () {
        this.innerSlider.slideNext();
    };
    LoginPage.prototype.slidePrevious = function () {
        this.innerSlider.slidePrev();
    };
    LoginPage.prototype.presentLoading = function (message) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            duration: 500
        });
        loading.onDidDismiss(function () {
            var alert = _this.alertCtrl.create({
                title: 'Success',
                subTitle: message,
                buttons: ['Dismiss']
            });
            alert.present();
        });
        loading.present();
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        //Check if already authenticated
        var _this = this;
        this.userService.checkAuthentication().takeWhile(function () { return _this.alive; }).subscribe(function (auth) {
            if (auth) {
                _this.userService.getProfil(auth.uid).takeWhile(function () { return _this.alive; }).subscribe(function (p) {
                    _this.userService._profil = p;
                    _this.global.set('profil', p);
                    var password = null;
                    var decrypted = null;
                    var prompt = _this.alertCtrl.create({
                        title: 'Unlock your wallet',
                        subTitle: 'Enter your password',
                        cssClass: 'promt-alert',
                        inputs: [
                            {
                                name: 'password',
                                placeholder: 'Password',
                                type: 'password'
                            },
                        ],
                        buttons: [
                            {
                                text: 'Cancel',
                                handler: function (data) {
                                    //console.log('Cancel clicked');
                                }
                            },
                            {
                                text: 'Validate',
                                handler: function (data) {
                                    password = data.password.trim();
                                    var decrypted = null;
                                    try {
                                        decrypted = __WEBPACK_IMPORTED_MODULE_6_crypto_js__["AES"].decrypt(_this.walletService.wallets.eth.private, password);
                                    }
                                    catch (e) {
                                        decrypted = null;
                                    }
                                    if (decrypted) {
                                        _this.web3Service.initWeb3(password, _this.walletService.wallets.eth.private, _this.walletService.wallets.eth.address);
                                        _this.menuCtrl.enable(true, 'menu-material');
                                        if (!_this.userService._profil.uid) {
                                            _this.navCtrl.setRoot('ProfileSettingsPage', { isNew: true });
                                        }
                                        else {
                                            _this.navCtrl.setRoot('TabsPage');
                                        }
                                    }
                                }
                            }
                        ]
                    });
                    prompt.present();
                });
            }
        });
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    // Attempt to login in through our User service
    LoginPage.prototype.login = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait while login'
        });
        loading.present();
        if (!this.account.username || !this.account.password) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please fill fields',
                buttons: ['Dismiss']
            });
            loading.dismissAll();
            alert_1.present();
            return;
        }
        this.userService.login(this.account).then(function (resp) {
            loading.dismissAll();
            _this.userService.getProfil(resp.uid).takeWhile(function () { return _this.alive; }).subscribe(function (p) {
                _this.userService._profil = p;
                _this.global.set('profil', p);
                _this.menuCtrl.enable(true, 'menu-material');
                if (!_this.userService._profil.uid) {
                    _this.navCtrl.setRoot('ProfileSettingsPage', { isNew: true });
                }
                else {
                    _this.navCtrl.setRoot('TabsPage');
                }
            });
        }, function (err) {
            var alert1 = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'No valid email/password',
                buttons: ['Dismiss']
            });
            loading.dismissAll();
            alert1.present();
        });
    };
    LoginPage.prototype.signup = function () {
        var _this = this;
        if (!this.account.username || !this.account.password || this.account.password != this.confirmPassword) {
            var alert_2 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'No valid email/password',
                buttons: ['Dismiss']
            });
            alert_2.present();
            return;
        }
        var loading = this.loadingCtrl.create({
            content: 'Please wait while creating your account'
        });
        loading.present();
        this.userService.signup(this.account).then(function (resp) {
            _this.userService.login(_this.account).then(function (resp1) {
                loading.dismissAll();
                _this.navCtrl.setRoot('ProfileSettingsPage', { isNew: true });
            }, function (err) {
                var alert1 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'No valid email/password',
                    buttons: ['Dismiss']
                });
                loading.dismissAll();
                alert1.present();
            });
        }).catch(function (err) {
            //console.log("Unable to sign up", err);
            loading.dismissAll();
            _this.alertCtrl.create({
                title: 'Error',
                subTitle: err.message,
                buttons: ['Close']
            }).present();
        });
    };
    LoginPage.prototype.resetPassword = function () {
        this.presentLoading('An e-mail was sent with your new password.');
    };
    LoginPage.prototype.loginGoogle = function () {
        var _this = this;
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].GoogleAuthProvider()).then(function (success) {
            _this.navCtrl.setRoot('TabsPage');
        }).catch(function (err) {
            //console.log("Unable to log in", err);
        });
    };
    return LoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('slider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
], LoginPage.prototype, "slider", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('innerSlider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
], LoginPage.prototype, "innerSlider", void 0);
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"D:\ivpay2\src\pages\auth\login.html"*/'<ion-content class="transparent-header">\n\n  <ion-header>\n\n    <ion-navbar>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-slides #slider  direction="vertical">\n\n      <ion-slide class="swiper-no-swiping">\n\n        <div padding>\n\n          <img class="logo" src="assets/img/logo/neoplace1.png" width="100"/>\n\n          <ion-slides class="text-slider" autoplay="2000" loop="true">\n\n            <ion-slide>\n\n              <h3>Welcome to NeoPlace</h3>\n\n              <p>Buy & sell any good, any service</p>\n\n            </ion-slide>\n\n            <ion-slide>\n\n              <h3>NeoPlace Pay</h3>\n\n              <p>It has never been easier to pay in cryptocurrency</p>\n\n            </ion-slide>\n\n            <ion-slide>\n\n              <h3>NeoPlace</h3>\n\n              <p>The decentralized Marketplace</p>\n\n            </ion-slide>\n\n            <ion-slide>\n\n              <h3>NeoPlace Market</h3>\n\n              <p>Find any product around you and the world</p>\n\n            </ion-slide>\n\n            <ion-slide>\n\n              <h3>NeoPlace Services</h3>\n\n              <p>Find any service around you and the world</p>\n\n            </ion-slide>\n\n          </ion-slides>\n\n          <ion-row>\n\n            <ion-col col-6>\n\n              <button ion-button block color="primary" outline (click)="goToLogin()">Log in</button>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n              <button ion-button block (click)="goToSignup()">Create Account</button>\n\n            </ion-col>\n\n          </ion-row>\n\n        </div>\n\n      </ion-slide>\n\n      <ion-slide class="zoom swiper-no-swiping">\n\n        <ion-slides #innerSlider class="content-slider">\n\n          <ion-slide class="swiper-no-swiping">\n\n            <div padding-left padding-right text-left>\n\n              <h1 padding-horizontal>Login</h1>\n\n              <ion-item padding-right>\n\n                <ion-label floating>Email</ion-label>\n\n                <ion-input type="email" [(ngModel)]="account.username"></ion-input>\n\n              </ion-item>\n\n              <ion-item padding-right>\n\n                <ion-label floating>Password</ion-label>\n\n                <ion-input type="password" [(ngModel)]="account.password"></ion-input>\n\n              </ion-item>\n\n              <div padding>\n\n                <button ion-button block (click)="login()">Login</button>\n\n                <button no-padding ion-button clear (click)="slideNext()" color="light">FORGOT PASSWORD?</button>\n\n              </div>\n\n              <button small clear text-left margin-top ion-button icon-right clear (click)="goToSignup()">\n\n                GO TO SIGNUP\n\n                <ion-icon end name="arrow-down"></ion-icon>\n\n              </button>\n\n            </div>\n\n          </ion-slide>\n\n          <ion-slide class="swiper-no-swiping">\n\n            <div padding>\n\n              <h1 text-left padding-horizontal>Forgot Password?</h1>\n\n              <p text-left padding-horizontal>We will send the confirmation link to reset your password.</p>\n\n              <ion-item padding-right>\n\n                <ion-label floating>E-mail</ion-label>\n\n                <ion-input type="email"></ion-input>\n\n              </ion-item>\n\n              <div padding>\n\n                <button ion-button block (click)="resetPassword()">RESET PASSWORD</button>\n\n                <button small ion-button icon-left float-left no-padding clear (click)="slidePrevious()" color="light"><ion-icon name="arrow-back"></ion-icon> GO BACK</button>\n\n              </div>\n\n            </div>\n\n          </ion-slide>\n\n        </ion-slides>\n\n      </ion-slide>\n\n      <ion-slide class="zoom swiper-no-swiping">\n\n        <div padding-left padding-right text-left>\n\n          <button small text-left margin-bottom ion-button icon-right clear (click)="goToLogin()">\n\n            GO TO LOGIN\n\n            <ion-icon end name="arrow-up"></ion-icon>\n\n          </button>\n\n          <h1 padding-horizontal>Create account</h1>\n\n          <p padding-horizontal>Join NeoPlace.</p>\n\n          <ion-item padding-right>\n\n            <ion-label floating>Email</ion-label>\n\n            <ion-input type="email" [(ngModel)]="account.username"></ion-input>\n\n          </ion-item>\n\n          <ion-item padding-right>\n\n            <ion-label floating>Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="account.password"></ion-input>\n\n          </ion-item>\n\n          <ion-item padding-right>\n\n            <ion-label floating>Confirm Password</ion-label>\n\n            <ion-input type="password" [(ngModel)]="confirmPassword"></ion-input>\n\n          </ion-item>\n\n          <div padding>\n\n            <button ion-button block (click)="signup()">SIGN UP</button>\n\n          </div>\n\n          </div>\n\n      </ion-slide>\n\n    </ion-slides>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\auth\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_5__app_global_setting__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_wallet_service__["a" /* WalletService */],
        __WEBPACK_IMPORTED_MODULE_8__providers_web3_service__["a" /* Web3Service */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=32.js.map