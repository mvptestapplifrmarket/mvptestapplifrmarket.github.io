webpackJsonp([29],{

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletPageModule", function() { return WalletPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__discussions__ = __webpack_require__(860);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WalletPageModule = (function () {
    function WalletPageModule() {
    }
    return WalletPageModule;
}());
WalletPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__discussions__["a" /* DiscussionsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__discussions__["a" /* DiscussionsPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__discussions__["a" /* DiscussionsPage */]
        ]
    })
], WalletPageModule);

//# sourceMappingURL=discussions.module.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscussionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_message_service__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DiscussionsPage = (function () {
    function DiscussionsPage(navCtrl, modalCtrl, userService, messageService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.messageService = messageService;
        this.discussions = [];
        this.alive = true;
    }
    DiscussionsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.messageService.getDiscussions(this.userService._userFirebase.uid)
            .takeWhile(function () { return _this.alive; })
            .subscribe(function (data) {
            var _loop_1 = function (key) {
                var d = key.$key;
                var uids = d.split("-");
                if (uids[0] == _this.userService._userFirebase.uid) {
                    _this.userService.getProfil(uids[1]).subscribe(function (p) { return _this.discussions.push({ id: d, profile: p }); });
                }
                else {
                    _this.userService.getProfil(uids[0]).subscribe(function (p) { return _this.discussions.push({ id: d, profile: p }); });
                }
            };
            //console.log(data);
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var key = data_1[_i];
                _loop_1(key);
            }
        });
    };
    DiscussionsPage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    DiscussionsPage.prototype.openItem = function (id, profil) {
        var uids = id.split("-");
        if (uids[0] == this.userService._userFirebase.uid) {
            this.navCtrl.push('MessagesPage', { id: id, profil: profil, otherUid: uids[1] });
        }
        else {
            this.navCtrl.push('MessagesPage', { id: id, profil: profil, otherUid: uids[0] });
        }
    };
    return DiscussionsPage;
}());
DiscussionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-discussions',template:/*ion-inline-start:"D:\ivpay2\src\pages\discussions\discussions.html"*/'<ion-header >\n\n\n\n  <ion-navbar color="primary" no-border-bottom>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Chat\n\n    </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let item of discussions">\n\n      <button ion-item (click)="openItem(item.id, item.profile)">\n\n        <ion-avatar item-start>\n\n          <img *ngIf="item.profile.imageUrl" [src]="item.profile.imageUrl" />\n\n        </ion-avatar>\n\n        <h2>{{item.profile.pseudo}}</h2>\n\n        <ion-badge color="danger">!</ion-badge>\n\n      </button>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\discussions\discussions.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_message_service__["a" /* MessageService */]])
], DiscussionsPage);

//# sourceMappingURL=discussions.js.map

/***/ })

});
//# sourceMappingURL=29.js.map