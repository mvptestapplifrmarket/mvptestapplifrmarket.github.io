webpackJsonp([17],{

/***/ 813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideMenuPageModule", function() { return SideMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__side_menu__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SideMenuPageModule = (function () {
    function SideMenuPageModule() {
    }
    return SideMenuPageModule;
}());
SideMenuPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__side_menu__["a" /* SideMenuPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__side_menu__["a" /* SideMenuPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__side_menu__["a" /* SideMenuPage */]
        ]
    })
], SideMenuPageModule);

//# sourceMappingURL=side-menu.module.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SideMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SideMenuPage = (function () {
    function SideMenuPage(navCtrl, menuCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.MENU = {
            DEFAULT: 'menu-components',
            MATERIAL: 'menu-material',
            AVATAR: 'menu-avatar',
        };
    }
    SideMenuPage.prototype.changeMenu = function (menu) {
        var _this = this;
        // Disables all other sidemenus
        Object.keys(this.MENU).map(function (k) { return _this.menuCtrl.enable(false, _this.MENU[k]); });
        // Enables then open the selected menu
        this.menuCtrl.enable(true, menu);
        this.menuCtrl.open(menu);
    };
    return SideMenuPage;
}());
SideMenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-side-menu',template:/*ion-inline-start:"D:\ivpay2\src\pages\side-menu\side-menu.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-buttons left>\n\n      <button ion-button icon-only menuToggle="left">\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Side Menu</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only menuToggle="right">\n\n        <ion-icon name="home"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <p>The home icon on the right is a small width sidemenu.</p>\n\n  <button ion-button block color="secondary" (click)="changeMenu(MENU.DEFAULT)">Default sidemenu</button>\n\n  <button ion-button block color="danger" (click)="changeMenu(MENU.AVATAR)">Sidemenu with avatar</button>\n\n  <button ion-button block color="black" (click)="changeMenu(MENU.MATERIAL)">Material Design</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\side-menu\side-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
], SideMenuPage);

//# sourceMappingURL=side-menu.js.map

/***/ })

});
//# sourceMappingURL=17.js.map