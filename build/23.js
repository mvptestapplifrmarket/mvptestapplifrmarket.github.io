webpackJsonp([23],{

/***/ 1656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyStorePageModule", function() { return MyStorePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mystore__ = __webpack_require__(1722);
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
            __WEBPACK_IMPORTED_MODULE_2__mystore__["a" /* MyStorePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__mystore__["a" /* MyStorePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__mystore__["a" /* MyStorePage */]
        ]
    })
], MyStorePageModule);

//# sourceMappingURL=mystore.module.js.map

/***/ }),

/***/ 1722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyStorePage; });
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





var MyStorePage = (function () {
    function MyStorePage(userService, firebase, navCtrl, articleService) {
        this.userService = userService;
        this.firebase = firebase;
        this.navCtrl = navCtrl;
        this.articleService = articleService;
        this.type = "published";
        this.alive = true;
        this.product = this.articleService.getMyArticles(this.userService._userFirebase.uid);
        this.productSold = this.articleService.getMyArticles(this.userService._userFirebase.uid);
        this.services = this.articleService.getMyServices(this.userService._userFirebase.uid);
    }
    MyStorePage.prototype.ionViewDidLoad = function () {
    };
    MyStorePage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    MyStorePage.prototype.seeDetails = function (item, key, isInventory) {
        if (isInventory) {
            this.navCtrl.push('ArticlePage', { article: item, mine: true, isInventory: isInventory });
        }
        else {
            this.navCtrl.push('ArticlePage', { article: item, key: key, mine: true });
        }
    };
    MyStorePage.prototype.seeDetailsService = function (item) {
        this.navCtrl.push('ServicePage', { service: item, mine: true, key: item.$key });
    };
    return MyStorePage;
}());
MyStorePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mystore',template:/*ion-inline-start:"D:\ivpay2\src\pages\mystore\mystore.html"*/'<ion-header >\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      NeoPlace\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar no-border-top>\n\n    <ion-segment [(ngModel)]="type">\n\n      <ion-segment-button value="published">\n\n        Published\n\n      </ion-segment-button>\n\n      <ion-segment-button value="sold">\n\n        Sold\n\n      </ion-segment-button>\n\n      <ion-segment-button value="service">\n\n        Service\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div [ngSwitch]="type">\n\n    <ion-list *ngSwitchCase="\'published\'">\n\n      <div *ngFor="let item of productSold | async">\n\n        <ion-item (click)="seeDetails(item, item.$key)" *ngIf="item.status == \'published\'">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.taked_picture}}">\n\n          </ion-thumbnail>\n\n          <h2>{{item.title}}</h2>\n\n          <p>{{item.price | currency}}</p>\n\n        </ion-item>\n\n      </div>\n\n\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'sold\'">\n\n      <div *ngFor="let item of product | async">\n\n        <ion-item (click)="seeDetails(item, item.$key)" *ngIf="item.status == \'sold\'">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.taked_picture}}">\n\n          </ion-thumbnail>\n\n          <h2>{{item.title}}</h2>\n\n          <p>{{item.price | currency}}</p>\n\n          <ion-avatar item-end *ngIf="item.validate != \'true\'">\n\n            <ion-icon style="color:red" name="lock"></ion-icon>\n\n          </ion-avatar>\n\n          <ion-avatar item-end *ngIf="item.validate == \'true\'">\n\n            <ion-icon style="color:green" name="ios-checkbox-outline"></ion-icon>\n\n          </ion-avatar>\n\n        </ion-item>\n\n      </div>\n\n\n\n    </ion-list>\n\n\n\n    <ion-list *ngSwitchCase="\'service\'">\n\n      <div *ngFor="let item of services | async">\n\n        <ion-item (click)="seeDetailsService(item)">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.taked_picture}}">\n\n          </ion-thumbnail>\n\n          <h2>{{item.title}}</h2>\n\n          <p>{{item.price | currency}}</p>\n\n        </ion-item>\n\n      </div>\n\n\n\n    </ion-list>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\mystore\mystore.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__["a" /* FirebaseProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_article_service__["a" /* ArticleService */]])
], MyStorePage);

//# sourceMappingURL=mystore.js.map

/***/ })

});
//# sourceMappingURL=23.js.map