webpackJsonp([36],{

/***/ 1641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddServiceModule", function() { return AddServiceModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addService__ = __webpack_require__(1706);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddServiceModule = (function () {
    function AddServiceModule() {
    }
    return AddServiceModule;
}());
AddServiceModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__addService__["a" /* AddServicePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__addService__["a" /* AddServicePage */])
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__addService__["a" /* AddServicePage */]
        ]
    })
], AddServiceModule);

//# sourceMappingURL=addService.module.js.map

/***/ }),

/***/ 1706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_crop__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_ipfs_service__ = __webpack_require__(691);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddServicePage = (function () {
    function AddServicePage(toastCtrl, loadingCtrl, geolocation, navCtrl, camera, crop, platform, alertCtrl, articleService, userService, barcodeScanner, ipfsService, sanitizer) {
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
        this.ipfsService = ipfsService;
        this.sanitizer = sanitizer;
        this.isHourly = false;
        this.isRemote = true;
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
    AddServicePage.prototype.takePicture = function (event) {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.camera.getPicture({
                destinationType: this.camera.DestinationType.FILE_URI,
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
                //save to ipfs
                _this.ipfsService.addData(_this.taked_picture).then(function (hash) {
                    _this.taked_picture = _this.ipfsService.gateway + hash;
                });
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
        }
        else {
            this.file = event.srcElement.files[0];
            if (this.file.type.split('/')[0] == 'image') {
                this.has_taked_picture = true;
                this.ipfsService.addFile(this.file, this.platform.is('cordova')).then(function (reader) {
                    _this.ipfsService.saveToIpfs(reader).then(function (hash) {
                        _this.taked_picture = _this.ipfsService.gateway + hash;
                    });
                });
            }
        }
    };
    AddServicePage.prototype.takeGallery = function () {
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
            // save to ipfs
            _this.ipfsService.addFile(_this.file, _this.platform.is('cordova')).then(function (reader) {
                _this.ipfsService.saveToIpfs(reader).then(function (hash) {
                    _this.taked_picture = _this.ipfsService.gateway + hash;
                });
            });
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
    AddServicePage.prototype.add = function () {
        var _this = this;
        if (!this.checkForm()) {
            return;
        }
        var loader = this.loadingCtrl.create({ content: 'Please wait while publishing your service', duration: 5000 });
        loader.present();
        var watch = this.geolocation.getCurrentPosition({ maximumAge: 300000, timeout: 5000, enableHighAccuracy: true });
        watch.then(function (data) {
            _this.articleService.saveService({
                taked_picture: _this.taked_picture ? _this.taked_picture : _this.DEFAULT_IMAGE,
                title: _this.title,
                type: _this.type,
                isHourly: _this.isHourly,
                isRemote: _this.isRemote,
                description: _this.description,
                currency: _this.userService._profil.currency,
                price: _this.price,
                latitude: data.coords.latitude + Math.random() * (0.0019 + 0.0019) - 0.0019,
                longitude: data.coords.longitude + Math.random() * (0.0019 + 0.0019) - 0.0019,
                uid: _this.userService._userFirebase.uid,
                address: _this.address ? _this.address :
                    "coord lat : " + data.coords.latitude + Math.random() + ", lng : " + data.coords.longitude + Math.random()
            });
            var alert = _this.alertCtrl.create({
                title: 'Published',
                subTitle: 'Service successful published',
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
                title: 'Attention!',
                subTitle: 'Error while getting your position',
                buttons: ['Close']
            });
            alert.present();
        });
    };
    AddServicePage.prototype.checkForm = function () {
        if (!this.taked_picture) {
            this.toastCtrl.create({
                message: 'Please add a picture',
                duration: 2000,
                position: 'bottom'
            }).present();
            return false;
        }
        if (!this.title || !this.type || !this.description || !this.price) {
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
    return AddServicePage;
}());
AddServicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-service',template:/*ion-inline-start:"D:\ivpay2\src\pages\addService\addService.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>New service</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div style="height: 40%; width: 100%; vertical-align: middle">\n    <div text-center style="margin-top:20%; margin-bottom: 25%;" *ngIf="!taked_picture">\n\n      <ion-label *ngIf="!platform.is(\'cordova\')">Add a picture</ion-label>\n      <ion-input type="file" *ngIf="!platform.is(\'cordova\')" (change)="takePicture($event)"></ion-input>\n\n      <button ion-button round outline icon-start text-center *ngIf="platform.is(\'cordova\')" (click)="takePicture()">\n        <ion-icon name="add"></ion-icon>\n        Add picture\n      </button>\n      <button ion-button round outline icon-start text-center *ngIf="platform.is(\'cordova\')" (click)="takeGallery()">\n        <ion-icon name="images"></ion-icon>\n        Take from gallery\n      </button>\n    </div>\n    <div text-center style="height: 100%;" *ngIf="taked_picture">\n      <img style="height: 100%;" [src]="taked_picture" />\n    </div>\n  </div>\n\n  <ion-list no-border>\n    <ion-list-header>\n      General information\n    </ion-list-header>\n    <ion-item>\n      <ion-input type="text" placeholder="Title" [(ngModel)]="title"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Type</ion-label>\n      <ion-select [(ngModel)]="type" submitText="Ok" cancelText="Cancel">\n        <ion-option value="beauty">Beauty</ion-option>\n        <ion-option value="it">IT</ion-option>\n        <ion-option value="fix">Fix</ion-option>\n        <ion-option value="food">Food</ion-option>\n        <ion-option value="tourism">Tourism</ion-option>\n        <ion-option value="other">Other</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-textarea name="description" placeholder="Description" [(ngModel)]="description" autosize></ion-textarea>\n    </ion-item>\n  </ion-list>\n  <ion-list>\n    <ion-list-header>\n      Details\n    </ion-list-header>\n    <ion-item>\n      <ion-input type="text" placeholder="Address" [(ngModel)]="address"></ion-input>\n    </ion-item>\n  </ion-list>\n  <ion-list>\n    <ion-list-header>\n      Payment\n    </ion-list-header>\n    <ion-item>\n      <ion-label>Price {{currency}}</ion-label>\n      <ion-input type="number" [(ngModel)]="price"></ion-input>\n    </ion-item>\n\n    <ion-list radio-group [(ngModel)]="isHourly" >\n      <ion-item>\n        <ion-label>Fixed price</ion-label>\n        <ion-radio value="false" checked="true"></ion-radio>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label>Hourly rate</ion-label>\n        <ion-radio value="true"></ion-radio>\n      </ion-item>\n    </ion-list>\n    <ion-list radio-group [(ngModel)]="isRemote" >\n      <ion-item>\n        <ion-label>Remote service</ion-label>\n        <ion-radio value="true" checked="true"></ion-radio>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label>Local service</ion-label>\n        <ion-radio value="false"></ion-radio>\n      </ion-item>\n    </ion-list>\n\n  </ion-list>\n\n  <ion-row>\n    <ion-col>\n    </ion-col>\n    <ion-col>\n      <button ion-button icon-start color="dark" left (click)="add()">\n        <ion-icon name="star"></ion-icon>\n        Publish\n      </button>\n    </ion-col>\n    <ion-col>\n    </ion-col>\n  </ion-row>\n\n\n\n</ion-content>\n'/*ion-inline-end:"D:\ivpay2\src\pages\addService\addService.html"*/,
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
        __WEBPACK_IMPORTED_MODULE_9__providers_ipfs_service__["a" /* IpfsService */],
        __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["c" /* DomSanitizer */]])
], AddServicePage);

//# sourceMappingURL=addService.js.map

/***/ })

});
//# sourceMappingURL=36.js.map