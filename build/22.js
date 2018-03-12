webpackJsonp([22],{

/***/ 1658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileSettingsPageModule", function() { return ProfileSettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_settings__ = __webpack_require__(1724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfileSettingsPageModule = (function () {
    function ProfileSettingsPageModule() {
    }
    return ProfileSettingsPageModule;
}());
ProfileSettingsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__profile_settings__["a" /* ProfileSettingsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__profile_settings__["a" /* ProfileSettingsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__profile_settings__["a" /* ProfileSettingsPage */]
        ]
    })
], ProfileSettingsPageModule);

//# sourceMappingURL=profile-settings.module.js.map

/***/ }),

/***/ 1724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileSettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(680);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileSettingsPage = (function () {
    function ProfileSettingsPage(userService, toastCtrl, camera, navCtrl, params, global, menuCtrl, geolocation, alertCtrl) {
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.params = params;
        this.global = global;
        this.menuCtrl = menuCtrl;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.placeholderPicture = 'assets/img/avatar/user-avatar.png';
        this.profil = {};
        this.languages = ['English'];
        this.paymentMethods = ['ETH', 'BTC', 'GAS'];
        this.currencies = ['USD', 'EUR'];
        this.displayUpdate = false;
        this.isNew = false;
        this.isPass = false;
        this.alive = true;
    }
    ProfileSettingsPage.prototype.ionViewWillEnter = function () {
        if (this.params.get("isNew")) {
            this.isNew = true;
            this.profil.language = this.languages[0];
        }
        if (this.userService._profil && !this.isNew) {
            this.profil = this.userService._profil;
        }
    };
    ProfileSettingsPage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    ProfileSettingsPage.prototype.updateProfileImage = function () {
        var _this = this;
        this.camera.getPicture({
            quality: 50,
            allowEdit: true,
            cameraDirection: this.camera.Direction.FRONT,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }).then(function (imageData) {
            _this.profil.imageUrl = "data:image/jpeg;base64," + imageData;
            _this.update();
        }, function (err) {
            _this.toastCtrl.create('Error: ' + err);
        });
    };
    ProfileSettingsPage.prototype.updateData = function () {
        var _this = this;
        if (!this.checkForm()) {
            return false;
        }
        if (!this.isNew) {
            this.profil.uid = this.userService._userFirebase.uid;
            this.profil.username = this.userService._user.username;
            this.isPass = true;
            this.userService.saveProfil(this.profil);
            this.userService._profil = this.profil;
            this.toastCtrl.create({
                message: 'Profil updated',
                duration: 2000,
                position: 'bottom'
            }).present();
            if (!this.isNew) {
                this.navCtrl.pop();
            }
            return true;
        }
        else {
            this.userService.getUidFromPseudo(this.profil.pseudo)
                .takeWhile(function () { return _this.alive; })
                .subscribe(function (uid) {
                if (!uid.$value || !_this.isNew) {
                    _this.profil.uid = _this.userService._userFirebase.uid;
                    _this.profil.username = _this.userService._user.username;
                    _this.isPass = true;
                    _this.userService.saveProfil(_this.profil);
                    _this.userService._profil = _this.profil;
                    _this.global.set('profil', _this.profil);
                    _this.toastCtrl.create({
                        message: 'Profil updated',
                        duration: 2000,
                        position: 'bottom'
                    }).present();
                    if (!_this.isNew) {
                        _this.navCtrl.pop();
                    }
                    _this.menuCtrl.enable(true, 'menu-material');
                    _this.navCtrl.setRoot('TabsPage');
                    return true;
                }
                else {
                    if (!_this.isPass) {
                        var toast = _this.toastCtrl.create({
                            message: 'Pseudo already used, choose a new one',
                            duration: 2000,
                            position: 'bottom'
                        });
                        toast.present(toast);
                        return false;
                    }
                }
            });
        }
    };
    ProfileSettingsPage.prototype.checkForm = function () {
        if (!this.profil.pseudo || !this.profil.lastName || !this.profil.firstName || !this.profil.language || !this.profil.paymentMethod || !this.profil.currency) {
            this.toastCtrl.create({
                message: 'Please fill all fields',
                duration: 2000,
                position: 'bottom'
            }).present();
            return false;
        }
        return true;
    };
    ProfileSettingsPage.prototype.update = function () {
        if (!this.isNew) {
            this.displayUpdate = true;
        }
    };
    ProfileSettingsPage.prototype.next = function () {
        this.updateData();
    };
    ProfileSettingsPage.prototype.checkPseudo = function () {
        var _this = this;
        return this.userService.getUidFromPseudo(this.profil.pseudo)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (uid) {
            if (uid.$value) {
                if (!_this.isPass) {
                    _this.toastCtrl.create({
                        message: 'Pseudo already used, choose a new one',
                        duration: 2000,
                        position: 'bottom'
                    }).present();
                }
            }
        });
    };
    ProfileSettingsPage.prototype.showFiatEchange = function () {
        var _this = this;
        if (this.profil.position) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Fiat exchange',
                message: 'Your position will be displayed on the map.',
                cssClass: 'confirm-alert',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function () {
                            //console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Confirm',
                        handler: function () {
                            _this.geolocation.getCurrentPosition({ maximumAge: 30000, timeout: 3000, enableHighAccuracy: true })
                                .then(function (position) {
                                _this.profil.position = true;
                                _this.userService.saveProfilPosition(position.coords.latitude + Math.random() * (0.0019 + 0.0019) - 0.0019, position.coords.longitude + Math.random() * (0.0019 + 0.0019) - 0.0019);
                                if (!_this.isNew) {
                                    _this.userService.saveProfil(_this.profil);
                                }
                            }).catch(function (error) {
                                //console.log('Error : ', error);
                                var alert = _this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'Error while getting your position, try again',
                                    buttons: ['Close']
                                });
                                alert.present();
                            });
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.profil.position = false;
            this.userService.deleteProfilPosition();
            if (!this.isNew) {
                this.userService.saveProfil(this.profil);
            }
        }
    };
    return ProfileSettingsPage;
}());
ProfileSettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-profile-settings',template:/*ion-inline-start:"D:\ivpay2\src\pages\profile\profile-settings.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title *ngIf="!isNew">User Settings</ion-title>\n    <ion-title *ngIf="isNew">Complete your profil</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-list-header>\n      <ion-avatar item-start (click)="updateProfileImage()">\n        <img [src]="profil.imageUrl ? profil.imageUrl : placeholderPicture">\n      </ion-avatar>\n      <p class="username" *ngIf="profil.lastName && profil.firstName">{{profil.lastName + \' \' + profil.firstName}}</p>\n    </ion-list-header>\n  </ion-list>\n  <ion-list no-border>\n    <ion-list-header>\n      General\n    </ion-list-header>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>Pseudo</ion-label>\n      <ion-input [(ngModel)]="profil.pseudo" (input)="checkPseudo()" [disabled]="!isNew"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>Lastname</ion-label>\n      <ion-input [(ngModel)]="profil.lastName" (ngModelChange)="update()"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>Firstname</ion-label>\n      <ion-input [(ngModel)]="profil.firstName" (ngModelChange)="update()"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>App Language</ion-label>\n      <ion-select [(ngModel)]="profil.language" (ngModelChange)="update()">\n        <ion-option *ngFor="let language of languages" [value]="language">{{language}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n  <ion-list>\n    <ion-list-header>\n      Currency\n    </ion-list-header>\n    <ion-item>\n      <ion-icon name=\'card\' item-start></ion-icon>\n      <ion-label>Payment Method</ion-label>\n      <ion-select [(ngModel)]="profil.paymentMethod" (ngModelChange)="update()">\n        <ion-option *ngFor="let method of paymentMethods" [value]="method">{{method}} {{method == \'GAS\' ? \'(NEO)\' : \'\'}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'logo-usd\' item-start></ion-icon>\n      <ion-label>Currency</ion-label>\n      <ion-select [(ngModel)]="profil.currency" (ngModelChange)="update()">\n        <ion-option *ngFor="let currency of currencies" [value]="currency">{{currency}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-toggle [(ngModel)]="profil.position" (ionChange)="showFiatEchange()"></ion-toggle>\n      <ion-label class="label"> Available for fiat echange </ion-label>\n      <ion-icon name=\'notifications\' item-start></ion-icon>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>Telegram username (optional)</ion-label>\n      <ion-input [(ngModel)]="profil.telegram" (ngModelChange)="update()"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-icon name=\'settings\' item-start></ion-icon>\n      <ion-label>Address (optional)</ion-label>\n      <ion-input [(ngModel)]="profil.address" (ngModelChange)="update()"></ion-input>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer *ngIf="!isNew">\n  <button ion-button full color="secondary" *ngIf="displayUpdate" (click)="updateData()">Update</button>\n</ion-footer>\n\n<ion-footer *ngIf="isNew">\n  <button ion-button full color="secondary" (click)="next()">Finish</button>\n</ion-footer>\n'/*ion-inline-end:"D:\ivpay2\src\pages\profile\profile-settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__app_global_setting__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
], ProfileSettingsPage);

//# sourceMappingURL=profile-settings.js.map

/***/ })

});
//# sourceMappingURL=22.js.map