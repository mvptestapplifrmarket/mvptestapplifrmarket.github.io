webpackJsonp([9],{

/***/ 1655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletPageModule", function() { return WalletPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messages__ = __webpack_require__(1720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_date_pipe__ = __webpack_require__(1721);
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
            __WEBPACK_IMPORTED_MODULE_2__messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_3__pipes_date_pipe__["a" /* DateMessagePipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__messages__["a" /* MessagesPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__messages__["a" /* MessagesPage */]
        ]
    })
], WalletPageModule);

//# sourceMappingURL=messages.module.js.map

/***/ }),

/***/ 1720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_message_service__ = __webpack_require__(692);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessagesPage = (function () {
    function MessagesPage(modalCtrl, params, userService, messageService) {
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.userService = userService;
        this.messageService = messageService;
        this.discussionId = this.params.get("id");
        this.profilOther = this.params.get("profil");
        this.otherUid = this.params.get("otherUid");
        this.userUid = this.userService._userFirebase.uid;
        this.profilMe = this.userService._profil;
        this.messages = this.messageService.getMessages(this.discussionId);
    }
    MessagesPage.prototype.addmessage = function () {
        var _this = this;
        this.messageService.saveMessage(this.userUid, this.otherUid, this.newmessage).then(function () {
            _this.content.scrollToBottom();
            _this.newmessage = '';
        });
    };
    MessagesPage.prototype.goDown = function (index) {
        //this.content.scrollToBottom();
    };
    return MessagesPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
], MessagesPage.prototype, "content", void 0);
MessagesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-messages',template:/*ion-inline-start:"D:\ivpay2\src\pages\messages\messages.html"*/'<ion-header >\n\n  <ion-navbar color="primary" no-border-bottom>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Chat\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content #content>\n  <div class = "chatwindow">\n    <ion-list no-lines>\n      <ion-item *ngFor = "let item of messages | async; let i = index" text-wrap>\n        {{goDown(i)}}\n        <ion-avatar item-left *ngIf="profilOther.imageUrl && item.from != userUid">\n          <img src="{{profilOther.imageUrl}}">\n        </ion-avatar>\n        <div class="bubble me" *ngIf="item.from != userUid">\n          <div class="message-text">{{item.message}}</div>\n          <div class="message-meta">{{item.date | dateMessage}}</div>\n        </div>\n        <ion-avatar item-right *ngIf="profilMe.imageUrl && item.from == userUid">\n          <img *ngIf="profilMe.imageUrl" src="{{profilOther.imageUrl}}">\n        </ion-avatar>\n        <div class="bubbleme you" *ngIf="item.from == userUid">\n          <div class="message-text">{{item.message}}</div>\n          <div class="message-meta">{{item.date | dateMessage}}</div>\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n<ion-footer ion-fixed>\n  <ion-toolbar class="no-border" color="white">\n    <ion-input [(ngModel)]="newmessage" placeholder="Write your message ..."></ion-input>\n    <ion-buttons end>\n      <button ion-button (click)="addmessage()">\n        <ion-icon name="send" color="primary"></ion-icon>\n        Send\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"D:\ivpay2\src\pages\messages\messages.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_message_service__["a" /* MessageService */]])
], MessagesPage);

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 1721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateMessagePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DateMessagePipe = (function () {
    function DateMessagePipe() {
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
    DateMessagePipe.prototype.transform = function (value) {
        var date = new Date(value);
        var dateCurrent = new Date();
        var datePrevious7Days = new Date();
        var dateOffset = (24 * 60 * 60 * 1000) * 7; //7 days
        datePrevious7Days.setTime(datePrevious7Days.getTime() - dateOffset);
        if (date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() == dateCurrent.getDate() + "/" + dateCurrent.getMonth() + "/" + dateCurrent.getFullYear()) {
            return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        if (date < dateCurrent && date > datePrevious7Days) {
            return this.days[date.getDay()] + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        }
        else {
            return ("0" + date.getMonth()).slice(-2) + "/" + ("0" + date.getDay()).slice(-2) + "/" + date.getFullYear();
        }
    };
    return DateMessagePipe;
}());
DateMessagePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'dateMessage'
    })
], DateMessagePipe);

//# sourceMappingURL=date.pipe.js.map

/***/ })

});
//# sourceMappingURL=9.js.map