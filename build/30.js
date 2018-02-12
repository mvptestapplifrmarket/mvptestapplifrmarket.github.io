webpackJsonp([30],{

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(859);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = (function () {
    function RegisterPageModule() {
    }
    return RegisterPageModule;
}());
RegisterPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
        ],
    })
], RegisterPageModule);

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = (function () {
    function RegisterPage(toastCtrl, loadingCtrl, alertCtrl, navCtrl, navParams, formBuilder, userService) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.regisForm = this.formBuilder.group({
            'emailRegister': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'passwordRegister': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])],
            'confirmPassword': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6)])]
        });
        this.emailRegister = this.regisForm.controls['emailRegister'];
        this.passwordRegister = this.regisForm.controls['passwordRegister'];
        this.confirmPassword = this.regisForm.controls['confirmPassword'];
    }
    RegisterPage.prototype.doRegister = function () {
        var _this = this;
        var account = ({ username: this.emailRegister.value.trim(), password: this.passwordRegister.value.trim() });
        if (!account.username || !account.password || account.password != this.confirmPassword.value) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'No valid email/password',
                buttons: ['Dismiss']
            });
            alert_1.present();
            return;
        }
        var loading = this.loadingCtrl.create({
            content: 'Please wait while creating your account'
        });
        loading.present();
        this.userService.signup(account).then(function (resp) {
            _this.userService.login(account).then(function (resp1) {
                loading.dismiss();
                _this.navCtrl.setRoot('ProfileSettingsPage', { isNew: true });
            }, function (err) {
                var alert1 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'No valid email/password',
                    buttons: ['Dismiss']
                });
                loading.dismiss();
                alert1.present();
            });
        }).catch(function (err) {
            //console.log("Unable to sign up", err);
            loading.dismiss();
            _this.alertCtrl.create({
                title: 'Error',
                subTitle: err.message,
                buttons: ['Close']
            }).present();
        });
    };
    RegisterPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    RegisterPage.prototype.showError = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    RegisterPage.prototype.hintFormatPassword = function () {
        this.toastCtrl.create({
            message: 'Minimum password length required : 6 characters',
            duration: 4000,
            position: 'bottom'
        }).present();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"D:\ivpay2\src\pages\auth\register\register.html"*/'<ion-content padding class="transparent-header">\n\n  <ion-header no-border>\n\n    <ion-navbar transparent>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  <div class="login-container">\n\n    <img class="logo" src="assets/img/logo/neoplace1.png" />\n\n    <h2>Register</h2>\n\n    <ion-row style="display: inline-block">\n\n      <form [formGroup]="regisForm" (ngSubmit)="doRegister()" #registerForm="ngForm">\n\n        <ion-item>\n\n          <ion-label>Email</ion-label>\n\n          <ion-input type="text" formControlName="emailRegister" ></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label>Password</ion-label>\n\n          <ion-input type="password" formControlName="passwordRegister" (focusout)="!passwordRegister.valid ? hintFormatPassword() : false"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-label>Confirm Password</ion-label>\n\n          <ion-input type="password" formControlName="confirmPassword" ></ion-input>\n\n        </ion-item>\n\n        <div>\n\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid || passwordRegister.value !== confirmPassword.value">SIGN UP</button>\n\n        </div>\n\n      </form>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\auth\register\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=30.js.map