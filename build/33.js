webpackJsonp([33],{

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalArticleActionModule", function() { return ModalArticleActionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_article_action__ = __webpack_require__(855);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalArticleActionModule = (function () {
    function ModalArticleActionModule() {
    }
    return ModalArticleActionModule;
}());
ModalArticleActionModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__modal_article_action__["a" /* ModalArticleAction */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal_article_action__["a" /* ModalArticleAction */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__modal_article_action__["a" /* ModalArticleAction */]
        ]
    })
], ModalArticleActionModule);

//# sourceMappingURL=modal-article-action.module.js.map

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalArticleAction; });
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







var ModalArticleAction = (function () {
    function ModalArticleAction(alertCtrl, walletService, platform, params, viewCtrl, transactionService, navCtrl, userService, cryptocompareService, articleService) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.walletService = walletService;
        this.platform = platform;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.transactionService = transactionService;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.cryptocompareService = cryptocompareService;
        this.articleService = articleService;
        this.article = {};
        this.walletTo = {};
        this.alive = true;
        this.wallet = this.params.get('wallet');
        this.article = this.params.get('article');
        this.articleId = this.params.get('id');
        this.isInventory = params.get('isInventory');
        this.wallet.trigram = this.params.get("trigram");
        this.cryptocompareService.getRateCrypto(this.wallet.trigram)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (data) {
            _this.rate = data[_this.userService._profil.currency];
            _this.currency = _this.userService._profil.currency;
        });
    }
    ModalArticleAction.prototype.dismiss = function (status) {
        this.alive = false;
        this.viewCtrl.dismiss(status);
    };
    ModalArticleAction.prototype.validate = function () {
        var _this = this;
        if (this.article.uid == this.userService._userFirebase.uid) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error',
                subTitle: "You can't buy the article yourself",
                buttons: ['Close']
            });
            alert_1.present();
            return;
        }
        var isPass = false;
        this.articleService.getArticleFromId(this.articleId).takeWhile(function () { return _this.alive; }).subscribe(function (data) {
            if (!isPass) {
                if (data.status == 'published') {
                    var prompt_1 = _this.alertCtrl.create({
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
                                    _this.walletService.getWallets(_this.article.uid).takeWhile(function () { return _this.alive; }).subscribe(function (content) {
                                        for (var _i = 0, _a = Object.keys(content); _i < _a.length; _i++) {
                                            var key = _a[_i];
                                            _this.walletTo[key.toUpperCase()] = content[key];
                                        }
                                        if (!_this.isInventory) {
                                            _this.transactionService.payArticle(_this.userService._profil.paymentMethod, _this.wallet, _this.walletTo[_this.userService._profil.paymentMethod].address, _this.article.price / _this.rate, data.password.trim(), "Pay article", _this.article, _this.articleId);
                                        }
                                        else {
                                            _this.transactionService.payInventory(_this.userService._profil.paymentMethod, _this.wallet, _this.walletTo[_this.userService._profil.paymentMethod].address, _this.article.price / _this.rate, data.password.trim(), "Pay inventory", _this.article);
                                        }
                                        _this.dismiss("success");
                                    });
                                }
                            }
                        ]
                    });
                    prompt_1.present();
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'Error article already bought',
                        buttons: ['Close']
                    });
                    alert_2.present();
                }
                isPass = true;
            }
        });
    };
    return ModalArticleAction;
}());
ModalArticleAction = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-modal-action-article',template:/*ion-inline-start:"D:\ivpay2\src\pages\article\modalpopup\modal-article-action.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Confirm transaction\n    </ion-title>\n    <ion-buttons end (click)="dismiss()">\n      <button ion-button icon-only color="primary">\n        <span ion-text showWhen="ios"> Cancel </span>\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <h2>{{article.title}}</h2>\n  </ion-item>\n\n  <ion-row>\n    <ion-col>\n      <img [src]="article.taked_picture">\n    </ion-col>\n    <ion-col>\n      <h2>{{article.currency}}</h2>\n      <h2>{{article.price}}</h2>\n    </ion-col>\n  </ion-row>\n\n  <ion-card-content>\n    <strong>Price in {{userService._profil.paymentMethod}}</strong>\n    <p>{{article.price / rate}} {{userService._profil.paymentMethod}} </p>\n  </ion-card-content>\n\n  <ion-card-content>\n    <strong>Type</strong>\n    <p>{{article.type}}</p>\n  </ion-card-content>\n\n  <ion-card-content>\n    <strong>Description</strong>\n    <p>{{article.description}}</p>\n  </ion-card-content>\n\n  <ion-card-content *ngIf="article.ean">\n    <strong>EAN</strong>\n    <p>{{article.ean}}</p>\n  </ion-card-content>\n\n</ion-content>\n\n<ion-footer>\n  <button ion-button full color="secondary" (click)="validate()">Pay</button>\n</ion-footer>\n'/*ion-inline-end:"D:\ivpay2\src\pages\article\modalpopup\modal-article-action.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_wallet_service__["a" /* WalletService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_transaction_service__["a" /* TransactionService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_cryptocompare_service__["a" /* CryptocompareService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_article_service__["a" /* ArticleService */]])
], ModalArticleAction);

//# sourceMappingURL=modal-article-action.js.map

/***/ })

});
//# sourceMappingURL=33.js.map