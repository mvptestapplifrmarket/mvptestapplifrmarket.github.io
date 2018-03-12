webpackJsonp([10],{

/***/ 1676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletDetailPageModule", function() { return WalletDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet_detail__ = __webpack_require__(1743);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WalletDetailPageModule = (function () {
    function WalletDetailPageModule() {
    }
    return WalletDetailPageModule;
}());
WalletDetailPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__wallet_detail__["a" /* WalletDetailPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__wallet_detail__["a" /* WalletDetailPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__wallet_detail__["a" /* WalletDetailPage */]
        ]
    })
], WalletDetailPageModule);

//# sourceMappingURL=wallet-detail.module.js.map

/***/ }),

/***/ 1743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_transaction_service__ = __webpack_require__(684);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WalletDetailPage = (function () {
    function WalletDetailPage(navCtrl, navParams, transactionService) {
        this.navCtrl = navCtrl;
        this.transactionService = transactionService;
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.currencies = Object.keys;
        this.wallet = navParams.get('wallet');
        this.walletTransaction = this.transactionService.getWalletTransaction(this.wallet.trigram, this.wallet.address);
    }
    WalletDetailPage.prototype.ionViewDidLoad = function () {
    };
    return WalletDetailPage;
}());
WalletDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-wallet-detail',template:/*ion-inline-start:"D:\ivpay2\src\pages\wallet-detail\wallet-detail.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Wallet details\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item *ngFor="let transaction of walletTransaction | async">\n\n      <ion-thumbnail item-start>\n\n        <ion-icon name="{{transaction.spent ? \'md-arrow-round-up\' : \'md-arrow-round-down\'}}"></ion-icon>\n\n      </ion-thumbnail>\n\n      <h2>{{transaction.confirmed}}</h2>\n\n      <p>{{\'Transaction id \' + transaction.tx_hash}}</p>\n\n      <p>{{transaction.value * 0.00000001 + \' \' + wallet.trigram}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\wallet-detail\wallet-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_transaction_service__["a" /* TransactionService */]])
], WalletDetailPage);

//# sourceMappingURL=wallet-detail.js.map

/***/ })

});
//# sourceMappingURL=10.js.map