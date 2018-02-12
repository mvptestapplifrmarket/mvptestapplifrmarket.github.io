webpackJsonp([16],{

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreServiceModule", function() { return StoreServiceModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storeService__ = __webpack_require__(881);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StoreServiceModule = (function () {
    function StoreServiceModule() {
    }
    return StoreServiceModule;
}());
StoreServiceModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__storeService__["a" /* StoreServicePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__storeService__["a" /* StoreServicePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__storeService__["a" /* StoreServicePage */]
        ]
    })
], StoreServiceModule);

//# sourceMappingURL=storeService.module.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(367);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StoreServicePage = (function () {
    function StoreServicePage(navCtrl, navParams, articleService, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.articleService = articleService;
        this.geolocation = geolocation;
        this.type = "services";
        this.services = [];
        this.services_backup = [];
        this.position = { latitude: 0, longitude: 0 };
        this.alive = true;
    }
    StoreServicePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //this.services = this.articleService.getServices();
        this.subscribeService = this.articleService.getServices().takeWhile(function () { return _this.alive; }).subscribe(function (articles) {
            articles.forEach(function (article) {
                {
                    _this.services.push(article);
                    _this.services_backup.push(article);
                }
            });
        });
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
            .then(function (position) {
            _this.position.latitude = position.coords.latitude;
            _this.position.longitude = position.coords.longitude;
        }).catch(function (err) {
            _this.position.latitude = "n/a";
            _this.position.longitude = "n/a";
        });
    };
    StoreServicePage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    StoreServicePage.prototype.seeDetails = function (item) {
        this.navCtrl.push('ArticlePage', { article: item, key: item.$key });
    };
    StoreServicePage.prototype.seeDetailsService = function (item) {
        //console.log(item);
        this.navCtrl.push('ServicePage', { service: item, key: item.$key });
    };
    StoreServicePage.prototype.calculateDistance = function (value) {
        if (value) {
            var positions = value.split(':');
            var me = positions[0].split(',');
            var other = positions[1].split(',');
            return getDistanceFromLatLonInKm(me[0], me[1], other[0], other[1]).toFixed(1);
        }
    };
    StoreServicePage.prototype.getItems = function (ev) {
        this.services = this.services_backup;
        // set val to the value of the ev target
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val) {
            var text_1 = val.toLowerCase();
            this.services = this.services
                .filter(function (article) {
                return article.title.toLowerCase().indexOf(text_1) >= 0
                    || article.type.toLowerCase().indexOf(text_1) >= 0
                    || article.description.toLowerCase().indexOf(text_1) >= 0;
            });
        }
    };
    return StoreServicePage;
}());
StoreServicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-store-service',template:/*ion-inline-start:"D:\ivpay2\src\pages\storeService\storeService.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Services</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="isDisplay=!isDisplay">\n        <ion-icon item-end name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n  <ion-searchbar (ionInput)="getItems($event)" *ngIf="isDisplay" ></ion-searchbar>\n\n</ion-header>\n<ion-content padding>\n  <div [ngSwitch]="type">\n    <div class="pins" *ngSwitchCase="\'services\'">\n      <ion-card class="pin" *ngFor="let service of services" style="border-radius:0px">\n        <div (click)="seeDetailsService(service, service.$key)">\n          <img [src]="service.taked_picture" />\n          <div class="post-description">\n            <small>{{service.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{ service.price }} {{service.isHourly ? \'/ hour\': \'\'}}</small>\n          </div>\n          <ion-item>\n            <small>{{service.title}}</small>\n            <p *ngIf="position"><small>{{calculateDistance(position.latitude + "," + position.longitude + ":" + service.latitude + "," + service.longitude)}} km</small></p>\n          </ion-item>\n        </div>\n      </ion-card>\n    </div>\n\n  </div>\n</ion-content>\n'/*ion-inline-end:"D:\ivpay2\src\pages\storeService\storeService.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
], StoreServicePage);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
//# sourceMappingURL=storeService.js.map

/***/ })

});
//# sourceMappingURL=16.js.map