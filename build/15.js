webpackJsonp([15],{

/***/ 814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MasonryCardsPageModule", function() { return MasonryCardsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(880);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MasonryCardsPageModule = (function () {
    function MasonryCardsPageModule() {
    }
    return MasonryCardsPageModule;
}());
MasonryCardsPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__store__["a" /* StorePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* StorePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__store__["a" /* StorePage */]
        ]
    })
], MasonryCardsPageModule);

//# sourceMappingURL=store.module.js.map

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorePage; });
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




var StorePage = (function () {
    function StorePage(navCtrl, navParams, articleService, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.articleService = articleService;
        this.geolocation = geolocation;
        this.type = "products";
        this.articles = [];
        this.articles_backup = [];
        this.position = { latitude: 0, longitude: 0 };
        this.alive = true;
    }
    StorePage.prototype.ionViewWillLeave = function () {
        this.alive = false;
    };
    StorePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //this.articles = this.articleService.getArticles();
        this.subscribeArticle = this.articleService.getArticles().takeWhile(function () { return _this.alive; }).subscribe(function (articles) {
            articles.forEach(function (article) {
                {
                    _this.articles.push(article);
                    _this.articles_backup.push(article);
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
    StorePage.prototype.displaySearchBar = function () {
        var _this = this;
        this.isDisplaySearch = !this.isDisplaySearch;
        if (this.isDisplaySearch) {
            setTimeout(function () {
                _this.searchbar.setFocus();
            });
        }
        ;
    };
    StorePage.prototype.seeDetails = function (item) {
        console.log(item);
        this.navCtrl.push('ArticlePage', { article: item, key: item.$key });
    };
    StorePage.prototype.seeDetailsService = function (item) {
        //console.log(item);
        this.navCtrl.push('ServicePage', { service: item, key: item.$key });
    };
    StorePage.prototype.calculateDistance = function (value) {
        if (value) {
            var positions = value.split(':');
            var me = positions[0].split(',');
            var other = positions[1].split(',');
            return getDistanceFromLatLonInKm(me[0], me[1], other[0], other[1]).toFixed(1);
        }
    };
    StorePage.prototype.getItems = function (ev) {
        this.articles = this.articles_backup;
        // set val to the value of the ev target
        var val = ev.target.value;
        this.valueSearch = val;
        // if the value is an empty string don't filter the items
        if (val) {
            var text_1 = val.toLowerCase();
            this.articles = this.articles
                .filter(function (article) {
                return article.title.toLowerCase().indexOf(text_1) >= 0
                    || article.type.toLowerCase().indexOf(text_1) >= 0
                    || article.description.toLowerCase().indexOf(text_1) >= 0
                    || article.brand.toLowerCase().indexOf(text_1) >= 0;
            });
        }
    };
    return StorePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('searchbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Searchbar */])
], StorePage.prototype, "searchbar", void 0);
StorePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-store',template:/*ion-inline-start:"D:\ivpay2\src\pages\store\store.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <ion-title>Items</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="displaySearchBar()">\n\n        <ion-icon item-end name="search"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n\n\n  <ion-searchbar #searchbar [(ngModel)]="valueSearchBar" (ionInput)="getItems($event)" *ngIf="isDisplaySearch" ></ion-searchbar>\n\n\n\n\n\n</ion-header>\n\n<ion-content padding>\n\n  <div [ngSwitch]="type">\n\n\n\n    <div class="pins" *ngSwitchCase="\'products\'">\n\n      <ion-card class="pin" *ngFor="let article of articles" style="border-radius:0px">\n\n        <div (click)="seeDetails(article, article.$key)">\n\n          <img [src]="article.taked_picture" />\n\n          <div class="post-description">\n\n            <small>{{article.currency == \'USD\' ? \' &#36;\' : \'&euro;\'}} {{ article.price }}</small>\n\n          </div>\n\n          <ion-item>\n\n            <small>{{article.title}}</small>\n\n            <p *ngIf="position"><small>{{calculateDistance(position.latitude + "," + position.longitude + ":" + article.latitude + "," + article.longitude)}} km</small></p>\n\n          </ion-item>\n\n        </div>\n\n      </ion-card>\n\n    </div>\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\store\store.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
], StorePage);

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
//# sourceMappingURL=store.js.map

/***/ })

});
//# sourceMappingURL=15.js.map