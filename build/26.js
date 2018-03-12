webpackJsonp([26],{

/***/ 1652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeServicePageModule", function() { return HomeServicePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__homeService__ = __webpack_require__(1717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(688);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomeServicePageModule = (function () {
    function HomeServicePageModule() {
    }
    return HomeServicePageModule;
}());
HomeServicePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__homeService__["a" /* HomeServicePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__homeService__["a" /* HomeServicePage */]),
            __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyBWc6kOtjHwnrL3bTJWG5YklwyB8SxFm8A'
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__homeService__["a" /* HomeServicePage */]
        ]
    })
], HomeServicePageModule);

//# sourceMappingURL=homeService.module.js.map

/***/ }),

/***/ 1717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_map_service__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomeServicePage = (function () {
    function HomeServicePage(mapServiceProvider, renderer, loadingCtrl, userService, articleService, platform, geolocation, alertCtrl, navCtrl) {
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
        this.pages = __WEBPACK_IMPORTED_MODULE_2__app_global_setting__["d" /* PAGES1 */];
    }
    HomeServicePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('android')) {
                if (!_this.mapServiceProvider.map) {
                    setTimeout(_this.loadMapNative.bind(_this), 1000);
                }
                else {
                    _this.mapServiceProvider.map.setDiv(_this.mapElement.nativeElement);
                    _this.mapServiceProvider.displayServices();
                    _this.mapServiceProvider.hideArticles();
                    if (_this.valueSearch) {
                        _this.valueSearchBar = _this.valueSearch;
                        _this.mapServiceProvider.findService(_this.valueSearch);
                    }
                    //this.mapServiceProvider.hideFiats();
                    if (_this.mapServiceProvider.markersService.length == 0) {
                        _this.loadServiceNative();
                    }
                }
            }
            else {
                _this.zoom = 8;
                // initial center position for the map
                _this.lat = 0;
                _this.lng = 0;
                _this.loadMap();
                _this.loadService();
                //this.loadFiatPosition();
            }
        }).catch(function () {
            //console.log("Platform error");
        });
    };
    HomeServicePage.prototype.ionViewWillLeave = function () {
        this.alive = false;
        this.mapServiceProvider.findService('');
        this.isDisplaySearch = false;
        // if (this.platform.is('cordova')) {
        //   this.mapServiceProvider.setDiv(null, null);
        // }
    };
    HomeServicePage.prototype.displaySearchBar = function () {
        var _this = this;
        this.isDisplaySearch = !this.isDisplaySearch;
        if (this.isDisplaySearch) {
            setTimeout(function () {
                _this.searchbar.setFocus();
            });
        }
    };
    HomeServicePage.prototype.loadMapNative = function () {
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
                    myLocationButton: true
                }
            };
            _this.mapServiceProvider.setDiv(_this.mapElement.nativeElement, mapOptions).then(function () {
                //add markers, polyline, etc.
                loader.dismiss().catch();
                // Now you can use all methods safely.
                _this.loadServiceNative();
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
                _this.loadServiceNative();
            });
        });
    };
    HomeServicePage.prototype.showList = function (pages) {
        if (pages.page == "TabsPage") {
            this.navCtrl.setRoot(pages.page);
        }
        else {
            this.navCtrl.push(pages.page);
        }
    };
    HomeServicePage.prototype.showPage = function (page) {
        this.navCtrl.push(page);
    };
    HomeServicePage.prototype.loadServiceNative = function () {
        var _this = this;
        this.articleService.getServices().takeWhile(function () { return _this.alive; }).subscribe(function (articles) {
            articles.forEach(function (article) {
                {
                    if (article.uid != _this.userService._userFirebase.uid) {
                        _this.mapServiceProvider.map.addMarker({
                            icon: 'red',
                            animation: 'DROP',
                            position: {
                                lat: article.latitude,
                                lng: article.longitude
                            }
                        })
                            .then(function (marker) {
                            _this.mapServiceProvider.markersService.push({ service: article, marker: marker });
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
                                    "<strong>" + article.title + "</strong> <br><a>See service</a>",
                                    "</div>",
                                    "</div>"
                                ].join("");
                                htmlInfoWindow.setContent(html);
                                htmlInfoWindow.open(marker);
                                listenRender = _this.renderer.listen(_this.mapElement.nativeElement, 'click', function (evt) {
                                    _this.seeDetailsService(article);
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
    HomeServicePage.prototype.loadFiatPosition = function () {
        var _this = this;
        this.userService.getPositions().takeWhile(function () { return _this.alive; }).subscribe(function (positions) {
            positions.forEach(function (position) {
                _this.userService.getProfil(position.$key).subscribe(function (profil) {
                    _this.addPositionFiat(position.lat, position.lng, profil, position.$key);
                });
            });
        });
    };
    HomeServicePage.prototype.loadService = function () {
        var _this = this;
        this.articleService.getServices().takeWhile(function () { return _this.alive; }).subscribe(function (services) {
            services.forEach(function (services) {
                {
                    //if(services.uid != this.userService._userFirebase.uid) {
                    _this.addMarkerService(services);
                    //}
                }
            });
        });
    };
    HomeServicePage.prototype.findService = function (text1) {
        this.markers.forEach(function (marker) {
            if (text1 && text1.trim() != '' && marker.service) {
                var text = text1.toLowerCase();
                if (marker.service.title.toLowerCase().indexOf(text) >= 0) {
                    marker.visible = true;
                }
                else if (marker.service.type.toLowerCase().indexOf(text) >= 0) {
                    marker.visible = true;
                }
                else if (marker.service.description.toLowerCase().indexOf(text) >= 0) {
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
    HomeServicePage.prototype.seeDetails = function (item) {
        this.navCtrl.push('ArticlePage', { article: item, key: item.$key });
    };
    HomeServicePage.prototype.seeDetailsService = function (item) {
        this.navCtrl.push('ServicePage', { service: item, key: item.$key });
    };
    HomeServicePage.prototype.loadMap = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: 'Please wait...', duration: 10000 });
        loader.present();
        this.geolocation.getCurrentPosition()
            .then(function (position) {
            loader.dismiss().catch();
            _this.lat = position.coords.latitude;
            _this.lng = position.coords.longitude;
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
    HomeServicePage.prototype.addPositionFiat = function (lat, lng, profil, uid) {
        this.markers.push({
            lat: lat,
            lng: lng,
            draggable: false,
            position: { profil: profil, uid: uid }
        });
    };
    HomeServicePage.prototype.addMarkerService = function (service) {
        this.markers.push({
            lat: service.latitude,
            lng: service.longitude,
            draggable: false,
            service: service
        });
    };
    HomeServicePage.prototype.contact = function (profil, uid) {
        var uidArray = [this.userService._userFirebase.uid, uid];
        uidArray = uidArray.sort();
        this.navCtrl.push('MessagesPage', { id: uidArray[0] + "-" + uidArray[1], profil: profil, otherUid: uid });
    };
    HomeServicePage.prototype.getItems = function (ev) {
        // set val to the value of the ev target
        var val = ev.target.value;
        this.valueSearch = val;
        if (this.platform.is('cordova')) {
            this.mapServiceProvider.findService(val);
        }
        else {
            this.findService(val);
        }
    };
    return HomeServicePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], HomeServicePage.prototype, "mapElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('searchbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Searchbar */])
], HomeServicePage.prototype, "searchbar", void 0);
HomeServicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-homeservice',template:/*ion-inline-start:"D:\ivpay2\src\pages\home\homeService\homeService.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n\n\n    <ion-title>NeoPlace</ion-title>\n\n    <!--\n\n    <div style="text-align: center">\n\n      <img style="width: 10%" [src]="\'assets/img/logo/ic_neoplace.png\'">\n\n    </div>\n\n    -->\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="showPage(\'AddServicePage\')">\n\n        <ion-icon item-end name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar no-border-top color="#91a8d0">\n\n    <ion-searchbar #searchbar showCancelButton [(ngModel)]="valueSearchBar" (ionInput)="getItems($event)"></ion-searchbar>\n\n\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="showPage(\'StoreServicePage\')">\n\n        <ion-icon item-end name="list-box"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div *ngIf="!(lat && lng && zoom)" #map id="map" style="height:100%;"></div>\n\n\n\n  <agm-map *ngIf="lat && lng && zoom" [latitude]="lat"\n\n           [longitude]="lng"\n\n           [zoom]="zoom">\n\n    <agm-marker *ngFor="let m of markers; let i = index"\n\n                [latitude]="m.lat"\n\n                [longitude]="m.lng"\n\n                [label]="m.label"\n\n                [iconUrl]="m.iconUrl"\n\n                [markerDraggable]="m.draggable"\n\n                [visible]="m.visible"\n\n                [markerClickable]="m.markerClickable">\n\n      <agm-info-window>\n\n        <div class="pin" style="width:150px" *ngIf="m.article">\n\n          <ion-card>\n\n            <img [src]="m.article.taked_picture" />\n\n          </ion-card>\n\n          <div class="post-description">\n\n            {{m.article.price}} {{m.article.currency}} <br><strong>{{m.article.title}}</strong> <br><a (click)="seeDetails(m.article)">See item</a>\n\n          </div>\n\n        </div>\n\n        <div class="pin" style="width:150px" *ngIf="m.service">\n\n          <ion-card>\n\n            <img [src]="m.service.taked_picture" />\n\n          </ion-card>\n\n          <div class="post-description">\n\n            {{m.service.price}} {{m.service.currency}} <br><strong>{{m.service.title}}</strong> <br><a (click)="seeDetailsService(m.service)">See service</a>\n\n          </div>\n\n        </div>\n\n        <div class="pin" style="width:175px" *ngIf="m.position">\n\n          <ion-avatar item-left>\n\n            <img src="{{m.position.profil.imageUrl}}">\n\n          </ion-avatar>\n\n          <h5>{{m.position.profil.pseudo}}</h5>\n\n          <div class="post-description">\n\n            Available for fiat exchange with <strong>{{m.position.profil.paymentMethod}}</strong>\n\n            <br>\n\n            <a (click)="contact(m.position.profil, m.position.uid)">Contact the NeoChanger</a>\n\n          </div>\n\n        </div>\n\n      </agm-info-window>\n\n    </agm-marker>\n\n  </agm-map>\n\n\n\n  <!--\n\n  <ion-row>\n\n    <ion-col *ngFor="let item of pages; let i = index" text-center>\n\n      <button (click)="showList(item)" style="font-size: 15px;">\n\n        <ion-icon color="primary" name="{{ item.icon }}"></ion-icon> <br> {{ item.title }}\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n  -->\n\n\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\home\homeService\homeService.html"*/
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
], HomeServicePage);

//# sourceMappingURL=homeService.js.map

/***/ })

});
//# sourceMappingURL=26.js.map