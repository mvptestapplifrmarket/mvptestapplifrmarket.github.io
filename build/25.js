webpackJsonp([25],{

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryModule", function() { return InventoryModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inventory__ = __webpack_require__(865);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InventoryModule = (function () {
    function InventoryModule() {
    }
    return InventoryModule;
}());
InventoryModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__inventory__["a" /* InventoryPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__inventory__["a" /* InventoryPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__inventory__["a" /* InventoryPage */]
        ]
    })
], InventoryModule);

//# sourceMappingURL=inventory.module.js.map

/***/ }),

/***/ 865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InventoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InventoryPage = (function () {
    function InventoryPage(userService, firebase, navCtrl, articleService) {
        this.userService = userService;
        this.firebase = firebase;
        this.navCtrl = navCtrl;
        this.articleService = articleService;
        this.productScanned = this.articleService.getInventories();
    }
    InventoryPage.prototype.seeDetails = function (item, key, isInventory) {
        if (isInventory) {
            this.navCtrl.push('ArticlePage', { article: item, mine: true, isInventory: isInventory });
        }
        else {
            this.navCtrl.push('ArticlePage', { article: item, key: key, mine: true });
        }
    };
    return InventoryPage;
}());
InventoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-inventory',template:/*ion-inline-start:"D:\ivpay2\src\pages\inventory\inventory.html"*/'<ion-header >\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Inventory\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n    <ion-list>\n\n      <div *ngFor="let item of productScanned | async">\n\n        <ion-item (click)="seeDetails(item, item.ean, true)">\n\n          <ion-thumbnail item-start>\n\n            <img src="{{item.taked_picture}}">\n\n          </ion-thumbnail>\n\n          <h2>{{item.title}}</h2>\n\n          <p>{{item.price | currency}}</p>\n\n          <p>EAN {{item.ean}}</p>\n\n        </ion-item>\n\n      </div>\n\n    </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\inventory\inventory.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_2__providers_firebase_firebase__["a" /* FirebaseProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_article_service__["a" /* ArticleService */]])
], InventoryPage);

//# sourceMappingURL=inventory.js.map

/***/ })

});
//# sourceMappingURL=25.js.map