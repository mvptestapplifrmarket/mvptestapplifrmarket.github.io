webpackJsonp([20],{

/***/ 1661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyStorePageModule", function() { return MyStorePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mysales__ = __webpack_require__(1727);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MyStorePageModule = (function () {
    function MyStorePageModule() {
    }
    return MyStorePageModule;
}());
MyStorePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__mysales__["a" /* MySalesPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mysales__["a" /* MySalesPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__mysales__["a" /* MySalesPage */]
        ]
    })
], MyStorePageModule);

//# sourceMappingURL=mysales.module.js.map

/***/ }),

/***/ 1727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySalesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MySalesPage = (function () {
    function MySalesPage(userService, firebase, navCtrl, articleService) {
        this.userService = userService;
        this.firebase = firebase;
        this.navCtrl = navCtrl;
        this.articleService = articleService;
        this.type = "items";
        this.services = [];
        this.alive = true;
        this.productSold = this.articleService.getMyArticles(this.userService._userFirebase.uid);
    }
    MySalesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.articleService.getMyServiceSold(this.userService._userFirebase.uid)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (services) {
            services.forEach(function (service) {
                console.log(service);
                _this.articleService.getServiceFromId(service.serviceId).subscribe(function (data) {
                    if (data) {
                        service.service = data;
                        _this.services.push(service);
                    }
                });
            });
        });
    };
    MySalesPage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    MySalesPage.prototype.seeDetails = function (item, key, isInventory) {
        if (isInventory) {
            this.navCtrl.push('ArticlePage', { article: item, mine: true, isInventory: isInventory });
        }
        else {
            this.navCtrl.push('ArticlePage', { article: item, key: key, mine: true });
        }
    };
    MySalesPage.prototype.seeDetailsService = function (item) {
        this.navCtrl.push('ServicePage', { service: item.service, key: item.id ? item.id : item.$key, serviceOrdered: item });
    };
    return MySalesPage;
}());
MySalesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mysales',template:/*ion-inline-start:"D:\ivpay2\src\pages\sales\mysales.html"*/'<ion-header >\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      NeoPlace\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar no-border-top>\n\n    <ion-segment [(ngModel)]="type">\n\n      <ion-segment-button value="items">\n\n        Items\n\n      </ion-segment-button>\n\n      <ion-segment-button value="service">\n\n        Services\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div [ngSwitch]="type">\n\n    <ion-list *ngSwitchCase="\'items\'">\n\n      <div *ngFor="let item of productSold | async">\n\n        <ion-item (click)="seeDetails(item, item.$key)" *ngIf="item.status == \'sold\'">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.taked_picture}}">\n\n          </ion-thumbnail>\n\n          <h2>{{item.title}}</h2>\n\n          <p>{{item.price | currency}}</p>\n\n          <ion-avatar item-end *ngIf="item.validate != \'true\'">\n\n            <ion-icon style="color:red" name="lock"></ion-icon>\n\n          </ion-avatar>\n\n          <ion-avatar item-end *ngIf="item.validate == \'true\'">\n\n            <ion-icon style="color:green" name="ios-checkbox-outline"></ion-icon>\n\n          </ion-avatar>\n\n        </ion-item>\n\n      </div>\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'service\'">\n\n      <div *ngFor="let item of services">\n\n        <ion-item (click)="seeDetailsService(item)">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.service.taked_picture}}">\n\n          </ion-thumbnail>\n\n          <h2>{{item.service.title}}</h2>\n\n          <p>{{item.service.price | currency}}</p>\n\n          <ion-avatar item-end *ngIf="item.status != \'paid\'">\n\n            <ion-icon style="color:red" name="lock"></ion-icon>\n\n          </ion-avatar>\n\n          <ion-avatar item-end *ngIf="item.status == \'paid\'">\n\n            <ion-icon style="color:green" name="ios-checkbox-outline"></ion-icon>\n\n          </ion-avatar>\n\n        </ion-item>\n\n      </div>\n\n\n\n    </ion-list>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\sales\mysales.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__["a" /* FirebaseProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_article_service__["a" /* ArticleService */]])
], MySalesPage);

//# sourceMappingURL=mysales.js.map

/***/ })

});
//# sourceMappingURL=20.js.map