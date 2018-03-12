webpackJsonp([34],{

/***/ 1642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArticlePageModule", function() { return ArticlePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article__ = __webpack_require__(1707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(687);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ArticlePageModule = (function () {
    function ArticlePageModule() {
    }
    return ArticlePageModule;
}());
ArticlePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__article__["a" /* ArticlePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__article__["a" /* ArticlePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__article__["a" /* ArticlePage */]
        ]
    })
], ArticlePageModule);

//# sourceMappingURL=article.module.js.map

/***/ }),

/***/ 1707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_request_service__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_transaction_web3_service__ = __webpack_require__(392);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ArticlePage = (function () {
    function ArticlePage(params, navCtrl, loadingCtrl, requestService, modalCtrl, userService, alertCtrl, articleService, toastCtrl, iab, transactionWeb3Service) {
        this.params = params;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.requestService = requestService;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.articleService = articleService;
        this.toastCtrl = toastCtrl;
        this.iab = iab;
        this.transactionWeb3Service = transactionWeb3Service;
        this.alive = true;
        this.article = params.get('article');
        this.key = params.get('key');
        this.mine = params.get('mine');
        if (!this.mine) {
            this.mine = false;
        }
        this.isInventory = params.get('isInventory');
        this.uid = this.userService._userFirebase.uid;
    }
    ArticlePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userService.getProfil(this.article.uid).takeWhile(function () { return _this.alive; }).subscribe(function (p) {
            _this.profil = p;
            _this.profil['rate'] = 0;
        });
    };
    ArticlePage.prototype.ionViewWillEnter = function () {
        this.alive = true;
    };
    ArticlePage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    ArticlePage.prototype.generatePayment = function () {
        var _this = this;
        //TODO choose crypto trigram
        if (!this.isInventory) {
            var createdCode = this.requestService.generateRequest("pay-article", { id: this.key
            });
            var modal = this.modalCtrl.create('ModalArticleQrcode', {
                createdCode: createdCode
            });
            modal.onDidDismiss(function (data) {
                if (data == "success") {
                    _this.navCtrl.pop();
                }
            });
            modal.present();
        }
        else {
            var createdCode = this.requestService.generateRequest("pay-inventory", { uid: this.userService._userFirebase.uid, id: this.article.ean
            });
            var modal = this.modalCtrl.create('ModalArticleQrcode', {
                createdCode: createdCode
            });
            modal.onDidDismiss(function (data) {
                if (data == "success") {
                    _this.navCtrl.pop();
                }
            });
            modal.present();
        }
    };
    ArticlePage.prototype.buy = function () {
        var createdCode = this.requestService.generateRequest("pay-article", { id: this.key
        });
        if (createdCode.indexOf('neoplace') >= 0) {
            this.requestService.processRequest(createdCode);
        }
    };
    ArticlePage.prototype.contact = function () {
        var _this = this;
        var uidArray = [this.userService._userFirebase.uid, this.article.uid];
        uidArray = uidArray.sort();
        this.userService.getProfil(this.article.uid).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
            if (profil.telegram) {
                var confirm_1 = _this.alertCtrl.create({
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
                                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.article.uid });
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
            else {
                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.article.uid });
            }
        });
    };
    ArticlePage.prototype.contactBuyer = function () {
        var _this = this;
        var uidArray = [this.article.buyeruid, this.article.uid];
        uidArray = uidArray.sort();
        this.userService.getProfil(this.article.buyeruid).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
            _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.article.uid });
        });
        this.userService.getProfil(this.article.buyeruid).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
            if (profil.telegram) {
                var confirm_2 = _this.alertCtrl.create({
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
                                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.article.buyeruid });
                            }
                        }
                    ]
                });
                confirm_2.present();
            }
            else {
                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.article.buyeruid });
            }
        });
    };
    ArticlePage.prototype.confirmReception = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Are you sure to confirm reception ? \n Funds will be unlocked',
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
                        var loading = _this.loadingCtrl.create({
                            content: 'Please wait while unlocking funds'
                        });
                        loading.present();
                        _this.transactionWeb3Service.unlockFunds(_this.key).subscribe(function (value) {
                            loading.dismissAll();
                            _this.article.validate = 'true';
                            _this.articleService.updateArticle(_this.key, _this.article);
                            var toast = _this.toastCtrl.create({
                                message: 'Item receipt saved in Smart contract.\nFunds have been sent to seller\nTx: ' + value.tx,
                                duration: 4000,
                                position: 'bottom'
                            });
                            toast.present(toast);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ArticlePage.prototype.delete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete',
            message: 'Are you sure to delete your item ?',
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
                        if (!_this.isInventory) {
                            _this.articleService.deleteArticle(_this.key);
                        }
                        else {
                            _this.articleService.deleteInventory(_this.key);
                        }
                        _this.toastCtrl.create({
                            message: 'Item deleted',
                            duration: 2000,
                            position: 'bottom'
                        }).present();
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    };
    ArticlePage.prototype.soon = function () {
        this.toastCtrl.create({
            message: 'Coming soon',
            duration: 2000,
            position: 'bottom'
        }).present();
    };
    return ArticlePage;
}());
ArticlePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-article',template:/*ion-inline-start:"D:\ivpay2\src\pages\article\article.html"*/'<ion-header >\n\n  <ion-navbar color="primary" no-border-bottom>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Item\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <div id="profile-bg" [ngStyle]="{\'background-image\': \'url(\' + article.taked_picture +\')\'}"></div>\n\n  <div id="content">\n    <ion-list>\n      <ion-item-sliding>\n        <button ion-item *ngIf="profil">\n          <ion-avatar item-start *ngIf="profil.imageUrl">\n            <img [src]="profil.imageUrl" />\n          </ion-avatar>\n          <h3>{{profil.pseudo}}</h3>\n          <rating [(ngModel)]="profil.rate"\n                  readOnly="false" max="5" emptyStarIconName="star-outline"\n                  halfStarIconName="star-half"\n                  starIconName="star"\n                  nullable="false">\n          </rating>\n        </button>\n      </ion-item-sliding>\n\n      <ion-item>\n        <h3>{{article.title}}</h3>\n        <h4>{{article.brand}} - {{article.condition}}</h4>\n        <h3>{{article.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{article.price}}</h3>\n      </ion-item>\n\n      <ion-item style="color:green" *ngIf="article.buyeruid == uid && article.validate == \'true\'">\n        <ion-avatar item-start>\n          <ion-icon name="open"></ion-icon>\n        </ion-avatar>\n        <h3>Item reception confirmed</h3>\n        <h3>Funds have been sent to seller</h3>\n      </ion-item>\n\n      <ion-item style="color:red" *ngIf="article.buyeruid == uid && article.validate != \'true\'">\n        <ion-avatar item-start>\n          <ion-icon name="lock"></ion-icon>\n        </ion-avatar>\n        <h3>Funds locked in smart contract</h3>\n        <h3>Confirm reception to unlock funds</h3>\n      </ion-item>\n\n      <ion-item style="color:red" *ngIf="article.uid == uid && article.status == \'sold\' && article.validate != \'true\'">\n        <ion-avatar item-start>\n          <ion-icon name="lock"></ion-icon>\n        </ion-avatar>\n        <h3>Funds locked in smart contract</h3>\n        <h3>Send item to buyer to unlock funds</h3>\n      </ion-item>\n    </ion-list>\n\n    <div text-center>\n      <button ion-button round icon-start text-center *ngIf="article.buyeruid == uid && article.validate != \'true\'" (click)="confirmReception()">\n        Confirm item reception\n      </button>\n      <button ion-button round outline icon-start text-center *ngIf="article.uid != uid" (click)="contact()">\n        Contact vendor\n      </button>\n      <button ion-button round outline icon-start text-center *ngIf="article.status != \'published\' && article.uid == uid" (click)="contactBuyer()">\n        Contact buyer\n      </button>\n      <button ion-button round icon-start text-center *ngIf="article.uid != uid && article.status == \'published\'" (click)="buy()">\n        Buy\n      </button>\n    </div>\n    <br>\n\n    <ion-list>\n      <ion-list-header>\n        Item Details\n      </ion-list-header>\n      <ion-item>\n        <ion-label>Type</ion-label>\n        <ion-input [disabled]="true" [(ngModel)]="article.type">{{article.type}}</ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Description</ion-label>\n        <ion-textarea name="description" [disabled]="true" placeholder="Description" [(ngModel)]="article.description" autosize></ion-textarea>\n      </ion-item>\n      <ion-item *ngIf="article.address">\n        <ion-label>Delivery address</ion-label>\n        <ion-textarea name="address" [disabled]="true" placeholder="Address" [(ngModel)]="article.address" autosize></ion-textarea>\n      </ion-item>\n      <ion-item *ngIf="article.ean">\n        <ion-label>EAN</ion-label>\n        <ion-input [disabled]="true" [(ngModel)]="article.ean"></ion-input>\n      </ion-item>\n    </ion-list>\n    <ion-list *ngIf="(article.uid == uid && article.status == \'published\') || isInventory">\n      <ion-item text-center>\n        <button ion-button round outline icon-start text-center large (click)="generatePayment()">\n          Generate Payment\n        </button>\n      </ion-item>\n      <ion-item text-center="">\n        <button ion-button round outline icon-start text-center large (click)="soon()">\n          Update\n        </button>\n        <button ion-button round outline icon-start text-center large (click)="delete()">\n          Delete\n        </button>\n      </ion-item>\n    </ion-list>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"D:\ivpay2\src\pages\article\article.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_request_service__["a" /* RequestService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_6__providers_transaction_web3_service__["a" /* TransactionWeb3Service */]])
], ArticlePage);

//# sourceMappingURL=article.js.map

/***/ })

});
//# sourceMappingURL=34.js.map