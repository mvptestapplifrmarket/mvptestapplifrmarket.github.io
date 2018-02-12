webpackJsonp([26],{

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__homev2__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomePageModule = (function () {
    function HomePageModule() {
    }
    return HomePageModule;
}());
HomePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__homev2__["a" /* Homev2Page */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__homev2__["a" /* Homev2Page */]),
            __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyBWc6kOtjHwnrL3bTJWG5YklwyB8SxFm8A'
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__homev2__["a" /* Homev2Page */]
        ]
    })
], HomePageModule);

//# sourceMappingURL=homev2.module.js.map

/***/ }),

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Homev2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global_setting__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_map_service__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Homev2Page = (function () {
    function Homev2Page(mapServiceProvider, renderer, loadingCtrl, userService, articleService, platform, geolocation, alertCtrl, navCtrl) {
        this.mapServiceProvider = mapServiceProvider;
        this.renderer = renderer;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.articleService = articleService;
        this.platform = platform;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.title = 'NeoPlace';
        this.markers = [];
        this.alive = true;
        //Main Menu
        this.pages = __WEBPACK_IMPORTED_MODULE_2__app_global_setting__["e" /* PAGES2 */];
    }
    Homev2Page.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('android')) {
                if (!_this.mapServiceProvider.map) {
                    setTimeout(_this.loadMapNative.bind(_this), 1000);
                }
                else {
                    _this.mapServiceProvider.map.setDiv(_this.mapElement.nativeElement);
                    _this.mapServiceProvider.hideServices();
                    _this.mapServiceProvider.displayArticles();
                    if (_this.valueSearch) {
                        _this.valueSearchBar = _this.valueSearch;
                        _this.mapServiceProvider.findArticle(_this.valueSearch);
                    }
                    _this.mapServiceProvider.displayFiats();
                }
            }
            else {
                _this.zoom = 8;
                // initial center position for the map
                _this.lat = 0;
                _this.lng = 0;
                _this.loadMap();
                _this.loadArticle();
                //this.loadFiatPosition();
            }
        }).catch(function () {
            //console.log("Platform error");
        });
    };
    Homev2Page.prototype.displaySearchBar = function () {
        var _this = this;
        this.isDisplaySearch = !this.isDisplaySearch;
        if (this.isDisplaySearch) {
            setTimeout(function () {
                _this.searchbar.setFocus();
            });
        }
    };
    Homev2Page.prototype.ionViewWillLeave = function () {
        this.alive = false;
        this.mapServiceProvider.findArticle('');
        this.isDisplaySearch = false;
        // if (this.platform.is('cordova')) {
        //   //this.markers.forEach(marker => marker.remove());
        //   this.mapServiceProvider.setDiv(null, null);
        // }
    };
    Homev2Page.prototype.loadMapNative = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: 'Please wait...', duration: 5000 });
        loader.present();
        this.geolocation.getCurrentPosition({ maximumAge: 300000, timeout: 5000, enableHighAccuracy: true })
            .then(function (position) {
            var mapOptions = {
                camera: {
                    target: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    zoom: 5,
                    tilt: 30
                },
                controls: {
                    myLocationButton: true,
                    myLocation: true
                }
            };
            _this.mapServiceProvider.setDiv(_this.mapElement.nativeElement, mapOptions).then(function () {
                //add markers, polyline, etc.
                loader.dismiss().catch();
                // Now you can use all methods safely.
                _this.loadArticleNative();
                //this.loadFiatPositionNative();
            });
        }).catch(function (error) {
            var mapOptions = {
                camera: {
                    target: {
                        lat: 0,
                        lng: 0
                    }
                }
            };
            _this.mapServiceProvider.setDiv(_this.mapElement.nativeElement, mapOptions).then(function () {
                //add markers, polyline, etc.
                loader.dismiss().catch();
                // Now you can use all methods safely.
                _this.loadArticleNative();
                //this.loadFiatPositionNative();
            });
        });
    };
    Homev2Page.prototype.showList = function (pages) {
        if (pages.page == "TabsPage") {
            this.navCtrl.setRoot(pages.page);
        }
        else {
            this.navCtrl.push(pages.page);
        }
    };
    Homev2Page.prototype.showPage = function (page) {
        this.navCtrl.push(page);
    };
    Homev2Page.prototype.loadArticleNative = function () {
        var _this = this;
        this.articleService.getArticles().takeWhile(function () { return _this.alive; }).subscribe(function (articles) {
            articles.forEach(function (article) {
                {
                    if (article.uid != _this.userService._userFirebase.uid) {
                        _this.mapServiceProvider.map.addMarker({
                            icon: 'blue',
                            animation: 'DROP',
                            position: {
                                lat: article.latitude,
                                lng: article.longitude
                            }
                        })
                            .then(function (marker) {
                            _this.mapServiceProvider.markersArticle.push({ article: article, marker: marker });
                            var listenRender;
                            marker.on(__WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK)
                                .subscribe(function () {
                                var htmlInfoWindow = new __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["c" /* HtmlInfoWindow */]();
                                var html = [
                                    "<div class=\"pin\" style=\"width:150px;\"" + "id=\"" + article.$key + "\">",
                                    "<ion-card>",
                                    "<div class=\"pin\" style=\"height:113px\">",
                                    "<img src=" + article.taked_picture + ">",
                                    "</div>",
                                    "</ion-card>",
                                    "<div class=\"post-description\">",
                                    article.price + " " + article.currency + "<br><strong>" + article.title + "</strong> <br><a>See item</a>",
                                    "</div>",
                                    "</div>"
                                ].join("");
                                htmlInfoWindow.setContent(html);
                                htmlInfoWindow.open(marker);
                                listenRender = _this.renderer.listen(_this.mapElement.nativeElement, 'click', function (evt) {
                                    _this.seeDetails(article);
                                });
                            });
                            marker.on(__WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMapsEvent */].INFO_CLOSE)
                                .subscribe(function () {
                                listenRender();
                            });
                        });
                    }
                }
            });
        });
    };
    Homev2Page.prototype.loadFiatPositionNative = function () {
        var _this = this;
        this.userService.getPositions().takeWhile(function () { return _this.alive; }).subscribe(function (positions) {
            positions.forEach(function (position) {
                if (position.$key != _this.userService._userFirebase.uid) {
                    _this.userService.getProfil(position.$key).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
                        _this.mapServiceProvider.map.addMarker({
                            icon: 'green',
                            animation: 'DROP',
                            position: {
                                lat: position.lat,
                                lng: position.lng
                            }
                        })
                            .then(function (marker) {
                            _this.mapServiceProvider.markersFiat.push(marker);
                            var listenRender;
                            marker.on(__WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MARKER_CLICK)
                                .subscribe(function () {
                                var htmlInfoWindow = new __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["c" /* HtmlInfoWindow */]();
                                var html = [
                                    "<div class=\"pin\" style=\"width:150px;\"" + ">",
                                    "<ion-avatar item-left>",
                                    "<div class=\"pin\" style=\"height:113px\">",
                                    "<img src=" + profil.imageUrl + ">",
                                    "<strong>" + profil.pseudo + "</strong>",
                                    "</div>",
                                    "</ion-avatar>",
                                    "<div class=\"post-description\">",
                                    "Available for fiat exchange with <strong>" + profil.paymentMethod + "</strong> <br><a>Contact the NeoChanger</a>",
                                    "</div>",
                                    "</div>"
                                ].join("");
                                htmlInfoWindow.setContent(html);
                                htmlInfoWindow.open(marker);
                                listenRender = _this.renderer.listen(_this.mapElement.nativeElement, 'click', function (evt) {
                                    _this.contact(profil, position.$key);
                                });
                            });
                            marker.on(__WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMapsEvent */].INFO_CLOSE)
                                .subscribe(function () {
                                listenRender();
                            });
                        });
                    });
                }
            });
        });
    };
    Homev2Page.prototype.loadArticle = function () {
        var _this = this;
        this.articleService.getArticles().takeWhile(function () { return _this.alive; }).subscribe(function (articles) {
            articles.forEach(function (article) {
                {
                    if (article.uid != _this.userService._userFirebase.uid) {
                        _this.addMarkerArticle(article);
                    }
                }
            });
        });
    };
    Homev2Page.prototype.findArticle = function (text1) {
        this.markers.forEach(function (marker) {
            if (text1 && text1.trim() != '' && marker.article) {
                var text = text1.toLowerCase();
                if (marker.article.title.toLowerCase().indexOf(text) >= 0) {
                    marker.visible = true;
                }
                else if (marker.article.type.toLowerCase().indexOf(text) >= 0) {
                    marker.visible = true;
                }
                else if (marker.article.description.toLowerCase().indexOf(text) >= 0) {
                    marker.visible = true;
                }
                else if (marker.article.brand.toLowerCase().indexOf(text) >= 0) {
                    marker.visible = true;
                }
                else {
                    marker.visible = false;
                }
            }
            else {
                marker.visible = true;
            }
        });
    };
    Homev2Page.prototype.loadFiatPosition = function () {
        var _this = this;
        this.userService.getPositions().takeWhile(function () { return _this.alive; }).subscribe(function (positions) {
            positions.forEach(function (position) {
                _this.userService.getProfil(position.$key).takeWhile(function () { return _this.alive; }).subscribe(function (profil) {
                    _this.addPositionFiat(position.lat, position.lng, profil, position.$key);
                });
            });
        });
    };
    Homev2Page.prototype.seeDetails = function (item) {
        this.navCtrl.push('ArticlePage', { article: item, key: item.$key });
    };
    Homev2Page.prototype.seeDetailsService = function (item) {
        this.navCtrl.push('ServicePage', { service: item, key: item.$key });
    };
    Homev2Page.prototype.loadMap = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: 'Please wait...', duration: 10000 });
        loader.present();
        this.geolocation.getCurrentPosition()
            .then(function (position) {
            loader.dismiss().catch();
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
            _this.markers.push({
                lat: _this.lat,
                lng: _this.lng,
                draggable: false,
                visible: true,
                markerClickable: false,
                iconUrl: "assets/img/position.png"
            });
        }).catch(function (error) {
            //console.log('Error : ', error);
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Error while getting your position, try again',
                buttons: ['Close']
            });
            alert.present();
        });
    };
    Homev2Page.prototype.addMarkerArticle = function (article) {
        this.markers.push({
            lat: article.latitude,
            lng: article.longitude,
            draggable: false,
            visible: true,
            article: article
        });
    };
    Homev2Page.prototype.addPositionFiat = function (lat, lng, profil, uid) {
        this.markers.push({
            lat: lat,
            lng: lng,
            draggable: false,
            position: { profil: profil, uid: uid }
        });
    };
    Homev2Page.prototype.contact = function (profil, uid) {
        var uidArray = [this.userService._userFirebase.uid, uid];
        uidArray = uidArray.sort();
        this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: uid });
    };
    Homev2Page.prototype.getItems = function (ev) {
        // set val to the value of the ev target
        var val = ev.target.value;
        this.valueSearch = val;
        if (this.platform.is('cordova')) {
            this.mapServiceProvider.findArticle(val);
        }
        else {
            this.findArticle(val);
        }
    };
    return Homev2Page;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], Homev2Page.prototype, "mapElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('searchbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Searchbar */])
], Homev2Page.prototype, "searchbar", void 0);
Homev2Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-homev2',template:/*ion-inline-start:"D:\ivpay2\src\pages\home\homev2\homev2.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>NeoPlace</ion-title>\n\n    <!--\n\n    <div style="text-align: center">\n\n      <img style="width: 10%" [src]="\'assets/img/logo/ic_neoplace.png\'">\n\n    </div>\n\n    -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="showPage(\'AddPage\')">\n\n        <ion-icon item-end name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar no-border-top color="#91a8d0">\n\n    <ion-searchbar #searchbar showCancelButton [(ngModel)]="valueSearchBar" (ionInput)="getItems($event)"></ion-searchbar>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="showPage(\'StorePage\')">\n\n        <ion-icon item-end name="list-box"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div *ngIf="!(lat && lng && zoom)" #map id="map" style="height:100%;">\n\n  </div>\n\n\n\n  <agm-map *ngIf="lat && lng && zoom" [latitude]="lat"\n\n           [longitude]="lng"\n\n           [zoom]="zoom">\n\n    <agm-marker *ngFor="let m of markers; let i = index"\n\n                [latitude]="m.lat"\n\n                [longitude]="m.lng"\n\n                [label]="m.label"\n\n                [iconUrl]="m.iconUrl"\n\n                [markerDraggable]="m.draggable"\n\n                [visible]="m.visible"\n\n                [markerClickable]="m.markerClickable">\n\n      <agm-info-window>\n\n            <div class="pin" style="width:150px" *ngIf="m.article">\n\n              <ion-card>\n\n                <img [src]="m.article.taked_picture" />\n\n              </ion-card>\n\n              <div class="post-description">\n\n                {{m.article.price}} {{m.article.currency}} <br><strong>{{m.article.title}}</strong> <br><a (click)="seeDetails(m.article)">See item</a>\n\n              </div>\n\n            </div>\n\n            <div class="pin" style="width:150px" *ngIf="m.service">\n\n              <ion-card>\n\n                <img [src]="m.service.taked_picture" />\n\n              </ion-card>\n\n              <div class="post-description">\n\n                {{m.service.price}} {{m.service.currency}} <br><strong>{{m.service.title}}</strong> <br><a (click)="seeDetailsService(m.service)">See service</a>\n\n              </div>\n\n            </div>\n\n            <div class="pin" style="width:175px" *ngIf="m.position">\n\n              <ion-avatar item-left>\n\n                <img src="{{m.position.profil.imageUrl}}">\n\n              </ion-avatar>\n\n              <h5>{{m.position.profil.pseudo}}</h5>\n\n              <div class="post-description">\n\n                Available for fiat exchange with <strong>{{m.position.profil.paymentMethod}}</strong>\n\n                <br>\n\n                <a (click)="contact(m.position.profil, m.position.uid)">Contact the SigChanger</a>\n\n              </div>\n\n            </div>\n\n      </agm-info-window>\n\n    </agm-marker>\n\n\n\n  </agm-map>\n\n\n\n\n\n  <!--\n\n    <ion-row *ngIf="!onFocusSearch">\n\n      <ion-col *ngFor="let item of pages; let i = index" text-center>\n\n        <button (click)="showList(item)" style="font-size: 15px;">\n\n          <ion-icon color="primary" name="{{ item.icon }}"></ion-icon> <br> {{ item.title }}\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n    -->\n\n\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\home\homev2\homev2.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_map_service__["a" /* MapServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer2 */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
], Homev2Page);

//# sourceMappingURL=homev2.js.map

/***/ })

});
//# sourceMappingURL=26.js.map