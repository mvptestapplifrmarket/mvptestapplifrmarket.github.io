webpackJsonp([13],{

/***/ 1670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemingPageModule", function() { return ThemingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__theming__ = __webpack_require__(1736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ThemingPageModule = (function () {
    function ThemingPageModule() {
    }
    return ThemingPageModule;
}());
ThemingPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__theming__["a" /* ThemingPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__theming__["a" /* ThemingPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__theming__["a" /* ThemingPage */]
        ]
    })
], ThemingPageModule);

//# sourceMappingURL=theming.module.js.map

/***/ }),

/***/ 1736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThemingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ThemingPage = (function () {
    /*
      Thanks to Scott: https://github.com/ScottMBerger for this feature!
    */
    function ThemingPage(navCtrl, global) {
        this.navCtrl = navCtrl;
        this.global = global;
    }
    ThemingPage.prototype.changeTheme = function (theme) {
        this.global.set('theme', theme);
    };
    return ThemingPage;
}());
ThemingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'page-theming',template:/*ion-inline-start:"D:\ivpay2\src\pages\theming\theming.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Theming</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <h3>Setting theme</h3>\n\n  <button class="pop-in" ion-button (click)="changeTheme(\'theme-light\')">Default</button>\n\n  <button class="pop-in" ion-button color="dark" (click)="changeTheme(\'theme-dark\')">Dark</button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\theming\theming.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__app_global_setting__["a" /* AppState */]])
], ThemingPage);

//# sourceMappingURL=theming.js.map

/***/ })

});
//# sourceMappingURL=13.js.map