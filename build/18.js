webpackJsonp([18],{

/***/ 1663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServicePageModule", function() { return ServicePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service__ = __webpack_require__(1729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__ = __webpack_require__(687);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ServicePageModule = (function () {
    function ServicePageModule() {
    }
    return ServicePageModule;
}());
ServicePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__service__["a" /* ServicePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3_ionic2_rating__["a" /* Ionic2RatingModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__service__["a" /* ServicePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__service__["a" /* ServicePage */]
        ]
    })
], ServicePageModule);

//# sourceMappingURL=service.module.js.map

/***/ }),

/***/ 1729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_request_service__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_article_service__ = __webpack_require__(238);
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






var ServicePage = (function () {
    function ServicePage(params, navCtrl, requestService, modalCtrl, userService, alertCtrl, articleService, toastCtrl, iab) {
        this.params = params;
        this.navCtrl = navCtrl;
        this.requestService = requestService;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.alertCtrl = alertCtrl;
        this.articleService = articleService;
        this.toastCtrl = toastCtrl;
        this.iab = iab;
        this.alive = true;
        this.service = params.get('service');
        this.key = params.get('key');
        this.mine = params.get('mine');
        if (!this.mine) {
            this.mine = false;
        }
        if (params.get('serviceOrdered')) {
            this.serviceOrdered = params.get('serviceOrdered');
        }
        this.uid = this.userService._userFirebase.uid;
    }
    ServicePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userService.getProfil(this.service.uid).takeWhile(function () { return _this.alive; }).subscribe(function (p) {
            _this.profil = p;
            _this.profil['rate'] = 0;
        });
    };
    ServicePage.prototype.ionViewWillEnter = function () {
        this.alive = true;
    };
    ServicePage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    ServicePage.prototype.generatePayment = function () {
        var _this = this;
        //TODO choose crypto trigram
        var createdCode = this.requestService.generateRequest("pay-service", { id: this.key
        });
        var modal = this.modalCtrl.create('ModalServiceQrcode', {
            createdCode: createdCode
        });
        modal.onDidDismiss(function (data) {
            if (data == "success") {
                _this.navCtrl.pop();
            }
        });
        modal.present();
    };
    ServicePage.prototype.order = function () {
        var createdCode = this.requestService.generateRequest("order-service", { id: this.key
        });
        if (createdCode.indexOf('neoplace') >= 0) {
            this.requestService.processRequest(createdCode);
        }
    };
    ServicePage.prototype.pay = function () {
        var _this = this;
        this.articleService.getServiceOrderId(this.serviceOrdered.$key).takeWhile(function () { return _this.alive; }).subscribe(function (data) {
            if (data) {
                if (data.status != 'paid') {
                    var createdCode = _this.requestService.generateRequest("pay-service", { id: _this.key
                    });
                    if (createdCode.indexOf('neoplace') >= 0) {
                        _this.requestService.processRequest(createdCode);
                    }
                }
            }
        });
    };
    ServicePage.prototype.contact = function () {
        var _this = this;
        var uidArray = [this.userService._userFirebase.uid, this.service.uid];
        uidArray = uidArray.sort();
        this.userService.getProfil(this.service.uid).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
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
                                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.service.uid });
                            }
                        }
                    ]
                });
                confirm_1.present();
            }
            else {
                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.service.uid });
            }
        });
    };
    ServicePage.prototype.contactBuyer = function () {
        var _this = this;
        var uidArray = [this.serviceOrdered.buyeruid, this.serviceOrdered.saleruid];
        uidArray = uidArray.sort();
        this.userService.getProfil(this.serviceOrdered.buyeruid).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
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
                                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.serviceOrdered.buyeruid });
                            }
                        }
                    ]
                });
                confirm_2.present();
            }
            else {
                _this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: _this.serviceOrdered.buyeruid });
            }
        });
    };
    ServicePage.prototype.accept = function () {
        this.serviceOrdered.status = "accepted";
        //TODO inform the buyer new status
        this.articleService.updateServiceOrdered(this.key, this.serviceOrdered);
    };
    ServicePage.prototype.startService = function () {
        this.serviceOrdered.status = "started";
        //TODO inform the buyer new status
        this.articleService.updateServiceOrdered(this.key, this.serviceOrdered);
    };
    ServicePage.prototype.finishService = function () {
        //TODO inform the buyer new status
        //TODO add field to complete the nb hour real
        var _this = this;
        if (this.service.isHourly) {
            var prompt_1 = this.alertCtrl.create({
                title: 'Number of hours effectively done',
                subTitle: '',
                cssClass: 'promt-alert',
                inputs: [
                    {
                        name: 'hour',
                        placeholder: 'Nb hour done',
                        type: 'number'
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
                            if (!data.hour) {
                                var alert_1 = _this.alertCtrl.create({
                                    title: 'Error !',
                                    subTitle: 'Fill an estimated hour',
                                    buttons: ['Close']
                                });
                                alert_1.present();
                                return false;
                            }
                            if (data.hour && data.hour <= 0) {
                                var alert_2 = _this.alertCtrl.create({
                                    title: 'Error !',
                                    subTitle: 'No valid estimated hour',
                                    buttons: ['Close']
                                });
                                alert_2.present();
                                return false;
                            }
                            _this.serviceOrdered.status = "finished";
                            _this.serviceOrdered.nbHourReal = data.hour;
                            _this.articleService.updateServiceOrdered(_this.key, _this.serviceOrdered);
                        }
                    }
                ]
            });
            prompt_1.present();
        }
    };
    ServicePage.prototype.delete = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Delete',
            message: 'Are you sure to delete your article ?',
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
                        _this.articleService.deleteService(_this.key);
                        _this.toastCtrl.create({
                            message: 'Service deleted',
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
    ServicePage.prototype.soon = function () {
        this.toastCtrl.create({
            message: 'Coming soon',
            duration: 2000,
            position: 'bottom'
        }).present();
    };
    return ServicePage;
}());
ServicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-service',template:/*ion-inline-start:"D:\ivpay2\src\pages\service\service.html"*/'<ion-header >\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Service\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div id="profile-bg" [ngStyle]="{\'background-image\': \'url(\' + service.taked_picture +\')\'}"></div>\n\n\n\n  <div id="content">\n\n    <ion-list>\n\n      <ion-list-header>\n\n        GENERAL INFORMATION\n\n      </ion-list-header>\n\n      <ion-item-sliding>\n\n        <button ion-item *ngIf="profil">\n\n          <ion-avatar item-start *ngIf="profil.imageUrl">\n\n            <img [src]="profil.imageUrl" />\n\n          </ion-avatar>\n\n          <h3>{{profil.pseudo}}</h3>\n\n          <rating [(ngModel)]="profil.rate"\n\n                  readOnly="false" max="5" emptyStarIconName="star-outline"\n\n                  halfStarIconName="star-half"\n\n                  starIconName="star"\n\n                  nullable="false">\n\n          </rating>\n\n        </button>\n\n      </ion-item-sliding>\n\n\n\n      <ion-item>\n\n        <h3>{{service.title}}</h3>\n\n        <h4>{{service.brand}}</h4>\n\n        <h4>{{service.isRemote ? \'Remote service\' : \'Local service\'}}</h4>\n\n        <h3>{{service.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{service.price}}  {{service.isHourly ? \'/ hour\': \'\'}}</h3>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div text-center>\n\n      <button ion-button round outline icon-start text-center *ngIf="service.uid != uid" (click)="contact()">\n\n        Contact vendor\n\n      </button>\n\n      <button ion-button round icon-start text-center *ngIf="serviceOrdered && serviceOrdered.status == \'finished\' && serviceOrdered.buyeruid == uid" (click)="pay()">\n\n        Pay service\n\n      </button>\n\n      <button ion-button round icon-start text-center *ngIf="service.uid != uid && !serviceOrdered" (click)="order()">\n\n        Order service\n\n      </button>\n\n      <button ion-button round outline icon-start text-center *ngIf="serviceOrdered && service.uid == uid" (click)="contactBuyer()">\n\n        Contact requester\n\n      </button>\n\n      <button ion-button round icon-start text-center *ngIf="serviceOrdered && service.uid == uid && serviceOrdered.status == \'ordered\'" (click)="accept()">\n\n        Accept the service\n\n      </button>\n\n      <button ion-button round icon-start text-center *ngIf="serviceOrdered && service.uid == uid && serviceOrdered.status == \'accepted\'" (click)="startService()">\n\n        Start the service\n\n      </button>\n\n      <button ion-button round icon-start text-center *ngIf="serviceOrdered && service.uid == uid && serviceOrdered.status == \'started\'" (click)="finishService()">\n\n        Finish the service\n\n      </button>\n\n    </div>\n\n    <br>\n\n\n\n    <ion-list>\n\n      <ion-list-header>\n\n        Service Details\n\n      </ion-list-header>\n\n      <ion-item>\n\n        <ion-label>Type</ion-label>\n\n        <ion-input [disabled]="true" [(ngModel)]="service.type">{{service.type}}</ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label>Description</ion-label>\n\n        <ion-textarea name="description" [disabled]="true" placeholder="Description" [(ngModel)]="service.description" autosize></ion-textarea>\n\n      </ion-item>\n\n      <ion-item *ngIf="serviceOrdered">\n\n        <ion-label>Additional comment</ion-label>\n\n        <ion-textarea name="comment" [disabled]="true" placeholder="Comment" [(ngModel)]="serviceOrdered.comment" autosize></ion-textarea>\n\n      </ion-item>\n\n      <ion-item *ngIf="serviceOrdered && serviceOrdered.status">\n\n        <ion-label>Status</ion-label>\n\n        <ion-input name="status" [disabled]="true" placeholder="" [(ngModel)]="serviceOrdered.status"></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="serviceOrdered && !service.isHourly">\n\n        <ion-label>Estimated hour</ion-label>\n\n        <ion-input name="hour" [disabled]="true" placeholder="Estimated hour" [(ngModel)]="serviceOrdered.nbHourEstimate"></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="serviceOrdered && serviceOrdered.nbHourReal">\n\n        <ion-label>Number of hours done</ion-label>\n\n        <ion-input name="hourReal" [disabled]="true" placeholder="Number of hours done" [(ngModel)]="serviceOrdered.nbHourReal"></ion-input>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n    <ion-list *ngIf="service.uid == uid && !serviceOrdered">\n\n      <ion-item text-center>\n\n        <button ion-button round outline icon-start text-center (click)="generatePayment()">\n\n          Generate Payment\n\n        </button>\n\n      </ion-item>\n\n      <ion-item text-center>\n\n        <button ion-button round outline icon-start text-center (click)="soon()">\n\n          Update\n\n        </button>\n\n        <button ion-button round outline icon-start text-center (click)="delete()">\n\n          Delete\n\n        </button>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\service\service.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_request_service__["a" /* RequestService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], ServicePage);

//# sourceMappingURL=service.js.map

/***/ })

});
//# sourceMappingURL=18.js.map