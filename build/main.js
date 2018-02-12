webpackJsonp([37],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_firebase__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArticleService = (function () {
    function ArticleService(afd, userService, firebase) {
        this.afd = afd;
        this.userService = userService;
        this.firebase = firebase;
    }
    ArticleService.prototype.saveArticle = function (article) {
        var _this = this;
        this.firebase.uploadToFirebaseData(article.taked_picture, "articles").then(function (value) {
            article.taked_picture = value.photo;
            _this.afd.list('/articles/').push(article);
        }).catch(function (err) {
            _this.makeFileIntoBlob(article.taked_picture).then(function (datablob) {
                _this.firebase.uploadToFirebaseFile(datablob, "articles").then(function (value) {
                    article.taked_picture = value.photo;
                    _this.afd.list('/articles/').push(article);
                });
            });
        });
    };
    ArticleService.prototype.updateArticle = function (articleId, article) {
        this.afd.object('/articles/' + articleId).update(article);
    };
    ArticleService.prototype.getMyArticles = function (uid) {
        return this.afd.list('/articles/', {
            query: {
                orderByChild: "uid",
                equalTo: uid
            }
        });
    };
    ArticleService.prototype.getArticles = function () {
        return this.afd.list('/articles/', {
            query: {
                orderByChild: "status",
                equalTo: "published"
            }
        });
    };
    ArticleService.prototype.getArticleFromId = function (id) {
        return this.afd.object('/articles/' + id + '/');
    };
    ArticleService.prototype.getArticleFromIdPublished = function (id) {
        return this.afd.object('/articles/' + id + '/');
    };
    ArticleService.prototype.getMyPurchases = function (uid) {
        return this.afd.list('/articles/', {
            query: {
                orderByChild: "buyeruid",
                equalTo: uid
            }
        });
    };
    ArticleService.prototype.deleteArticle = function (id) {
        this.afd.object('/articles/' + id + '/').remove().then();
    };
    ArticleService.prototype.saveInventory = function (article) {
        var _this = this;
        this.firebase.uploadToFirebaseData(article.taked_picture, "inventory").then(function (value) {
            article.taked_picture = value.photo;
            _this.afd.object('/users/' + _this.userService._userFirebase.uid + "/inventory/" + article.ean + '/').set(article);
        }).catch(function (err) {
            _this.makeFileIntoBlob(article.taked_picture).then(function (datablob) {
                _this.firebase.uploadToFirebaseFile(datablob, "inventory").then(function (value) {
                    article.taked_picture = value.photo;
                    _this.afd.object('/users/' + _this.userService._userFirebase.uid + "/inventory/" + article.ean + '/').set(article);
                });
            });
        });
    };
    ArticleService.prototype.getInventory = function (id) {
        return this.afd.object('/users/' + this.userService._userFirebase.uid + '/inventory/' + id + '/');
    };
    ArticleService.prototype.getInventoryWithUid = function (uid, id) {
        return this.afd.object('/users/' + uid + '/inventory/' + id + '/');
    };
    ArticleService.prototype.getInventories = function () {
        return this.afd.list('/users/' + this.userService._userFirebase.uid + '/inventory/');
    };
    ArticleService.prototype.deleteInventory = function (id) {
        this.afd.object('/users/' + this.userService._userFirebase.uid + '/inventory/' + id + '/').remove().then();
    };
    ArticleService.prototype.saveService = function (service) {
        var _this = this;
        this.firebase.uploadToFirebaseData(service.taked_picture, "services").then(function (value) {
            service.taked_picture = value.photo;
            _this.afd.list('/services/').push(service);
        }).catch(function (err) {
            _this.makeFileIntoBlob(service.taked_picture).then(function (datablob) {
                _this.firebase.uploadToFirebaseFile(datablob, "services").then(function (value) {
                    service.taked_picture = value.photo;
                    _this.afd.list('/services/').push(service);
                });
            });
        });
    };
    ArticleService.prototype.saveServiceOrder = function (id, service, comment, nbHourEstimate) {
        this.afd.list('/serviceorders/')
            .push({
            serviceId: id,
            comment: comment ? comment : '',
            nbHourEstimate: nbHourEstimate,
            status: "ordered",
            buyeruid: this.userService._userFirebase.uid,
            saleruid: service.uid
        });
    };
    ArticleService.prototype.updateServiceOrdered = function (serviceOrderedId, serviceOrdered) {
        delete serviceOrdered.service;
        this.afd.object('/serviceorders/' + serviceOrderedId).update(serviceOrdered);
    };
    ArticleService.prototype.getServiceFromId = function (id) {
        return this.afd.object('/services/' + id + '/');
    };
    ArticleService.prototype.getServices = function () {
        return this.afd.list('/services/');
    };
    ArticleService.prototype.getMyServices = function (uid) {
        return this.afd.list('/services/', {
            query: {
                orderByChild: "uid",
                equalTo: uid
            }
        });
    };
    ArticleService.prototype.getMyServiceOrders = function (uid) {
        return this.afd.list('/serviceorders/', {
            query: {
                orderByChild: "buyeruid",
                equalTo: uid
            }
        });
    };
    ArticleService.prototype.getServiceOrderId = function (id) {
        return this.afd.object('/serviceorders/' + id + '/');
    };
    ArticleService.prototype.getMyServiceSold = function (uid) {
        return this.afd.list('/serviceorders/', {
            query: {
                orderByChild: "saleruid",
                equalTo: uid
            }
        });
    };
    ArticleService.prototype.deleteService = function (id) {
        this.afd.object('/services/' + id + '/').remove().then();
    };
    ArticleService.prototype.makeFileIntoBlob = function (imagePath) {
        // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(imagePath, function (fileEntry) {
                fileEntry.file(function (resFile) {
                    //console.log("resFile : ", resFile);
                    //console.log("fileEntry : ", fileEntry);
                    //console.log("imagePath : "+imagePath);
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                        imgBlob.name = 'sample.jpg';
                        resolve(imgBlob);
                    };
                    reader.onerror = function (e) {
                        //console.log('Failed file read: ' + e.toString());
                        reject(e);
                    };
                    reader.readAsArrayBuffer(resFile);
                });
            });
        });
    };
    return ArticleService;
}());
ArticleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_3__firebase_firebase__["a" /* FirebaseProvider */]])
], ArticleService);

//# sourceMappingURL=article.service.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var WalletService = (function () {
    function WalletService(api, afd) {
        this.api = api;
        this.afd = afd;
        this.token = "4dcf9608e8ad4fd8bb3e5262b66d4cee";
        this.trigramAvailable = ['ETH', 'BTC'];
        this.walletCaract = {
            btc: { url: "btc/test3/addrs", rate: Math.pow(10, 8) },
            eth: { url: "beth/test/addrs", rate: Math.pow(10, 18) }
        };
        this.tokenUrl = "?token=" + this.token;
    }
    WalletService.prototype.createWallet = function (cryptoTrigram) {
        return this.api.post(this.walletCaract[cryptoTrigram.toLowerCase()].url + this.tokenUrl, {}).map(mapWallet);
    };
    WalletService.prototype.getBalanceWallets = function (fromAddress, trigram) {
        var _this = this;
        return this.api.get(this.walletCaract[trigram.toLowerCase()].url + "/" + fromAddress + "/balance" + this.tokenUrl, {}).map(function (data) { return data.json().balance / _this.walletCaract[trigram.toLowerCase()].rate; });
    };
    WalletService.prototype.saveWallets = function (wallets, uid) {
        //console.log(wallets);
        this.afd.object('/users/' + uid + "/wallets/").set(wallets);
    };
    WalletService.prototype.getWallets = function (uid) {
        return this.afd.object('/users/' + uid + '/wallets/');
    };
    return WalletService;
}());
WalletService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], WalletService);

function mapWallet(response) {
    var wallet = null;
    if (response.json().wif) {
        wallet = ({
            name: 'Bitcoin',
            trigram: 'BTC',
            address: response.json().address,
            public: response.json().public,
            private: response.json().private,
            amount: 0
        });
    }
    else {
        wallet = ({
            name: 'Ethereum',
            trigram: 'ETH',
            address: response.json().address,
            public: response.json().public,
            private: response.json().private,
            amount: 0
        });
    }
    return wallet;
}
//# sourceMappingURL=wallet.service.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LISTMENUHOME; });
/* unused harmony export LISTMENUCOMPONENT */
/* unused harmony export LISTMENULOGIN */
/* unused harmony export LISTMENUSLIDE */
/* unused harmony export LISTMENUFORM */
/* unused harmony export LISTMENUCRUD */
/* unused harmony export LISTMENUNATIVE */
/* unused harmony export LISTMENUMISCELLANEOUS */
/* unused harmony export LISTMENUPROFIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return PAGES1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PAGES2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//USED for Menu
//USED for Menu
var LISTMENUHOME = [
    { title: 'Dashboard v1', component: 'Homev1Page' }
];
// set our app's menu list component
var LISTMENUCOMPONENT = [
    { title: 'Action Sheets', component: 'ActionSheetsPage' },
    { title: 'Alert', component: 'AlertPage' },
    { title: 'FABs', component: 'FabPage' },
    { title: 'Segment', component: 'SegmentPage' },
    { title: 'Toast', component: 'ToastPage' },
    { title: 'Modals', component: 'ModalsPage' },
    { title: 'Popovers', component: 'PopoversPage' },
    { title: 'Searchbar', component: 'SearchbarPage' },
];
var LISTMENULOGIN = [
    { title: 'Login Instagram Style', component: 'LoginInstagramPage' },
    { title: 'Login with Image Background', component: 'LoginOnePage' },
    { title: 'Login with Slider Text', component: 'LoginSliderPage' },
    { title: 'Login with Video Background', component: 'LoginBackgroundVideoPage' },
    { title: 'Login with Slider Background', component: 'LoginBackgroundSliderPage' },
];
var LISTMENUSLIDE = [
    { title: 'Ionic Slide', component: 'SlidePage' },
    { title: 'Slide with Color Changing', component: 'SlideColorChangingPage' },
    { title: 'Slide with Free Mode', component: 'SlideFreeModePage' },
    { title: 'Multiple Slides', component: 'SliderListPage' },
    { title: 'Nested Slides', component: 'SlideNestedPage' },
    { title: 'Slide Transitions', component: 'SlideTransitionsPage' },
    { title: 'Slide Right to Left', component: 'SlideRightToLeftPage' },
    { title: 'Slide with Pagination Arrows', component: 'SliderWithArrowsPage' },
    { title: 'Slide Walkthrough', component: 'SlideWalkthroughPage' }
];
// set our app's menu list form
var LISTMENUFORM = [
    { title: 'Checkbox', component: 'CheckboxPage' },
    { title: 'Date Time', component: 'DatetimePage' },
    { title: 'Select', component: 'SelectPage' },
    { title: 'Radio', component: 'RadioPage' },
    { title: 'Toggle', component: 'TogglePage' },
    { title: 'Range', component: 'RangePage' },
];
var LISTMENUCRUD = [
    { title: 'CRUD HTTP (Notes)', component: 'CrudHttpListPage' },
    { title: 'CRUD Firebase (Notes)', component: 'CrudFirebaseListPage' },
    { title: 'CRUD Storage (Notes)', component: 'CrudStorageListPage' },
];
// set our app's menu list native
var LISTMENUNATIVE = [
    { title: 'Action Sheet', component: 'NativeActionSheetPage' },
    // { title: 'App Rate', component: NativeAppRatePage },
    { title: 'Camera', component: 'NativeCameraPage' },
    { title: 'Call Number', component: 'NativeCallNumberPage' },
    { title: 'Crop Image', component: 'NativeCropPage' },
    { title: 'Date Picker', component: 'NativeDatePickerPage' },
    { title: 'Email Composer', component: 'NativeEmailComposerPage' },
    { title: 'Geolocation', component: 'NativeGeolocationPage' },
    { title: 'Instagram', component: 'NativeInstagramPage' },
    { title: 'Launch Navigator', component: 'NativeLaunchNavigatorPage' },
    { title: 'Photo Library', component: 'NativePhotoLibraryPage' },
    { title: 'SMS', component: 'NativeSmsPage' },
    { title: 'Social Sharing', component: 'NativeSocialSharingPage' },
    { title: 'Youtube Player', component: 'NativeYoutubePlayerPage' },
];
var LISTMENUMISCELLANEOUS = [
    { title: 'Accordion', component: 'AccordionPage' },
    { title: 'Infinite Scroll', component: 'FeatureInfiniteScrollPage' },
    { title: 'Pull to Refresh', component: 'FeaturePullToRefreshPage' },
    { title: 'Google Map', component: 'FeatureGoogleMapPage' },
    { title: 'Autosizing Textarea', component: 'AutosizingTextarea' },
    { title: 'Blog Post', component: 'BlogPostPage' },
    { title: 'Countdown', component: 'CountdownPage' },
    { title: 'Flash Card', component: 'FlashCardPage' },
    { title: 'Pinterest Masonry Cards', component: 'MasonryCardsPage' },
    { title: 'Testimonials', component: 'TestimonialsPage' },
    { title: 'Timeline', component: 'TimelinePage' },
    { title: 'Tinder Cards', component: 'TinderCardsPage' }
];
var LISTMENUPROFIL = [
    { title: 'Profile Type 1', page: 'ProfileOnePage' },
    { title: 'Profile Type 2', page: 'ProfileThreePage' },
    { title: 'Profile Type 3', page: 'ProfileFourPage' },
    { title: 'Profile Setting', page: 'ProfileSettingsPage' },
];
//Main Menu1
var PAGES = [
    { icon: 'basket', title: 'My store', page: 'MyStorePage', active: false, },
    { icon: 'albums', title: 'My sales', page: 'MySalesPage', active: false, },
    { icon: 'albums', title: 'My purchases', page: 'PurchasePage', active: false, },
    { icon: 'swap', title: 'My transactions', page: 'TransactionPage', active: false, },
    { icon: 'book', title: 'My inventory', page: 'InventoryPage', active: false, },
    { icon: 'person', title: 'Profile', page: 'ProfileSettingsPage', active: false, },
    { icon: 'power', title: 'Sign out', page: 'LoginPage', active: false, }
];
var PAGES1 = [
    { icon: 'add-circle', title: 'Add service', page: 'AddServicePage', active: false, },
    { icon: 'pin', title: 'Nearby', page: 'StoreServicePage', active: false, },
];
var PAGES2 = [
    { icon: 'add-circle', title: 'Add item', page: 'AddPage', active: false, },
    { icon: 'pin', title: 'Nearby', page: 'StorePage', active: false, },
];

var AppState = (function () {
    function AppState() {
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this.clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype.clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    return AppState;
}());
AppState = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], AppState);

//# sourceMappingURL=global.setting.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseProvider = (function () {
    function FirebaseProvider(afd) {
        this.afd = afd;
        //console.log('Hello FirebaseProvider Provider');
    }
    FirebaseProvider.prototype.getNotesDB = function () {
        return this.afd.list('/notes/');
    };
    FirebaseProvider.prototype.saveNotesDB = function (datas) {
        if (datas.$key) {
            this.afd.list('/notes/').update(datas.$key, datas);
        }
        else {
            this.afd.list('/notes/').push(datas);
        }
    };
    FirebaseProvider.prototype.deleteNotesDB = function (id) {
        this.afd.list('/notes/').remove(id);
    };
    FirebaseProvider.prototype.uploadToFirebaseData = function (data, type) {
        // Create a uuid as filename
        var filename = uuidv4() + '.jpg';
        //console.log("filename: ", filename);
        return new Promise(function (resolve, reject) {
            // Upload file
            var doUpload = __WEBPACK_IMPORTED_MODULE_2_firebase__["storage"]().ref(type + "/" + filename).putString(data, 'data_url');
            //console.log("doUpload: ", doUpload);
            doUpload.on('state_changed', function (snapshot) {
                //console.log('snapshot progess ' + snapshot);
                //make progress
                // We could log the progress here IF necessary
                // console.log('snapshot progess ' + snapshot);
            }, function (error) {
                reject(error);
            }, function () {
                var imageData = {
                    photo: doUpload.snapshot.downloadURL,
                    photoName: filename
                };
                resolve(imageData);
            });
        });
    };
    FirebaseProvider.prototype.uploadToFirebaseFile = function (file, type) {
        // Create a uuid as filename
        var filename = uuidv4() + '.jpg';
        //console.log("filename: ", filename)
        return new Promise(function (resolve, reject) {
            // Upload file
            var doUpload = __WEBPACK_IMPORTED_MODULE_2_firebase__["storage"]().ref(type + "/" + filename).put(file);
            //console.log("doUpload: ", doUpload);
            doUpload.on('state_changed', function (snapshot) {
                //console.log('snapshot progess ' + snapshot);
                //make progress
                // We could log the progress here IF necessary
                // console.log('snapshot progess ' + snapshot);
            }, function (error) {
                reject(error);
            }, function () {
                var imageData = {
                    photo: doUpload.snapshot.downloadURL,
                    photoName: filename
                };
                resolve(imageData);
            });
        });
    };
    return FirebaseProvider;
}());
FirebaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], FirebaseProvider);

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = (function () {
    function Api(http) {
        this.http = http;
        this.url = 'https://api.blockcypher.com/v1';
    }
    Api.prototype.get = function (endpoint, params, options) {
        if (!options) {
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
        }
        // Support easy query params for GET requests
        if (params) {
            var p = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
            for (var k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    };
    Api.prototype.post = function (endpoint, body, options) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    };
    Api.prototype.put = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    Api.prototype.delete = function (endpoint, options) {
        return this.http.delete(this.url + '/' + endpoint, options);
    };
    Api.prototype.patch = function (endpoint, body, options) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    };
    return Api;
}());
Api = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], Api);

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the MapServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var MapServiceProvider = (function () {
    function MapServiceProvider(googleMaps) {
        this.googleMaps = googleMaps;
        this.markersArticle = [];
        this.markersService = [];
        this.markersFiat = [];
        //console.log('Hello MapServiceProvider Provider');
    }
    MapServiceProvider.prototype.setDiv = function (el, mapOptions) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.map && el != null) {
                _this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create(el, mapOptions);
                _this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function () {
                    resolve();
                });
            }
            else {
                _this.map.clear();
                _this.map.setDiv(el);
                resolve();
            }
        });
    };
    MapServiceProvider.prototype.hideArticles = function () {
        this.markersArticle.forEach(function (marker) { return marker.marker.setVisible(false); });
    };
    MapServiceProvider.prototype.displayArticles = function () {
        this.markersArticle.forEach(function (marker) { return marker.marker.setVisible(true); });
    };
    MapServiceProvider.prototype.hideServices = function () {
        this.markersService.forEach(function (marker) { return marker.setVisible(false); });
    };
    MapServiceProvider.prototype.displayServices = function () {
        this.markersService.forEach(function (marker) { return marker.setVisible(true); });
    };
    MapServiceProvider.prototype.hideFiats = function () {
        this.markersFiat.forEach(function (marker) { return marker.setVisible(false); });
    };
    MapServiceProvider.prototype.displayFiats = function () {
        this.markersFiat.forEach(function (marker) { return marker.setVisible(true); });
    };
    MapServiceProvider.prototype.findArticle = function (text1) {
        this.markersArticle.forEach(function (marker) {
            if (text1 && text1.trim() != '') {
                var text = text1.toLowerCase();
                if (marker.article.title.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else if (marker.article.type.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else if (marker.article.description.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else if (marker.article.brand.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else {
                    marker.marker.setVisible(false);
                }
            }
            else {
                marker.marker.setVisible(true);
            }
        });
    };
    MapServiceProvider.prototype.findService = function (text1) {
        this.markersService.forEach(function (marker) {
            if (text1 && text1.trim() != '') {
                var text = text1.toLowerCase();
                if (marker.service.title.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else if (marker.service.type.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else if (marker.service.description.toLowerCase().indexOf(text) >= 0) {
                    marker.marker.setVisible(true);
                }
                else {
                    marker.marker.setVisible(false);
                }
            }
            else {
                marker.marker.setVisible(true);
            }
        });
    };
    return MapServiceProvider;
}());
MapServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */]])
], MapServiceProvider);

//# sourceMappingURL=map.service.js.map

/***/ }),

/***/ 213:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 213;

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NATIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPONENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PIPES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant_variable__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_setting__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_firebase_firebase__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_crud_storage_crud_storage__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_util_toast_service__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_util_alert_service__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_crop__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_date_picker__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_library__ = __webpack_require__(781);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_push__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_autosize_autosize__ = __webpack_require__(782);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_invoke_directive_invokeDirective__ = __webpack_require__(783);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pipes_capitalize_pipe__ = __webpack_require__(784);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_barcode_scanner__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_google_maps__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_wallet_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_api__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angularfire2_auth__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_cryptocompare_service__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_request_service__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_transaction_service__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pipes_distance_pipe__ = __webpack_require__(785);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_message_service__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__agm_core__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_map_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_clipboard__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ionic2_rating__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_in_app_browser__ = __webpack_require__(373);
//Used for setting

//Used for Theming

//MODULE





//PROVIDER




//NATIVE


// import { NativeAppRatePage } from '../pages/native-app-rate/native-app-rate';







//DIRECTIVES


//COMPONENT
//PIPES


















//used for Firebase
var firebaseConfig = {
    apiKey: __WEBPACK_IMPORTED_MODULE_0__constant_variable__["a" /* ConstantVariable */].apiKey,
    authDomain: __WEBPACK_IMPORTED_MODULE_0__constant_variable__["a" /* ConstantVariable */].authDomain,
    databaseURL: __WEBPACK_IMPORTED_MODULE_0__constant_variable__["a" /* ConstantVariable */].databaseURL,
    projectId: __WEBPACK_IMPORTED_MODULE_0__constant_variable__["a" /* ConstantVariable */].projectId,
    storageBucket: __WEBPACK_IMPORTED_MODULE_0__constant_variable__["a" /* ConstantVariable */].storageBucket,
    messagingSenderId: __WEBPACK_IMPORTED_MODULE_0__constant_variable__["a" /* ConstantVariable */].messagingSenderId
};
var MODULES = [
    __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["a" /* BrowserModule */],
    __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
    __WEBPACK_IMPORTED_MODULE_27_angularfire2_auth__["b" /* AngularFireAuthModule */],
    __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["b" /* AngularFireDatabaseModule */],
    __WEBPACK_IMPORTED_MODULE_35__agm_core__["a" /* AgmCoreModule */].forRoot({
        apiKey: 'AIzaSyBWc6kOtjHwnrL3bTJWG5YklwyB8SxFm8A'
    }),
    __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
    __WEBPACK_IMPORTED_MODULE_38_ionic2_rating__["a" /* Ionic2RatingModule */],
    __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot()
];
var PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_10__providers_util_alert_service__["a" /* AlertService */],
    __WEBPACK_IMPORTED_MODULE_9__providers_util_toast_service__["a" /* ToastService */],
    __WEBPACK_IMPORTED_MODULE_7__providers_firebase_firebase__["a" /* FirebaseProvider */],
    __WEBPACK_IMPORTED_MODULE_8__providers_crud_storage_crud_storage__["a" /* CrudStorageProvider */],
    __WEBPACK_IMPORTED_MODULE_1__global_setting__["a" /* AppState */],
    __WEBPACK_IMPORTED_MODULE_25__providers_wallet_service__["a" /* WalletService */],
    __WEBPACK_IMPORTED_MODULE_31__providers_user_service__["a" /* UserService */],
    __WEBPACK_IMPORTED_MODULE_26__providers_api__["a" /* Api */],
    __WEBPACK_IMPORTED_MODULE_28__providers_cryptocompare_service__["a" /* CryptocompareService */],
    __WEBPACK_IMPORTED_MODULE_30__providers_transaction_service__["a" /* TransactionService */],
    __WEBPACK_IMPORTED_MODULE_29__providers_request_service__["a" /* RequestService */],
    __WEBPACK_IMPORTED_MODULE_32__providers_article_service__["a" /* ArticleService */],
    __WEBPACK_IMPORTED_MODULE_34__providers_message_service__["a" /* MessageService */],
    __WEBPACK_IMPORTED_MODULE_36__providers_map_service__["a" /* MapServiceProvider */],
    __WEBPACK_IMPORTED_MODULE_39__ionic_native_in_app_browser__["a" /* InAppBrowser */]
];
var NATIVES = [
    __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
    __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
    __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
    __WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__["a" /* CallNumber */],
    __WEBPACK_IMPORTED_MODULE_15__ionic_native_crop__["a" /* Crop */],
    __WEBPACK_IMPORTED_MODULE_16__ionic_native_date_picker__["a" /* DatePicker */],
    __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */],
    __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_library__["a" /* PhotoLibrary */],
    __WEBPACK_IMPORTED_MODULE_19__ionic_native_push__["a" /* Push */],
    __WEBPACK_IMPORTED_MODULE_23__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
    __WEBPACK_IMPORTED_MODULE_24__ionic_native_google_maps__["a" /* GoogleMaps */],
    __WEBPACK_IMPORTED_MODULE_37__ionic_native_clipboard__["a" /* Clipboard */]
];
var COMPONENTS = [];
var DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_20__components_autosize_autosize__["a" /* Autosize */],
    __WEBPACK_IMPORTED_MODULE_21__components_invoke_directive_invokeDirective__["a" /* InvokeDirective */]
];
var PIPES = [
    __WEBPACK_IMPORTED_MODULE_22__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
    __WEBPACK_IMPORTED_MODULE_33__pipes_distance_pipe__["a" /* DistancePipe */]
];
//# sourceMappingURL=app.imports.js.map

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add/add.module": [
		787,
		35
	],
	"../pages/addService/addService.module": [
		788,
		36
	],
	"../pages/article/article.module": [
		789,
		34
	],
	"../pages/article/modalpopup/modal-article-action.module": [
		790,
		33
	],
	"../pages/article/modalqrcoderequest/modal-article-qrcode.module": [
		791,
		7
	],
	"../pages/auth/login.module": [
		792,
		32
	],
	"../pages/auth/login/firebase-login.module": [
		793,
		31
	],
	"../pages/auth/register/register.module": [
		794,
		30
	],
	"../pages/discussions/discussions.module": [
		795,
		29
	],
	"../pages/fiat/fiat.module": [
		796,
		6
	],
	"../pages/home/home.module": [
		797,
		28
	],
	"../pages/home/homev1/homev1.module": [
		798,
		27
	],
	"../pages/home/homev2/homev2.module": [
		799,
		26
	],
	"../pages/inventory/inventory.module": [
		800,
		25
	],
	"../pages/ivpay/ivpay.module": [
		801,
		24
	],
	"../pages/messages/messages.module": [
		802,
		9
	],
	"../pages/mystore/mystore.module": [
		803,
		23
	],
	"../pages/pay/pay.module": [
		804,
		5
	],
	"../pages/profile/profile-settings.module": [
		805,
		22
	],
	"../pages/purchase/purchase.module": [
		806,
		21
	],
	"../pages/request/request.module": [
		807,
		4
	],
	"../pages/sales/mysales.module": [
		808,
		20
	],
	"../pages/scan/scan.module": [
		809,
		3
	],
	"../pages/service/modalpopup/modal-service-action.module": [
		811,
		19
	],
	"../pages/service/modalqrcoderequest/modal-service-qrcode.module": [
		812,
		2
	],
	"../pages/service/service.module": [
		810,
		18
	],
	"../pages/side-menu/side-menu.module": [
		813,
		17
	],
	"../pages/store/store.module": [
		814,
		15
	],
	"../pages/storeService/storeService.module": [
		815,
		16
	],
	"../pages/tabs/tabs.module": [
		816,
		14
	],
	"../pages/theming/theming.module": [
		817,
		13
	],
	"../pages/transaction/transaction.module": [
		818,
		12
	],
	"../pages/transfer/transfer.module": [
		819,
		11
	],
	"../pages/wallet-action/action-wallet.module": [
		821,
		1
	],
	"../pages/wallet-action/modalpopup/modal-wallet-action.module": [
		822,
		8
	],
	"../pages/wallet-detail/wallet-detail.module": [
		823,
		10
	],
	"../pages/wallet/wallet.module": [
		820,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 267;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptocompareService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CryptocompareService = (function () {
    function CryptocompareService(http) {
        var _this = this;
        this.http = http;
        this.url = 'https://min-api.cryptocompare.com/data/price?';
        this.currencies = {};
        this.cryptos = ['USD', 'EUR'];
        var _loop_1 = function (crypto_1) {
            this_1.http.get(this_1.url + 'fsym=' + crypto_1 + '&tsyms=' + this_1.cryptos.toString())
                .subscribe(function (data) {
                _this.currencies[crypto_1] = data.json();
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.cryptos; _i < _a.length; _i++) {
            var crypto_1 = _a[_i];
            _loop_1(crypto_1);
        }
    }
    CryptocompareService.prototype.getAllRate = function () {
        return this.currencies;
    };
    CryptocompareService.prototype.getRateCrypto = function (crypto) {
        return this.http.get(this.url + 'fsym=' + crypto.toUpperCase()
            + '&tsyms=' + this.cryptos.toString()).map(function (res) { return res.json(); });
    };
    CryptocompareService.prototype.convert = function (cryptoFrom, cryptoTo, amount) {
        return this.currencies[cryptoFrom.toUpperCase()][cryptoTo.toUpperCase()] * amount;
    };
    return CryptocompareService;
}());
CryptocompareService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
], CryptocompareService);

//# sourceMappingURL=cryptocompare.service.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_service__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RequestService = (function () {
    function RequestService(articleService, toastCtrl, walletService, modalCtrl, userService) {
        this.articleService = articleService;
        this.toastCtrl = toastCtrl;
        this.walletService = walletService;
        this.modalCtrl = modalCtrl;
        this.userService = userService;
        this.key = 'vfd54788efz5fg15er((efeg15eegr15';
    }
    RequestService.prototype.generateRequest = function (type, content) {
        var request = {};
        request['type'] = type;
        request['content'] = content;
        var encrypted = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].encrypt(JSON.stringify(request), this.key);
        var encryptedmessage = 'neoplace' + encrypted.toString();
        return encryptedmessage;
    };
    RequestService.prototype.processRequest = function (requestContent) {
        var _this = this;
        var content = requestContent.replace('neoplace', '');
        var decrypted = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].decrypt(content, this.key);
        var c = decrypted.toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Utf8);
        var request = JSON.parse(c);
        if (request.type) {
            switch (request.type) {
                case "pay": {
                    var wallets = this.walletService.wallets;
                    var modal = this.modalCtrl.create('ModalWalletAction', {
                        wallet: { trigram: request.content.trigram.toLowerCase(), address: wallets[request.content.trigram.toLowerCase()].address, private: wallets[request.content.trigram.toLowerCase()].private },
                        amount: request.content.amount,
                        address: request.content.fromAddress
                    });
                    modal.present();
                    break;
                }
                case "pay-fiat": {
                    var wallets = this.walletService.wallets;
                    var modal = this.modalCtrl.create('ModalWalletAction', {
                        wallet: { trigram: request.content.trigram.toLowerCase(), address: wallets[request.content.trigram.toLowerCase()].address, private: wallets[request.content.trigram.toLowerCase()].private },
                        amount: request.content.amount,
                        address: request.content.fromAddress,
                        fiat: true,
                        amountFiat: request.content.amountFiat,
                        currency: request.content.currency
                    });
                    modal.present();
                    break;
                }
                case "pay-article": {
                    //TODO change trigram, ask which trigram
                    var isPass_1 = false;
                    this.articleService.getArticleFromIdPublished(request.content.id).subscribe(function (article) {
                        if (!isPass_1) {
                            if (article) {
                                var wallets = _this.walletService.wallets;
                                var crypto_1 = _this.userService._profil.paymentMethod.toUpperCase();
                                var modal = _this.modalCtrl.create('ModalArticleAction', {
                                    wallet: { trigram: crypto_1, address: wallets[crypto_1.toLowerCase()].address, private: wallets[crypto_1.toLowerCase()].private },
                                    trigram: crypto_1,
                                    article: article,
                                    id: request.content.id
                                });
                                modal.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Error transaction',
                                    duration: 2000,
                                    position: 'bottom'
                                });
                                toast.present(toast);
                            }
                            isPass_1 = true;
                        }
                    });
                    break;
                }
                case "pay-inventory": {
                    //TODO change trigram, ask which trigram
                    var isPass_2 = false;
                    this.articleService.getInventoryWithUid(request.content.uid, request.content.id).subscribe(function (article) {
                        if (!isPass_2) {
                            if (article) {
                                var wallets = _this.walletService.wallets;
                                var crypto_2 = _this.userService._profil.paymentMethod.toUpperCase();
                                var modal = _this.modalCtrl.create('ModalArticleAction', {
                                    wallet: { trigram: crypto_2, address: wallets[crypto_2.toLowerCase()].address, private: wallets[crypto_2.toLowerCase()].private },
                                    trigram: crypto_2,
                                    article: article,
                                    id: request.content.id,
                                    isInventory: true
                                });
                                modal.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Error transaction',
                                    duration: 2000,
                                    position: 'bottom'
                                });
                                toast.present(toast);
                            }
                            isPass_2 = true;
                        }
                    });
                    break;
                }
                case "pay-service": {
                    //TODO change trigram, ask which trigram
                    var isPass_3 = false;
                    this.articleService.getServiceOrderId(request.content.id).subscribe(function (service) {
                        if (!isPass_3) {
                            if (service) {
                                var wallets = _this.walletService.wallets;
                                var crypto_3 = _this.userService._profil.paymentMethod.toUpperCase();
                                var modal = _this.modalCtrl.create('ModalServiceAction', {
                                    wallet: { trigram: crypto_3, address: wallets[crypto_3.toLowerCase()].address, private: wallets[crypto_3.toLowerCase()].private },
                                    trigram: crypto_3,
                                    serviceOrdered: service,
                                    id: request.content.id
                                });
                                modal.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Error transaction',
                                    duration: 2000,
                                    position: 'bottom'
                                });
                                toast.present(toast);
                            }
                            isPass_3 = true;
                        }
                    });
                    break;
                }
                case "order-service": {
                    //TODO change trigram, ask which trigram
                    var isPass_4 = false;
                    this.articleService.getServiceFromId(request.content.id).subscribe(function (service) {
                        if (!isPass_4) {
                            if (service) {
                                var wallets = _this.walletService.wallets;
                                var crypto_4 = _this.userService._profil.paymentMethod.toUpperCase();
                                var modal = _this.modalCtrl.create('ModalServiceAction', {
                                    wallet: { trigram: crypto_4, address: wallets[crypto_4.toLowerCase()].address, private: wallets[crypto_4.toLowerCase()].private },
                                    trigram: crypto_4,
                                    service: service,
                                    id: request.content.id
                                });
                                modal.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: 'Error transaction',
                                    duration: 2000,
                                    position: 'bottom'
                                });
                                toast.present(toast);
                            }
                            isPass_4 = true;
                        }
                    });
                    break;
                }
            }
        }
    };
    return RequestService;
}());
RequestService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2__wallet_service__["a" /* WalletService */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_5__user_service__["a" /* UserService */]])
], RequestService);

//# sourceMappingURL=request.service.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__article_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_bigi__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_buffer__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TransactionService = (function () {
    function TransactionService(toastCtrl, api, userService, articleService, afd, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.api = api;
        this.userService = userService;
        this.articleService = articleService;
        this.afd = afd;
        this.alertCtrl = alertCtrl;
        this.token = "4dcf9608e8ad4fd8bb3e5262b66d4cee";
        this.walletCaract = {
            btc: { url: "btc/test3", rate: Math.pow(10, 8) },
            eth: { url: "beth/test", rate: Math.pow(10, 18) }
        };
        this.tokenUrl = "?token=" + this.token;
    }
    TransactionService.prototype.sendCrypto = function (trigram, amount, wallet, toAddress, password) {
        var _this = this;
        amount = Math.round(amount * this.walletCaract[trigram.toLowerCase()].rate);
        //console.log(wallet);
        //console.log(password);
        try {
            var decrypted = __WEBPACK_IMPORTED_MODULE_6_crypto_js__["AES"].decrypt(wallet.private, password);
            var key = decrypted.toString(__WEBPACK_IMPORTED_MODULE_6_crypto_js__["enc"].Utf8);
            var keys = new __WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib__["ECPair"](__WEBPACK_IMPORTED_MODULE_8_bigi__["fromHex"](key));
        }
        catch (e) {
            return __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].throw(new EvalError('Your password is not correct'));
        }
        var request = this.api.post(this.walletCaract[trigram.toLowerCase()].url + "/txs/new" + this.tokenUrl, JSON.stringify({
            inputs: [{ addresses: [wallet.address] }],
            "outputs": [{ "addresses": [toAddress], "value": amount }]
        }));
        var self = this;
        request
            .subscribe(function (response) {
            var content = response.json();
            content.signatures = [];
            content.pubkeys = [];
            for (var _i = 0, _a = content.tosign; _i < _a.length; _i++) {
                var s = _a[_i];
                content.signatures.push(keys.sign(new __WEBPACK_IMPORTED_MODULE_9_buffer__["Buffer"](s, "hex")).toDER().toString("hex"));
                content.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
            }
            self.api.post(_this.walletCaract[trigram.toLowerCase()].url + "/txs/send" + _this.tokenUrl, JSON.stringify(content)).subscribe(function (response1) {
            });
        });
        return request;
    };
    TransactionService.prototype.send = function (trigram, wallet, toAddress, amount, password, label) {
        var _this = this;
        this.sendCrypto(trigram, amount, wallet, toAddress, password)
            .subscribe(function (res) {
            _this.saveTransaction(({
                cryptoTrigram: trigram,
                walletFrom: wallet.address,
                walletTo: toAddress,
                amount: amount,
                date: Date.now(),
                label: label
            }));
            var toast = _this.toastCtrl.create({
                message: 'Transaction send',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        }, function (error) {
            var message = "Not enough funds to complete your transaction";
            if (error instanceof EvalError) {
                message = "Your password is not correct, please re-enter your password";
            }
            var alert = _this.alertCtrl.create({
                title: 'Error !',
                subTitle: message,
                buttons: ['Close']
            });
            alert.present();
        });
    };
    TransactionService.prototype.getFiat = function (trigram, wallet, toAddress, amount, password, label, currency) {
        var _this = this;
        this.sendCrypto(trigram, amount, wallet, toAddress, password)
            .subscribe(function (res) {
            _this.saveTransaction(({
                cryptoTrigram: trigram,
                walletFrom: wallet.address,
                walletTo: toAddress,
                amount: amount,
                date: Date.now(),
                label: label,
                fiat: true,
                currency: currency
            }));
            var toast = _this.toastCtrl.create({
                message: 'Transaction send',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        }, function (error) {
            var message = "Not enough funds to complete your transaction";
            if (error instanceof EvalError) {
                message = "Your password is not correct, please re-enter your password";
            }
            var alert = _this.alertCtrl.create({
                title: 'Error !',
                subTitle: message,
                buttons: ['Close']
            });
            alert.present();
        });
    };
    TransactionService.prototype.payArticle = function (trigram, wallet, toAddress, amount, password, label, article, articleId) {
        var _this = this;
        //console.log("pay article", amount);
        this.sendCrypto(trigram, amount, wallet, toAddress, password)
            .subscribe(function (res) {
            _this.saveTransaction(({
                cryptoTrigram: trigram,
                walletFrom: wallet.address,
                walletTo: toAddress,
                amount: amount,
                date: Date.now(),
                label: label,
                articleId: articleId
            }));
            article.status = "sold";
            article.buyeruid = _this.userService._userFirebase.uid;
            _this.articleService.updateArticle(articleId, article);
            var toast = _this.toastCtrl.create({
                message: 'Transaction saved and funds locked in Smart contract.\nConfirm the reception once the item received to unlock funds',
                duration: 5000,
                position: 'bottom'
            });
            toast.present(toast);
        }, function (error) {
            var message = "Not enough funds to complete your transaction";
            if (error instanceof EvalError) {
                message = "Your password is not correct, please re-enter your password";
            }
            var alert = _this.alertCtrl.create({
                title: 'Error !',
                subTitle: message,
                buttons: ['Close']
            });
            alert.present();
        });
    };
    TransactionService.prototype.payInventory = function (trigram, wallet, toAddress, amount, password, label, article) {
        var _this = this;
        this.sendCrypto(trigram, amount, wallet, toAddress, password)
            .subscribe(function (res) {
            _this.saveTransaction(({
                cryptoTrigram: trigram,
                walletFrom: wallet.address,
                walletTo: toAddress,
                amount: amount,
                date: Date.now(),
                label: label,
                inventory: { uid: article.uid, id: article.ean }
            }));
            var toast = _this.toastCtrl.create({
                message: 'Article paid',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        }, function (error) {
            var message = "Not enough funds to complete your transaction";
            if (error instanceof EvalError) {
                message = "Your password is not correct, please re-enter your password";
            }
            var alert = _this.alertCtrl.create({
                title: 'Error !',
                subTitle: message,
                buttons: ['Close']
            });
            alert.present();
        });
    };
    TransactionService.prototype.payService = function (trigram, wallet, toAddress, amount, password, label, service, serviceOrdered) {
        var _this = this;
        this.sendCrypto(trigram, amount, wallet, toAddress, password)
            .subscribe(function (res) {
            _this.saveTransaction(({
                cryptoTrigram: trigram,
                walletFrom: wallet.address,
                walletTo: toAddress,
                amount: amount,
                date: Date.now(),
                label: label,
                service: { uid: service.uid, id: service.id }
            }));
            serviceOrdered.status = "paid";
            _this.articleService.updateServiceOrdered(serviceOrdered.$key, serviceOrdered);
            var toast = _this.toastCtrl.create({
                message: 'Service paid',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        }, function (error) {
            var message = "Not enough funds to complete your transaction";
            if (error instanceof EvalError) {
                message = "Your password is not correct, please re-enter your password";
            }
            var alert = _this.alertCtrl.create({
                title: 'Error !',
                subTitle: message,
                buttons: ['Close']
            });
            alert.present();
        });
    };
    TransactionService.prototype.saveTransaction = function (transaction) {
        this.afd.list('/transactions/').push(transaction);
    };
    TransactionService.prototype.getMyTransactions = function (address) {
        return this.afd.list('/transactions/', {
            query: {
                orderByChild: "walletFrom",
                equalTo: address
            }
        });
    };
    TransactionService.prototype.getOtherTransaction = function (address) {
        return this.afd.list('/transactions/', {
            query: {
                orderByChild: "walletTo",
                equalTo: address
            }
        });
    };
    TransactionService.prototype.getWalletTransaction = function (trigram, address) {
        return this.api.get(this.walletCaract[trigram.toLowerCase()].url + "/addrs/" + address, {}).map(function (response) { return response.json().txrefs; });
    };
    return TransactionService;
}());
TransactionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1__api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], TransactionService);

//# sourceMappingURL=transaction.service.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageService = (function () {
    function MessageService(afd) {
        this.afd = afd;
    }
    MessageService.prototype.getDiscussions = function (uid) {
        return this.afd.list('/discussions/' + uid);
    };
    MessageService.prototype.saveDiscussions = function (uidFrom, uidTo) {
        var alphaArray = [uidFrom, uidTo];
        var sortedArray = alphaArray.sort();
        this.afd.object('/discussions/' + uidFrom + "/" + sortedArray[0] + "-" + sortedArray[1]).set(true);
        this.afd.object('/discussions/' + uidTo + "/" + sortedArray[0] + "-" + sortedArray[1]).set(true);
    };
    MessageService.prototype.saveMessage = function (uidFrom, uidTo, message) {
        var alphaArray = [uidFrom, uidTo];
        var sortedArray = alphaArray.sort();
        var messageObject = {
            from: uidFrom,
            to: uidTo,
            date: Date.now(),
            message: message
        };
        this.saveDiscussions(uidFrom, uidTo);
        return this.afd.list('/messages/' + sortedArray[0] + "-" + sortedArray[1]).push(messageObject);
    };
    MessageService.prototype.getMessages = function (discussionId) {
        return this.afd.list('/messages/' + discussionId);
    };
    return MessageService;
}());
MessageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], MessageService);

//# sourceMappingURL=message.service.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_21" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_module__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_imports__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

 //enableProdMode : make development faster



// this is the magic wand
Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_21" /* enableProdMode */])();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__app_imports__["c" /* MODULES */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add/add.module#AddModule', name: 'AddPage', segment: 'add', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/addService/addService.module#AddServiceModule', name: 'AddServicePage', segment: 'addService', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/article/article.module#ArticlePageModule', name: 'ArticlePage', segment: 'article', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/article/modalpopup/modal-article-action.module#ModalArticleActionModule', name: 'ModalArticleAction', segment: 'modal-article-action', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/article/modalqrcoderequest/modal-article-qrcode.module#ModalArticleQrcodeModule', name: 'ModalArticleQrcode', segment: 'modal-article-qrcode', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/auth/login.module#LoginSliderPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/auth/login/firebase-login.module#FirebaseLoginPageModule', name: 'FirebaseLoginPage', segment: 'firebase-login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/auth/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/discussions/discussions.module#WalletPageModule', name: 'DiscussionsPage', segment: 'discussions', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/fiat/fiat.module#PayPageModule', name: 'FiatPage', segment: 'fiat', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/home.module#HomeListPageModule', name: 'HomeListPage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/homev1/homev1.module#LoginListPageModule', name: 'Homev1Page', segment: 'homev1', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/homev2/homev2.module#HomePageModule', name: 'Homev2Page', segment: 'homev2', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/inventory/inventory.module#InventoryModule', name: 'InventoryPage', segment: 'inventory', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/ivpay/ivpay.module#LoginListPageModule', name: 'IvpayPage', segment: 'ivpay', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/messages/messages.module#WalletPageModule', name: 'MessagesPage', segment: 'messages', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mystore/mystore.module#MyStorePageModule', name: 'MyStorePage', segment: 'mystore', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/pay/pay.module#PayPageModule', name: 'PayPage', segment: 'pay', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile-settings.module#ProfileSettingsPageModule', name: 'ProfileSettingsPage', segment: 'profile-settings', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/purchase/purchase.module#PurchaseModule', name: 'PurchasePage', segment: 'purchase', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/request/request.module#PayPageModule', name: 'RequestPage', segment: 'request', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/sales/mysales.module#MyStorePageModule', name: 'MySalesPage', segment: 'mysales', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/scan/scan.module#ScanPageModule', name: 'ScanPage', segment: 'scan', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/service/service.module#ServicePageModule', name: 'ServicePage', segment: 'service', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/service/modalpopup/modal-service-action.module#ModalServiceActionModule', name: 'ModalServiceAction', segment: 'modal-service-action', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/service/modalqrcoderequest/modal-service-qrcode.module#ModalServiceQrcodeModule', name: 'ModalServiceQrcode', segment: 'modal-service-qrcode', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/side-menu/side-menu.module#SideMenuPageModule', name: 'SideMenuPage', segment: 'side-menu', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/store/store.module#MasonryCardsPageModule', name: 'StorePage', segment: 'store', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/storeService/storeService.module#StoreServiceModule', name: 'StoreServicePage', segment: 'storeService', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/theming/theming.module#ThemingPageModule', name: 'ThemingPage', segment: 'theming', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/transaction/transaction.module#WalletDetailPageModule', name: 'TransactionPage', segment: 'transaction', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/transfer/transfer.module#SearchbarPageModule', name: 'TransferPage', segment: 'transfer', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/wallet/wallet.module#WalletPageModule', name: 'WalletPage', segment: 'wallet', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/wallet-action/action-wallet.module#WalletPageModule', name: 'ActionWalletPage', segment: 'action-wallet', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/wallet-action/modalpopup/modal-wallet-action.module#ModalWalletActionModule', name: 'ModalWalletAction', segment: 'modal-wallet-action', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/wallet-detail/wallet-detail.module#WalletDetailPageModule', name: 'WalletDetailPage', segment: 'wallet-detail', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_0__shared_module__["a" /* SharedModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
        ],
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_4__app_imports__["f" /* PROVIDERS */],
            __WEBPACK_IMPORTED_MODULE_4__app_imports__["d" /* NATIVES */],
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_imports__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__app_imports__["e" /* PIPES */],
            __WEBPACK_IMPORTED_MODULE_0__app_imports__["b" /* DIRECTIVES */],
            __WEBPACK_IMPORTED_MODULE_0__app_imports__["a" /* COMPONENTS */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__app_imports__["e" /* PIPES */],
            __WEBPACK_IMPORTED_MODULE_0__app_imports__["a" /* COMPONENTS */],
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConstantVariable; });
var ConstantVariable = {
    //URL API
    APIURL: "xxxxxxxxxxxxxxxxx",
    //firebaseConfig
    apiKey: "AIzaSyBWc6kOtjHwnrL3bTJWG5YklwyB8SxFm8A",
    authDomain: "ivpay-1bdc9.firebaseapp.com",
    databaseURL: "https://ivpay-1bdc9.firebaseio.com",
    projectId: "ivpay-1bdc9",
    storageBucket: "ivpay-1bdc9.appspot.com",
    messagingSenderId: "331795056070"
};
//# sourceMappingURL=constant-variable.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrudStorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CrudStorageProvider = (function () {
    function CrudStorageProvider(storage) {
        this.storage = storage;
        //console.log('Hello CrudStorageProvider Provider');
        this.datas = null;
    }
    CrudStorageProvider.prototype.getNotesDB = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('notes')
                .then(function (data) {
                //console.log(data);
                _this.datas = JSON.parse(data);
                //console.log(this.datas);
                resolve(_this.datas);
            });
        });
    };
    CrudStorageProvider.prototype.saveNotesDB = function (datas) {
        this.storage.set('notes', JSON.stringify(datas))
            .then(function (data) {
            //console.log("save success. Data : ", data);
        });
    };
    CrudStorageProvider.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('ivpay.token')
                .then(function (data) {
                //console.log(data);
                resolve(data);
            });
        });
    };
    CrudStorageProvider.prototype.setToken = function (token) {
        this.storage.set('ivpay.token', token)
            .then(function (data) {
            //console.log("save success. token : ", data);
        });
    };
    CrudStorageProvider.prototype.setWalletAddress = function (trigram, address) {
        this.storage.set('ivpay.' + trigram.toLowerCase(), address)
            .then(function (data) {
            //console.log("save success. wallet : ", data);
        });
    };
    CrudStorageProvider.prototype.getWalletAddress = function (trigram) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get('ivpay.' + trigram.toLowerCase())
                .then(function (data) {
                //console.log(data);
                resolve(data);
            });
        });
    };
    return CrudStorageProvider;
}());
CrudStorageProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], CrudStorageProvider);

//# sourceMappingURL=crud-storage.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastService; });
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


var ToastService = (function () {
    function ToastService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToastService.prototype.create = function (message, ok, duration) {
        if (ok === void 0) { ok = false; }
        if (duration === void 0) { duration = 2000; }
        if (this.toast) {
            this.toast.dismiss();
        }
        this.toast = this.toastCtrl.create({
            message: message,
            duration: ok ? null : duration,
            position: 'bottom',
            showCloseButton: ok,
            closeButtonText: 'OK'
        });
        this.toast.present();
    };
    return ToastService;
}());
ToastService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ToastController */]])
], ToastService);

//# sourceMappingURL=toast.service.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wallet_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global_setting__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__firebase_firebase__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UserService = (function () {
    function UserService(alertCtrl, walletService, afd, afAuth, global, firebase) {
        this.alertCtrl = alertCtrl;
        this.walletService = walletService;
        this.afd = afd;
        this.afAuth = afAuth;
        this.global = global;
        this.firebase = firebase;
    }
    UserService.prototype.login = function (accountInfo) {
        var _this = this;
        var seq = this.afAuth.auth.signInWithEmailAndPassword(accountInfo.username, accountInfo.password);
        seq.then(function (auth) {
            if (auth) {
                _this._userFirebase = auth;
                _this._user = ({
                    username: _this._userFirebase.email
                });
                auth.getIdToken().then(function (token) { return _this._user.token = "Bearer " + token; });
                // this.getProfil(auth.uid).subscribe(p => {
                // this._profil = p;
                // this.global.set('profil', p)});
                _this.walletService.getWallets(auth.uid).subscribe(function (w) { return _this.walletService.wallets = w; });
            }
        }).catch(function (err) {
        });
        return seq;
    };
    UserService.prototype.signup = function (accountInfo) {
        var _this = this;
        var seq = this.afAuth.auth.createUserWithEmailAndPassword(accountInfo.username, accountInfo.password);
        seq.then(function (userFire) {
            _this._userFirebase = userFire;
            var obs = [];
            //call backend wallet creation
            for (var _i = 0, _a = _this.walletService.trigramAvailable; _i < _a.length; _i++) {
                var trigram = _a[_i];
                obs.push(_this.walletService.createWallet(trigram));
            }
            //wait to receive all response
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].forkJoin(obs).subscribe(function (wallets) {
                var i = 0;
                var contentWallets = {};
                for (var _i = 0, _a = _this.walletService.trigramAvailable; _i < _a.length; _i++) {
                    var trigram = _a[_i];
                    contentWallets[trigram.toLowerCase()] = {};
                    contentWallets[trigram.toLowerCase()]['address'] = wallets[i]['address'];
                    contentWallets[trigram.toLowerCase()]['public'] = wallets[i]['public'];
                    contentWallets[trigram.toLowerCase()]['private'] = __WEBPACK_IMPORTED_MODULE_9_crypto_js__["AES"].encrypt(wallets[i]['private'], accountInfo.password).toString(); //to encrypt
                    i++;
                }
                _this.walletService.saveWallets(contentWallets, userFire.uid);
                _this.walletService.wallets = contentWallets;
            });
        }).catch(function (err) {
        });
        return seq;
    };
    UserService.prototype.checkAuthentication = function () {
        var _this = this;
        var seq = this.afAuth.authState;
        seq.subscribe(function (auth) {
            if (auth) {
                _this._userFirebase = auth;
                _this._user = ({
                    username: _this._userFirebase.email
                });
                auth.getToken().then(function (token) { return _this._user.token = "Bearer " + token; });
                // this.getProfil(auth.uid).subscribe(p =>{
                //   this._profil = p;
                //   this.global.set('profil', p);
                // });
                _this.walletService.getWallets(auth.uid).subscribe(function (w) { return _this.walletService.wallets = w; });
            }
        });
        return seq;
    };
    /**
     * Log the user out, which forgets the session
     */
    UserService.prototype.logout = function () {
        var _this = this;
        //console.log("ici");
        this._user = null;
        this._userFirebase = null;
        this._profil = null;
        this.afAuth.auth.signOut().then(function (resp) {
            var alert1 = _this.alertCtrl.create({
                title: 'Disconnected',
                subTitle: 'You have been sucessfully log out',
                buttons: ['Close']
            });
            alert1.present();
        });
    };
    UserService.prototype.saveProfil = function (profil) {
        var _this = this;
        delete profil.$value;
        if (profil.imaUrl && profil.imageUrl.indexOf("http") == -1) {
            this.firebase.uploadToFirebaseData(profil.imageUrl, "profil").then(function (value) {
                profil.imaUrl = value.photo;
                _this.afd.object('/users/' + _this._userFirebase.uid + "/profil/").set(profil);
                _this.afd.object('/pseudos/' + profil.pseudo).set(_this._userFirebase.uid);
            });
        }
        else {
            this.afd.object('/users/' + this._userFirebase.uid + "/profil/").set(profil);
            this.afd.object('/pseudos/' + profil.pseudo).set(this._userFirebase.uid);
        }
    };
    UserService.prototype.getProfil = function (uid) {
        return this.afd.object('/users/' + uid + '/profil/');
    };
    UserService.prototype.getUidFromPseudo = function (pseudo) {
        return this.afd.object('/pseudos/' + pseudo);
    };
    UserService.prototype.saveProfilPosition = function (lat, lng) {
        this.afd.object('/positions/' + this._userFirebase.uid).set({ lat: lat, lng: lng });
    };
    UserService.prototype.deleteProfilPosition = function () {
        this.afd.object('/positions/' + this._userFirebase.uid).remove().then();
    };
    UserService.prototype.getPositions = function () {
        return this.afd.list('/positions/');
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__wallet_service__["a" /* WalletService */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
        __WEBPACK_IMPORTED_MODULE_8__app_global_setting__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_10__firebase_firebase__["a" /* FirebaseProvider */]])
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
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


var AlertService = (function () {
    function AlertService(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    AlertService.prototype.presentAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        return alert.present();
    };
    AlertService.prototype.presentErrorAlert = function (message) {
        return this.presentAlert('An error has occurred.', message);
    };
    AlertService.prototype.presentAlertWithCallback = function (title, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var confirm = _this.alertCtrl.create({
                title: title,
                message: message,
                buttons: [{
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            confirm.dismiss().then(function () { return resolve(false); });
                            return false;
                        }
                    }, {
                        text: 'Yes',
                        handler: function () {
                            confirm.dismiss().then(function () { return resolve(true); });
                            return false;
                        }
                    }]
            });
            return confirm.present();
        });
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], AlertService);

//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autosize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Autosize = (function () {
    function Autosize(element) {
        this.element = element;
    }
    Autosize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autosize.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    Autosize.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
    };
    return Autosize;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('input', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLTextAreaElement]),
    __metadata("design:returntype", void 0)
], Autosize.prototype, "onInput", null);
Autosize = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: 'ion-textarea[autosize]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], Autosize);

//# sourceMappingURL=autosize.js.map

/***/ }),

/***/ 783:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvokeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InvokeDirective = (function () {
    function InvokeDirective() {
        this.invoke = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    InvokeDirective.prototype.ngAfterContentInit = function () {
        this.invoke.emit(null);
    };
    return InvokeDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", Object)
], InvokeDirective.prototype, "invoke", void 0);
InvokeDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({ selector: '[invoke]' })
], InvokeDirective);

//# sourceMappingURL=invokeDirective.js.map

/***/ }),

/***/ 784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CapitalizePipe = (function () {
    function CapitalizePipe() {
    }
    // Autocapitalizes the first letter of each word in a phrase.
    // Input: {{'john doe' | capitalize}}
    // Output: John Doe
    CapitalizePipe.prototype.transform = function (value) {
        if (value) {
            var words = value.split(' ');
            value = words.map(function (word) { return word.substring(0, 1).toUpperCase() + word.substring(1); }).join(' ');
        }
        return value;
    };
    return CapitalizePipe;
}());
CapitalizePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'capitalize'
    })
], CapitalizePipe);

//# sourceMappingURL=capitalize.pipe.js.map

/***/ }),

/***/ 785:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DistancePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DistancePipe = (function () {
    function DistancePipe() {
    }
    // Calculate position
    // Input: {{'46.454545,2.151454:46.15615,2.4754' | distance}}
    // Output: John Doe
    DistancePipe.prototype.transform = function (value) {
        if (value) {
            var positions = value.split(':');
            var me = positions[0].split(',');
            var other = positions[1].split(',');
            if (me[0] == "n/a" || me[1] == "n/a" || other[0] == "n/a" || other[1] == "n/a") {
                return "N/A";
            }
            return getDistanceFromLatLonInKm(me[0], me[1], other[0], other[1]);
        }
        return value;
    };
    return DistancePipe;
}());
DistancePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'distance'
    })
], DistancePipe);

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
//# sourceMappingURL=distance.pipe.js.map

/***/ }),

/***/ 786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_setting__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_map_service__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = (function () {
    function MyApp(mapService, platform, menu, statusBar, splashScreen, push, global, alertCtrl, menuCtrl, userService) {
        var _this = this;
        this.mapService = mapService;
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.push = push;
        this.global = global;
        this.alertCtrl = alertCtrl;
        this.menuCtrl = menuCtrl;
        this.userService = userService;
        this.rootPage = 'LoginPage';
        this.activePage = new __WEBPACK_IMPORTED_MODULE_6_rxjs__["Subject"]();
        this.initializeApp();
        //Main Menu
        this.pages = __WEBPACK_IMPORTED_MODULE_5__global_setting__["c" /* PAGES */];
        this.activePage.subscribe(function (selectedPage) {
            _this.pages.map(function (page) {
                page.active = page.title === selectedPage.title;
            });
        });
    }
    MyApp.prototype.updateUser = function (profil) {
        this.profil = profil;
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.global.set('theme', '');
            //this.initPushNotification();
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            //this.menuCtrl.enable(false, 'menu-material');
        });
    };
    MyApp.prototype.openPage = function (pages) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        if (pages.page == "ProfileSettingsPage" || pages.page == "MyStorePage"
            || pages.page == "TransactionPage" || pages.page == "PurchasePage"
            || pages.page == "InventoryPage" || pages.page == "MySalesPage") {
            this.nav.push(pages.page);
        }
        else if (pages.page == "LoginPage") {
            this.mapService.markersArticle = [];
            this.mapService.markersFiat = [];
            this.mapService.markersService = [];
            this.mapService.setDiv(null, null).then();
            this.userService.logout();
            this.nav.setRoot(pages.page);
        }
        else {
            this.nav.setRoot(pages.page);
            this.activePage.next(pages);
        }
    };
    //PUSH NOTIFICATION
    // initPushNotification() {
    //   if (!this.platform.is('cordova')) {
    //     console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
    //     return;
    //   }
    //   const options: PushOptions = {
    //     android: {
    //       //senderID: ConstantVariable.messagingSenderId
    //     },
    //     ios: {
    //       alert: 'true',
    //       badge: false,
    //       sound: 'true'
    //     },
    //     windows: {}
    //   };
    //   const pushObject: PushObject = this.push.init(options);
    //
    //   pushObject.on('registration').subscribe((data: any) => {
    //     //console.log('device token -> ' + data.registrationId);
    //     //TODO - send device token to server
    //   });
    //
    //   pushObject.on('notification').subscribe((data: any) => {
    //     //console.log('message -> ' + data.message);
    //     //if user using app and push notification comes
    //     if (data.additionalData.foreground) {
    //       // if application open, show popup
    //       let confirmAlert = this.alertCtrl.create({
    //         title: 'New Notification',
    //         message: data.message,
    //         buttons: [{
    //           text: 'Ignore',
    //           role: 'cancel'
    //         }, {
    //           text: 'View',
    //           handler: () => {
    //             //TODO: Your logic here
    //             this.nav.push('NotifDetailPage', { message: data.message });
    //           }
    //         }]
    //       });
    //       confirmAlert.present();
    //     } else {
    //       //if user NOT using app and push notification comes
    //       //TODO: Your logic on click of push notification directly
    //       this.nav.push('NotifDetailPage', { message: data.message });
    //       //console.log('Push notification clicked');
    //     }
    //   });
    //
    //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
    // }
    MyApp.prototype.menuClosed = function () {
        if (this.mapService.map) {
            this.mapService.map.setClickable(true);
        }
    };
    MyApp.prototype.menuOpened = function () {
        if (this.mapService.map) {
            this.mapService.map.setClickable(false);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\ivpay2\src\app\app.html"*/'<div class="{{global.state[\'theme\']}}">\n  <!--Material Design Menu-->\n  <ion-menu (ionOpen)="menuOpened()" (ionClose)="menuClosed()" [content]="content" id="menu-material" *ngIf="global.state[\'profil\']">\n    <ion-content>\n      <div class="menu-header">\n        <!--material-design-background-->\n        <p class="name">{{global.state[\'profil\'].pseudo}}</p>\n        <p class="e-mail">{{global.state[\'profil\'].username}}</p>\n      </div>\n      <ion-list>\n        <button menuClose="left" ion-item detail-none *ngFor="let p of pages" (click)="openPage(p)">\n          <ion-icon [name]="p.icon" item-left></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n  </ion-menu>\n\n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n</div>\n'/*ion-inline-end:"D:\ivpay2\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__providers_map_service__["a" /* MapServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__["a" /* Push */],
        __WEBPACK_IMPORTED_MODULE_5__global_setting__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_user_service__["a" /* UserService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[379]);
//# sourceMappingURL=main.js.map