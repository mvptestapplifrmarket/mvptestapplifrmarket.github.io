webpackJsonp([35],{

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddModule", function() { return AddModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add__ = __webpack_require__(852);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddModule = (function () {
    function AddModule() {
    }
    return AddModule;
}());
AddModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__add__["a" /* AddPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__add__["a" /* AddPage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__add__["a" /* AddPage */]
        ]
    })
], AddModule);

//# sourceMappingURL=add.module.js.map

/***/ }),

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AddPage = (function () {
    function AddPage(toastCtrl, loadingCtrl, geolocation, navCtrl, camera, crop, platform, alertCtrl, articleService, userService, barcodeScanner, sanitizer) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.crop = crop;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.articleService = articleService;
        this.userService = userService;
        this.barcodeScanner = barcodeScanner;
        this.sanitizer = sanitizer;
        this.has_taked_picture = false;
        this.DEFAULT_IMAGE = 'http://placehold.it/300x300';
        //this.taked_picture = this.DEFAULT_IMAGE;
        // if (!this.platform.is('cordova')) {
        //   console.warn('Cordova is not available');
        //   const alert = this.alertCtrl.create({
        //     title: 'Attention!',
        //     subTitle: 'Cordova is not available',
        //     buttons: ['Close']
        //   });
        //   alert.present();
        // }
        this.currency = this.userService._profil.currency;
    }
    AddPage.prototype.takePicture = function () {
        var _this = this;
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            quality: 50,
            targetWidth: 1000,
            targetHeight: 1000,
            correctOrientation: true
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            _this.has_taked_picture = true;
            _this.taked_picture = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            //console.log(err);
            _this.errorMessageTP = err;
            var alert = _this.alertCtrl.create({
                title: 'Attention!',
                subTitle: 'Only works in real device',
                buttons: ['Close']
            });
            alert.present();
        });
    };
    AddPage.prototype.takeGallery = function () {
        var _this = this;
        // Get Image from ionic-native's built in camera plugin
        return this.camera.getPicture({
            allowEdit: true,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: this.camera.MediaType.ALLMEDIA,
            destinationType: this.camera.DestinationType.FILE_URI,
            quality: 50,
            targetWidth: 1000,
            targetHeight: 1000,
        })
            .then(function (fileUri) {
            // Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                return fileUri;
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                return _this.crop.crop(fileUri, { quality: 100 });
            }
        })
            .then(function (path) {
            // path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
            _this.has_taked_picture = true;
            _this.taked_picture = path;
            //console.log('Cropped Image Path!: ' + path);
            return path;
        }, function (err) {
            _this.errorMessage = err;
            //console.log('Error cropping image', err);
            var alert = _this.alertCtrl.create({
                title: 'Error !',
                subTitle: 'Error while taking a picture',
                buttons: ['Close']
            });
            alert.present();
        });
    };
    AddPage.prototype.scanCode = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            _this.ean = barcodeData.text;
        }, function (err) {
            //console.log('Error: ', err);
        });
    };
    AddPage.prototype.add = function () {
        var _this = this;
        if (!this.checkForm()) {
            return;
        }
        var loader = this.loadingCtrl.create({ content: 'Please wait while publishing your item', duration: 5000 });
        loader.present();
        var watch = this.geolocation.getCurrentPosition({ maximumAge: 300000, timeout: 5000, enableHighAccuracy: true });
        watch.then(function (data) {
            _this.articleService.saveArticle({
                taked_picture: _this.taked_picture ? _this.taked_picture : _this.DEFAULT_IMAGE,
                title: _this.title,
                type: _this.type,
                description: _this.description,
                currency: _this.userService._profil.currency,
                price: _this.price,
                status: 'published',
                latitude: data.coords.latitude + Math.random() * (0.0019 + 0.0019) - 0.0019,
                longitude: data.coords.longitude + Math.random() * (0.0019 + 0.0019) - 0.0019,
                uid: _this.userService._userFirebase.uid,
                brand: _this.brand,
                condition: _this.condition
            });
            loader.dismissAll();
            var alert = _this.alertCtrl.create({
                title: 'Published',
                subTitle: 'Item successful published',
                buttons: ['Close']
            });
            alert.onDidDismiss(function () {
                _this.navCtrl.pop();
            });
            alert.present();
        }).catch(function (error) {
            _this.errorMessage = error;
            //console.log('Error : ', error);
            var alert = _this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Error while getting your position',
                buttons: ['Close']
            });
            alert.present();
        });
    };
    AddPage.prototype.save = function () {
        var _this = this;
        if (!this.checkForm()) {
            return;
        }
        var loader = this.loadingCtrl.create({ content: 'Please wait while saving your item', duration: 10000 });
        loader.present();
        this.articleService.saveInventory({
            taked_picture: this.taked_picture,
            title: this.title,
            type: this.type,
            description: this.description,
            price: this.price,
            currency: this.userService._profil.currency,
            ean: this.ean,
            uid: this.userService._userFirebase.uid,
            status: "inventory",
            brand: this.brand,
            condition: this.condition
        });
        loader.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Saved',
            subTitle: 'Item successful saved',
            buttons: ['Close']
        });
        alert.onDidDismiss(function () {
            _this.navCtrl.pop();
        });
        alert.present();
    };
    AddPage.prototype.checkForm = function () {
        if (!this.taked_picture) {
            this.toastCtrl.create({
                message: 'Please add a picture',
                duration: 2000,
                position: 'bottom'
            }).present();
            return false;
        }
        if (!this.title || !this.type || !this.description || !this.price || !this.condition) {
            this.toastCtrl.create({
                message: 'Please fill all fields',
                duration: 2000,
                position: 'bottom'
            }).present();
            return false;
        }
        if (this.price <= 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Error !',
                subTitle: 'No valid amount',
                buttons: ['Close']
            });
            alert_1.present();
            return false;
        }
        return true;
    };
    return AddPage;
}());
AddPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add',template:/*ion-inline-start:"D:\ivpay2\src\pages\add\add.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>New item</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div style="height: 40%; width: 100%; vertical-align: middle">\n\n    <div text-center style="margin-top:20%; margin-bottom: 25%;" *ngIf="!taked_picture">\n\n      <button ion-button round outline icon-start text-center (click)="takePicture()">\n\n        <ion-icon name="add"></ion-icon>\n\n        Add picture\n\n      </button>\n\n      <button ion-button round outline icon-start text-center (click)="takeGallery()">\n\n        <ion-icon name="images"></ion-icon>\n\n        Take from gallery\n\n      </button>\n\n    </div>\n\n    <div text-center style="height: 100%;" *ngIf="taked_picture">\n\n      <img style="height: 100%;" [src]="sanitizer.bypassSecurityTrustResourceUrl(taked_picture)" />\n\n    </div>\n\n  </div>\n\n\n\n  <ion-list no-border>\n\n    <ion-list-header>\n\n      General information\n\n    </ion-list-header>\n\n    <ion-item>\n\n      <ion-input type="text" placeholder="Title" [(ngModel)]="title"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Type</ion-label>\n\n      <ion-select [(ngModel)]="type" submitText="Ok" cancelText="Cancel">\n\n        <ion-option value="car">Car</ion-option>\n\n        <ion-option value="electronics">Electronics</ion-option>\n\n        <ion-option value="clothes">Clothes</ion-option>\n\n        <ion-option value="other">Other</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-textarea name="description" placeholder="Description" [(ngModel)]="description" autosize></ion-textarea>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n\n    <ion-list-header>\n\n      Details\n\n    </ion-list-header>\n\n    <ion-item>\n\n      <ion-input type="text" placeholder="Brand" [(ngModel)]="brand"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Condition article</ion-label>\n\n      <ion-select [(ngModel)]="condition" submitText="Ok" cancelText="Cancel">\n\n        <ion-option value="new">New product</ion-option>\n\n        <ion-option value="good">Good</ion-option>\n\n        <ion-option value="middle">Middle</ion-option>\n\n        <ion-option value="poor">Poor</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list>\n\n    <ion-list-header>\n\n      Payment\n\n    </ion-list-header>\n\n    <ion-item>\n\n      <ion-label>Price {{currency}}</ion-label>\n\n      <ion-input type="number" [(ngModel)]="price"></ion-input>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-row>\n\n    <ion-col col-3>\n\n      <button ion-button icon-only (click)="scanCode()">\n\n        <ion-icon name="barcode"></ion-icon>\n\n      </button>\n\n    </ion-col>\n\n    <ion-col>\n\n      <ion-input type="text" placeholder="EAN (click to left icon to scan)" [(ngModel)]="ean"></ion-input>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n  <ion-row center text-center>\n\n    <ion-col>\n\n      <button ion-button icon-end color="dark" (click)="add()">\n\n        Publish\n\n        <ion-icon name="star"></ion-icon>\n\n      </button>\n\n    </ion-col>\n\n    <ion-col>\n\n      <button ion-button icon-end color="blue" (click)="save()">\n\n        Save in my inventory\n\n        <ion-icon name="star"></ion-icon>\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\ivpay2\src\pages\add\add.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__["a" /* Crop */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_6__providers_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["c" /* DomSanitizer */]])
], AddPage);

//# sourceMappingURL=add.js.map

/***/ })

});
//# sourceMappingURL=35.js.map