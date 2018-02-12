webpackJsonp([12],{

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletDetailPageModule", function() { return WalletDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transaction__ = __webpack_require__(884);
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
            __WEBPACK_IMPORTED_MODULE_2__transaction__["a" /* TransactionPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__transaction__["a" /* TransactionPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__transaction__["a" /* TransactionPage */]
        ]
    })
], WalletDetailPageModule);

//# sourceMappingURL=transaction.module.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_transaction_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wallet_service__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransactionPage = (function () {
    function TransactionPage(navCtrl, transactionService, walletService) {
        this.navCtrl = navCtrl;
        this.transactionService = transactionService;
        this.walletService = walletService;
        this.wallets = [];
        this.transactions = [];
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.currencies = Object.keys;
        for (var _i = 0, _a = this.walletService.trigramAvailable; _i < _a.length; _i++) {
            var trigram = _a[_i];
            this.wallets.push(this.walletService.wallets[trigram.toLowerCase()]);
        }
        for (var _b = 0, _c = this.wallets; _b < _c.length; _b++) {
            var wallet = _c[_b];
            this.transactions.push(this.transactionService.getMyTransactions(wallet.address));
            this.transactions.push(this.transactionService.getOtherTransaction(wallet.address));
        }
    }
    TransactionPage.prototype.ionViewDidLoad = function () {
    };
    TransactionPage.prototype.isMineAddress = function (address) {
        for (var _i = 0, _a = this.wallets; _i < _a.length; _i++) {
            var wallet = _a[_i];
            if (wallet.address == address) {
                return true;
            }
        }
        return false;
    };
    return TransactionPage;
}());
TransactionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-transaction',template:/*ion-inline-start:"D:\ivpay2\src\pages\transaction\transaction.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Transactions\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list *ngFor="let walletTransactions of transactions" >\n\n    <ion-item *ngFor="let transaction of walletTransactions | async" >\n\n        <ion-thumbnail item-start>\n\n          <ion-icon name="{{isMineAddress(transaction.walletFrom) ? \'md-arrow-round-up\' : \'md-arrow-round-down\'}}"></ion-icon>\n\n        </ion-thumbnail>\n\n        <h2>{{transaction.date | date}}</h2>\n\n        <p>{{isMineAddress(transaction.walletFrom) ? \'Sent to \' + transaction.walletTo : \'Received from \' + transaction.walletFrom}}</p>\n\n        <p>{{transaction.amount + \' \' + transaction.cryptoTrigram}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\transaction\transaction.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_transaction_service__["a" /* TransactionService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_wallet_service__["a" /* WalletService */]])
], TransactionPage);

//# sourceMappingURL=transaction.js.map

/***/ })

});
//# sourceMappingURL=12.js.map