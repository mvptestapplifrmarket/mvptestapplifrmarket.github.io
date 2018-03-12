webpackJsonp([24],{

/***/ 1654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginListPageModule", function() { return LoginListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ivpay__ = __webpack_require__(1719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(688);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginListPageModule = (function () {
    function LoginListPageModule() {
    }
    return LoginListPageModule;
}());
LoginListPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__ivpay__["a" /* IvpayPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__ivpay__["a" /* IvpayPage */]),
            __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyBWc6kOtjHwnrL3bTJWG5YklwyB8SxFm8A'
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__ivpay__["a" /* IvpayPage */]
        ]
    })
], LoginListPageModule);

//# sourceMappingURL=ivpay.module.js.map

/***/ }),

/***/ 1719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IvpayPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wallet_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(686);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IvpayPage = (function () {
    function IvpayPage(navCtrl, alertCtrl, walletService, userService, geolocation, platform, loadingCtrl, iab) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.walletService = walletService;
        this.userService = userService;
        this.geolocation = geolocation;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.iab = iab;
        this.markers = [];
        this.alive = true;
        this.pages1 = [
            { icon: 'qr-scanner', title: 'Scan', page: 'ScanPage', active: true, },
            { icon: 'barcode', title: 'Pay', page: 'PayPage', active: false, },
            { icon: 'log-in', title: 'Request', page: 'RequestPage', active: false, },
            { icon: 'repeat', title: 'Transfer', page: 'TransferPage', active: false, }
        ];
        this.pages2 = [
            { icon: 'qr-scanner', title: 'Scan', page: 'ScanPage', active: true, },
            { icon: 'barcode', title: 'Pay', page: 'PayPage', active: false, },
            { icon: 'log-in', title: 'Request', page: 'RequestPage', active: false, },
            { icon: 'repeat', title: 'Transfer', page: 'TransferPage', active: false, },
            { icon: 'logo-usd', title: 'Fiat/Crypto exchange', page: 'FiatPage', active: false, },
            { icon: 'card', title: 'Wallet', page: 'WalletPage', active: false, }
        ];
        this.pages3 = [
            { icon: 'md-analytics', title: 'Crypto Trend', page: 'ScanPage', active: true, },
            { icon: 'time', title: 'History', page: 'PayPage', active: false, }
        ];
    }
    IvpayPage.prototype.ionViewDidLoad = function () {
        this.zoom = 3;
        // initial center position for the map
        this.lat = 0;
        this.lng = 0;
        this.loadMap();
        this.loadFiatPosition();
    };
    IvpayPage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    IvpayPage.prototype.showList = function (pages) {
        var _this = this;
        if (pages.page == 'PayPage' || pages.page === 'RequestPage') {
            var alert_1 = this.alertCtrl.create({
                cssClass: 'radio-alert'
            });
            alert_1.setTitle('Choose your wallet');
            for (var _i = 0, _a = this.walletService.trigramAvailable; _i < _a.length; _i++) {
                var trigram = _a[_i];
                alert_1.addInput({
                    type: 'radio',
                    label: trigram.toUpperCase(),
                    value: trigram.toLowerCase(),
                    checked: trigram.toLowerCase() == 'eth' ? true : false
                });
            }
            alert_1.addButton({
                text: 'Ok',
                handler: function (data) {
                    _this.navCtrl.push(pages.page, { trigram: data });
                }
            });
            alert_1.present();
        }
        else if (pages.page === 'FiatPage') {
            var alert_2 = this.alertCtrl.create({
                cssClass: 'radio-alert'
            });
            alert_2.setTitle('Fiat exchange');
            alert_2.addInput({
                type: 'radio',
                label: 'Get ' + this.userService._profil.currency + ' with ' + this.userService._profil.paymentMethod,
                value: 'fiat',
                checked: true
            });
            alert_2.addInput({
                type: 'radio',
                label: 'Get ' + this.userService._profil.paymentMethod + ' with ' + this.userService._profil.currency,
                value: 'crypto',
                checked: false
            });
            alert_2.addButton({
                text: 'Ok',
                handler: function (data) {
                    if (data == 'crypto') {
                        _this.navCtrl.push(pages.page, { trigram: _this.userService._profil.paymentMethod.toLowerCase(), request: true });
                    }
                    else {
                        _this.navCtrl.push(pages.page, { trigram: _this.userService._profil.paymentMethod.toLowerCase() });
                    }
                }
            });
            alert_2.present();
        }
        else {
            this.navCtrl.push(pages.page);
        }
    };
    IvpayPage.prototype.loadMap = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: 'Please wait...', duration: 5000 });
        loader.present();
        this.geolocation.getCurrentPosition()
            .then(function (position) {
            loader.dismiss().catch();
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
            _this.zoom = 8;
            _this.markers.push({
                lat: _this.lat,
                lng: _this.lng,
                draggable: false,
                visible: true,
                markerClickable: false,
                iconUrl: "assets/img/position.png"
            });
        }).catch(function (error) {
            loader.dismiss().catch();
            _this.lat = 0;
            _this.lng = 0;
            _this.zoom = 3;
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Error while getting your position, try again',
                buttons: ['Close']
            });
            alert.present();
        });
    };
    IvpayPage.prototype.loadFiatPosition = function () {
        var _this = this;
        this.userService.getPositions().takeWhile(function () { return _this.alive; }).subscribe(function (positions) {
            positions.forEach(function (position) {
                _this.userService.getProfil(position.$key).subscribe(function (profil) {
                    _this.addPositionFiat(position.lat, position.lng, profil, position.$key);
                });
            });
        });
    };
    IvpayPage.prototype.addPositionFiat = function (lat, lng, profil, uid) {
        this.markers.push({
            lat: lat,
            lng: lng,
            draggable: false,
            position: { profil: profil, uid: uid }
        });
    };
    IvpayPage.prototype.contact = function (profil, uid) {
        var _this = this;
        var uidArray = [this.userService._userFirebase.uid, uid];
        uidArray = uidArray.sort();
        if (profil.telegram) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Contact',
                message: 'Chat with Telegram or NeoPlace chat ?',
                cssClass: 'confirm-alert',
                buttons: [
                    {
                        text: 'Telegram',
                        handler: function () {
                            var browser = _this.iab.create('https://t.me/' + profil.telegram, '_system');
                        }
                    },
                    {
                        text: 'NeoPlace chat',
                        handler: function () {
                            _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: uid });
                        }
                    }
                ]
            });
            confirm_1.present();
        }
        else {
            this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: uid });
        }
    };
    return IvpayPage;
}());
IvpayPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ivpay',template:/*ion-inline-start:"D:\ivpay2\src\pages\ivpay\ivpay.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title> NeoPlace </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <agm-map [latitude]="lat"\n\n           [longitude]="lng"\n\n           [zoom]="zoom">\n\n    <agm-marker *ngFor="let m of markers; let i = index"\n\n                [latitude]="m.lat"\n\n                [longitude]="m.lng"\n\n                [label]="m.label"\n\n                [iconUrl]="m.iconUrl"\n\n                [markerDraggable]="m.draggable">\n\n      <agm-info-window>\n\n        <div class="pin" style="width:175px" *ngIf="m.position">\n\n          <!--<ion-avatar item-left>-->\n\n            <!--<img src="{{m.position.profil.imageUrl}}">-->\n\n          <!--</ion-avatar>-->\n\n          <h5>{{m.position.profil.pseudo}}</h5>\n\n          <div class="post-description">\n\n            Available for fiat exchange with <strong>{{m.position.profil.paymentMethod}}</strong>\n\n            <br>\n\n            <a (click)="contact(m.position.profil, m.position.uid)">Contact</a>\n\n          </div>\n\n        </div>\n\n      </agm-info-window>\n\n    </agm-marker>\n\n\n\n  </agm-map>\n\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col *ngFor="let item of pages2; let i = index" col-4 col-sm-4 col-md-6 col-lg-4 col-xl-2 text-center>\n\n        <button (click)="showList(item)" *ngIf="i < 6" style="font-size: 14px;">\n\n          <ion-icon color="primary" name="{{ item.icon }}"></ion-icon> <br> {{ item.title }}\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\ivpay\ivpay.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_wallet_service__["a" /* WalletService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], IvpayPage);

//# sourceMappingURL=ivpay.js.map

/***/ })

});
//# sourceMappingURL=24.js.map