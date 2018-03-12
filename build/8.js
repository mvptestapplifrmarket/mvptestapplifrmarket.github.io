webpackJsonp([8],{

/***/ 1675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalWalletActionModule", function() { return ModalWalletActionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_wallet_action__ = __webpack_require__(1741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_truncate_pipe__ = __webpack_require__(1742);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ModalWalletActionModule = (function () {
    function ModalWalletActionModule() {
    }
    return ModalWalletActionModule;
}());
ModalWalletActionModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__modal_wallet_action__["a" /* ModalWalletAction */],
            __WEBPACK_IMPORTED_MODULE_3__pipes_truncate_pipe__["a" /* TruncatePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal_wallet_action__["a" /* ModalWalletAction */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__modal_wallet_action__["a" /* ModalWalletAction */],
            __WEBPACK_IMPORTED_MODULE_3__pipes_truncate_pipe__["a" /* TruncatePipe */]
        ]
    })
], ModalWalletActionModule);

//# sourceMappingURL=modal-wallet-action.module.js.map

/***/ }),

/***/ 1741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalWalletAction; });
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



var ModalWalletAction = (function () {
    function ModalWalletAction(alertCtrl, platform, params, viewCtrl, transaction) {
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.transaction = transaction;
        this.wallet = this.params.get('wallet');
        this.address = this.params.get('address');
        this.amount = this.params.get('amount');
        this.fiat = this.params.get('fiat');
        this.amountFiat = this.params.get('amountFiat');
        this.currency = this.params.get('currency');
    }
    ModalWalletAction.prototype.dismiss = function (status) {
        this.viewCtrl.dismiss(status);
    };
    ModalWalletAction.prototype.validate = function () {
        var _this = this;
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
                        if (!_this.fiat) {
                            _this.transaction.send(_this.wallet.trigram, _this.wallet, _this.address, _this.amount, data.password.trim(), "Send");
                        }
                        else {
                            _this.transaction.getFiat(_this.wallet.trigram, _this.wallet, _this.address, _this.amount, data.password.trim(), _this.amountFiat + ' ' + _this.currency, _this.currency);
                        }
                        _this.dismiss("success");
                    }
                }
            ]
        });
        prompt.present();
    };
    return ModalWalletAction;
}());
ModalWalletAction = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-modal-action-wallet',template:/*ion-inline-start:"D:\ivpay2\src\pages\wallet-action\modalpopup\modal-wallet-action.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Confirm transaction\n    </ion-title>\n    <ion-buttons end (click)="dismiss()">\n      <button ion-button icon-only color="primary">\n        <span ion-text showWhen="ios"> Cancel </span>\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <h2>{{wallet.name}}</h2>\n    </ion-item>\n\n    <ion-item>\n      <span *ngIf="!fiat">Send</span>\n      <span *ngIf="fiat">You will send </span>\n      <ion-note item-end>\n        {{amount + \' \' + wallet.trigram}}\n      </ion-note>\n    </ion-item>\n\n    <ion-item *ngIf="fiat">\n      <span>To get</span>\n      <ion-note item-end>\n        {{amountFiat + \' \' + currency}}\n      </ion-note>\n    </ion-item>\n\n    <ion-item>\n      From\n      <ion-note item-end>\n        {{wallet.address | limitTo: 5}}\n      </ion-note>\n    </ion-item>\n    <ion-item>\n      To\n      <ion-note item-end>\n        {{address | limitTo: 5}}\n      </ion-note>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <button ion-button full color="secondary" (click)="validate()">Validate</button>\n</ion-footer>\n'/*ion-inline-end:"D:\ivpay2\src\pages\wallet-action\modalpopup\modal-wallet-action.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_transaction_service__["a" /* TransactionService */]])
], ModalWalletAction);

//# sourceMappingURL=modal-wallet-action.js.map

/***/ }),

/***/ 1742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TruncatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TruncatePipe = (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, args) {
        // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
        // let trail = args.length > 1 ? args[1] : '...';
        var limit = args ? parseInt(args, 10) : 10;
        var trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    return TruncatePipe;
}());
TruncatePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'limitTo'
    })
], TruncatePipe);

//# sourceMappingURL=truncate.pipe.js.map

/***/ })

});
//# sourceMappingURL=8.js.map