webpackJsonp([31],{

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirebaseLoginPageModule", function() { return FirebaseLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firebase_login__ = __webpack_require__(858);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FirebaseLoginPageModule = (function () {
    function FirebaseLoginPageModule() {
    }
    return FirebaseLoginPageModule;
}());
FirebaseLoginPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__firebase_login__["a" /* FirebaseLoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__firebase_login__["a" /* FirebaseLoginPage */]),
        ],
    })
], FirebaseLoginPageModule);

//# sourceMappingURL=firebase-login.module.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global_setting__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FirebaseLoginPage = (function () {
    function FirebaseLoginPage(loadingCtrl, alertCtrl, navCtrl, navParams, formBuilder, userService, menuCtrl, global) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.menuCtrl = menuCtrl;
        this.global = global;
        this.alive = true;
        this.loginForm = this.formBuilder.group({
            'email': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])]
        });
        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }
    FirebaseLoginPage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    FirebaseLoginPage.prototype.doLogin = function () {
        var _this = this;
        var account = ({ username: this.email.value.trim(), password: this.password.value.trim() });
        if (!account.username || !account.password) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Please fill fields',
                buttons: ['Dismiss']
            });
            alert_1.present();
            return;
        }
        var loading = this.loadingCtrl.create({
            content: 'Please wait while login'
        });
        loading.present();
        //console.log(account);
        this.userService.login(account).then(function (resp) {
            loading.dismiss();
            _this.userService.getProfil(resp.uid).takeWhile(function () { return _this.alive; }).subscribe(function (p) {
                _this.userService._profil = p;
                _this.global.set('profil', p);
                _this.menuCtrl.enable(true, 'menu-material');
                if (!_this.userService._profil.uid) {
                    _this.navCtrl.setRoot('ProfileSettingsPage', { isNew: true });
                }
                else {
                    _this.navCtrl.pop();
                    _this.navCtrl.setRoot('TabsPage');
                }
            });
        }).catch(function (err) {
            var alert1 = _this.alertCtrl.create({
                title: 'Error',
                subTitle: err.message,
                buttons: ['Dismiss']
            });
            alert1.present();
            loading.dismiss();
        });
    };
    FirebaseLoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    FirebaseLoginPage.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    return FirebaseLoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('email'),
    __metadata("design:type", Object)
], FirebaseLoginPage.prototype, "emailInput", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('password'),
    __metadata("design:type", Object)
], FirebaseLoginPage.prototype, "passwordInput", void 0);
FirebaseLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-firebase-login',template:/*ion-inline-start:"D:\ivpay2\src\pages\auth\login\firebase-login.html"*/'<ion-content padding class="transparent-header">\n\n  <ion-header no-border>\n\n    <ion-navbar transparent>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <div class="login-container">\n\n    <img class="logo" src="assets/img/logo/neoplace1.png" />\n\n    <h2>Login</h2>\n\n    <ion-row style="display: inline-block">\n\n      <form [formGroup]="loginForm" (ngSubmit)="doLogin()" #logForm="ngForm">\n\n        <ion-item >\n\n          <ion-label>Email</ion-label>\n\n          <ion-input #email type="text" formControlName="email" id="email"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label>Password</ion-label>\n\n          <ion-input #password type="password" formControlName="password" id="password" ></ion-input>\n\n        </ion-item>\n\n        <div>\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!logForm.form.valid" >Login</button>\n\n          <button no-padding ion-button clear (click)="slideNext()" color="light">FORGOT PASSWORD ?</button>\n\n        </div>\n\n      </form>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\auth\login\firebase-login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__app_global_setting__["a" /* AppState */]])
], FirebaseLoginPage);

//# sourceMappingURL=firebase-login.js.map

/***/ })

});
//# sourceMappingURL=31.js.map