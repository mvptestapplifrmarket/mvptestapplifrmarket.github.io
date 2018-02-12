webpackJsonp([19],{

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalServiceActionModule", function() { return ModalServiceActionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_service_action__ = __webpack_require__(877);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalServiceActionModule = (function () {
    function ModalServiceActionModule() {
    }
    return ModalServiceActionModule;
}());
ModalServiceActionModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__modal_service_action__["a" /* ModalServiceAction */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal_service_action__["a" /* ModalServiceAction */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__modal_service_action__["a" /* ModalServiceAction */]
        ]
    })
], ModalServiceActionModule);

//# sourceMappingURL=modal-service-action.module.js.map

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalServiceAction; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wallet_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_transaction_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_cryptocompare_service__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_article_service__ = __webpack_require__(111);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ModalServiceAction = (function () {
    function ModalServiceAction(toastCtrl, alertCtrl, walletService, platform, params, viewCtrl, transactionService, articleService, navCtrl, userService, cryptocompareService) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.walletService = walletService;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.transactionService = transactionService;
        this.articleService = articleService;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.cryptocompareService = cryptocompareService;
        this.service = {};
        this.walletTo = {};
        this.hour = 1;
        this.nbHourDone = 1;
        this.alive = true;
        this.wallet = this.params.get('wallet');
        if (this.params.get('service')) {
            this.service = this.params.get('service');
        }
        else {
            this.serviceOrdered = this.params.get('serviceOrdered');
            this.articleService.getServiceFromId(this.serviceOrdered.serviceId)
                .takeWhile(function () { return _this.alive; })
                .subscribe(function (data) {
                _this.service = data;
            });
            if (this.serviceOrdered.nbEstimate) {
                this.nbHourDone = this.serviceOrdered.nbEstimate;
            }
            if (this.serviceOrdered.nbHourReal) {
                this.nbHourDone = this.serviceOrdered.nbHourReal;
            }
        }
        this.serviceId = this.params.get('id');
        this.wallet.trigram = this.params.get("trigram");
        this.cryptocompareService.getRateCrypto(this.wallet.trigram)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (data) {
            _this.rate = data[_this.userService._profil.currency];
            _this.currency = _this.userService._profil.currency;
        });
    }
    ModalServiceAction.prototype.dismiss = function (status) {
        this.alive = false;
        this.viewCtrl.dismiss(status);
    };
    ModalServiceAction.prototype.order = function () {
        if (this.service.isHourly && !this.hour) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error !',
                subTitle: 'Fill an estimated hour',
                buttons: ['Close']
            });
            alert_1.present();
            return false;
        }
        if (this.hour && this.hour <= 0) {
            var alert_2 = this.alertCtrl.create({
                title: 'Error !',
                subTitle: 'No valid estimated hour',
                buttons: ['Close']
            });
            alert_2.present();
            return false;
        }
        if (this.service.uid == this.userService._userFirebase.uid) {
            var alert_3 = this.alertCtrl.create({
                title: 'Error',
                subTitle: "You can't order your own service",
                buttons: ['Close']
            });
            alert_3.present();
            return;
        }
        this.articleService.saveServiceOrder(this.serviceId, this.service, this.comment, this.hour);
        this.dismiss("success");
        var toast = this.toastCtrl.create({
            message: 'Service ordered.\nContact the vendor.',
            duration: 5000,
            position: 'bottom'
        });
        toast.present(toast);
    };
    ModalServiceAction.prototype.pay = function () {
        var _this = this;
        if (this.service.uid == this.userService._userFirebase.uid) {
            var alert_4 = this.alertCtrl.create({
                title: 'Error',
                subTitle: "You can't pay your own service",
                buttons: ['Close']
            });
            alert_4.present();
            return;
        }
        var prompt = this.alertCtrl.create({
            title: 'Confirm transaction',
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
                        //TODO check content
                        _this.walletService.getWallets(_this.service.uid)
                            .takeWhile(function () { return _this.alive; })
                            .subscribe(function (content) {
                            for (var _i = 0, _a = Object.keys(content); _i < _a.length; _i++) {
                                var key = _a[_i];
                                _this.walletTo[key.toUpperCase()] = content[key];
                            }
                            _this.service.id = _this.serviceId;
                            _this.service.comment = _this.comment;
                            _this.service.hour = _this.hour;
                            _this.service.address = _this.address;
                            _this.transactionService.payService(_this.userService._profil.paymentMethod, _this.wallet, _this.walletTo[_this.userService._profil.paymentMethod].address, _this.service.price * _this.nbHourDone / _this.rate, data.password.trim(), "Pay service", _this.service, _this.serviceOrdered);
                            _this.dismiss("success");
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    return ModalServiceAction;
}());
ModalServiceAction = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-modal-action-service',template:/*ion-inline-start:"D:\ivpay2\src\pages\service\modalpopup\modal-service-action.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Confirm transaction\n    </ion-title>\n    <ion-buttons end (click)="dismiss()">\n      <button ion-button icon-only color="primary">\n        <span ion-text showWhen="ios"> Cancel </span>\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <h2>{{service.title}}</h2>\n  </ion-item>\n\n  <ion-row>\n    <ion-col>\n      <img [src]="service.taked_picture">\n    </ion-col>\n    <ion-col>\n      <h2></h2>\n      <h4 *ngIf="service.isHourly">{{service.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{service.price}} {{service.isHourly ? \' per hour\' : \'\'}}</h4>\n      <h2 *ngIf="service.isHourly">Total</h2>\n      <h3 *ngIf="service.isHourly && (service.price * hour) && !serviceOrdered">{{service.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{service.price * hour}}</h3>\n      <h3 *ngIf="service.isHourly && serviceOrdered && (service.price * serviceOrdered.nbHourReal)">{{service.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{service.price * serviceOrdered.nbHourReal}}</h3>\n      <h2 *ngIf="!service.isHourly">{{service.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}}{{service.price}}</h2>\n    </ion-col>\n  </ion-row>\n\n  <ion-item>\n    <strong>Price in {{userService._profil.paymentMethod}}</strong>\n    <p>{{service.price / rate}} {{userService._profil.paymentMethod}} </p>\n  </ion-item>\n\n  <ion-item *ngIf="!serviceOrdered">\n    <strong>Additional comment</strong>\n    <ion-textarea name="comment" placeholder="Addtional comment" [(ngModel)]="comment" autosize autofocus></ion-textarea>\n  </ion-item>\n\n  <ion-item *ngIf="!serviceOrdered && !service.isRemote">\n    <strong>Address</strong>\n    <ion-textarea name="address" placeholder="Address" [(ngModel)]="address" autosize></ion-textarea>\n  </ion-item>\n\n  <ion-item *ngIf="serviceOrdered">\n    <strong>Additional comment</strong>\n    <p>{{serviceOrdered.comment}}</p>\n  </ion-item>\n\n  <ion-item *ngIf="service.isHourly && !serviceOrdered">\n    <ion-label>Estimated hour</ion-label>\n    <ion-input type="number" [(ngModel)]="hour"></ion-input>\n  </ion-item>\n\n  <ion-item *ngIf="service.isHourly && serviceOrdered">\n    <ion-label>Number of hours done</ion-label>\n    <ion-input type="number" disabled="true" [(ngModel)]="serviceOrdered.nbHourReal"></ion-input>\n  </ion-item>\n\n\n</ion-content>\n\n<ion-footer>\n  <button *ngIf="serviceOrdered" ion-button full color="secondary" (click)="pay()">Pay</button>\n  <button *ngIf="!serviceOrdered" ion-button full color="secondary" (click)="order()">Order</button>\n</ion-footer>\n'/*ion-inline-end:"D:\ivpay2\src\pages\service\modalpopup\modal-service-action.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_wallet_service__["a" /* WalletService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_transaction_service__["a" /* TransactionService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_cryptocompare_service__["a" /* CryptocompareService */]])
], ModalServiceAction);

//# sourceMappingURL=modal-service-action.js.map

/***/ })

});
//# sourceMappingURL=19.js.map