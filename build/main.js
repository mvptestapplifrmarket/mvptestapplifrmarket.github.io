webpackJsonp([37],{

/***/ 1077:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1080:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1216:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1217:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1218:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1295:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 1295;

/***/ }),

/***/ 1318:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1334:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1335:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1338:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wallet_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__firebase_firebase__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__web3_service__ = __webpack_require__(180);
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
    function UserService(alertCtrl, walletService, afd, afAuth, web3Service, global, firebase) {
        this.alertCtrl = alertCtrl;
        this.walletService = walletService;
        this.afd = afd;
        this.afAuth = afAuth;
        this.web3Service = web3Service;
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
                _this.walletService.getWallets(auth.uid).subscribe(function (w) {
                    _this.walletService.wallets = w;
                    // load web3
                    _this.web3Service.initWeb3(accountInfo.password, _this.walletService.wallets.eth.private, _this.walletService.wallets.eth.address);
                });
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
                if (trigram != 'GAS') {
                    obs.push(_this.walletService.createWallet(trigram));
                }
            }
            //wait to receive all response
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"].forkJoin(obs).subscribe(function (wallets) {
                var i = 0;
                var contentWallets = {};
                for (var _i = 0, _a = _this.walletService.trigramAvailable; _i < _a.length; _i++) {
                    var trigram = _a[_i];
                    if (trigram != 'GAS') {
                        contentWallets[trigram.toLowerCase()] = {};
                        contentWallets[trigram.toLowerCase()]['address'] = wallets[i]['address'];
                        contentWallets[trigram.toLowerCase()]['public'] = wallets[i]['public'];
                        contentWallets[trigram.toLowerCase()]['private'] = __WEBPACK_IMPORTED_MODULE_9_crypto_js__["AES"].encrypt(wallets[i]['private'], accountInfo.password).toString(); //to encrypt
                        i++;
                    }
                }
                contentWallets['gas'] = contentWallets['neo'];
                _this.walletService.saveWallets(contentWallets, userFire.uid);
                _this.walletService.wallets = contentWallets;
                // load web3
                _this.web3Service.initWeb3(accountInfo.password, _this.walletService.wallets.eth.private, _this.walletService.wallets.eth.address);
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
                _this.walletService.getWallets(auth.uid).subscribe(function (w) {
                    _this.walletService.wallets = w;
                });
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
        __WEBPACK_IMPORTED_MODULE_11__web3_service__["a" /* Web3Service */],
        __WEBPACK_IMPORTED_MODULE_8__app_global_setting__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_10__firebase_firebase__["a" /* FirebaseProvider */]])
], UserService);

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 1528:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1568:
/***/ (function(module, exports) {

module.exports = {
	"contractName": "Transaction",
	"abi": [
		{
			"constant": true,
			"inputs": [],
			"name": "getSales",
			"outputs": [
				{
					"name": "",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getNumberOfTransactions",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "kill",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_seller",
					"type": "address"
				},
				{
					"name": "_itemId",
					"type": "bytes16"
				},
				{
					"name": "_typeItem",
					"type": "bytes8"
				},
				{
					"name": "_location",
					"type": "string"
				},
				{
					"name": "_pictureHash",
					"type": "string"
				},
				{
					"name": "_comment",
					"type": "string"
				},
				{
					"name": "_status",
					"type": "bytes8"
				},
				{
					"name": "_price",
					"type": "uint256"
				}
			],
			"name": "buyItem",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"name": "transactions",
			"outputs": [
				{
					"name": "id",
					"type": "uint256"
				},
				{
					"name": "seller",
					"type": "address"
				},
				{
					"name": "buyer",
					"type": "address"
				},
				{
					"name": "itemId",
					"type": "bytes16"
				},
				{
					"name": "typeItem",
					"type": "bytes8"
				},
				{
					"name": "location",
					"type": "string"
				},
				{
					"name": "pictureHash",
					"type": "string"
				},
				{
					"name": "receiptHash",
					"type": "bytes16"
				},
				{
					"name": "comment",
					"type": "string"
				},
				{
					"name": "status",
					"type": "bytes8"
				},
				{
					"name": "_price",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "getPurchases",
			"outputs": [
				{
					"name": "",
					"type": "uint256[]"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_itemId",
					"type": "bytes16"
				}
			],
			"name": "unlockFunds",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "source",
					"type": "string"
				}
			],
			"name": "stringToBytes8",
			"outputs": [
				{
					"name": "result",
					"type": "bytes8"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "",
					"type": "bytes16"
				}
			],
			"name": "fundsLocked",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "_id",
					"type": "uint256"
				},
				{
					"indexed": true,
					"name": "_itemId",
					"type": "bytes16"
				},
				{
					"indexed": false,
					"name": "_seller",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "_buyer",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "_price",
					"type": "uint256"
				}
			],
			"name": "BuyItem",
			"type": "event"
		}
	],
	"bytecode": "0x6060604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506115de806100536000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630d83304c146100a957806324ba506d1461011357806341c0e1b51461013c5780638ce2df4a146101515780639ace38c2146102b5578063c47f0f90146105c8578063cfc405c714610632578063e69fd1c514610668578063ee9228e91461070f578063f2fde38b14610759575b600080fd5b34156100b457600080fd5b6100bc610792565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156100ff5780820151818401526020810190506100e4565b505050509050019250505060405180910390f35b341561011e57600080fd5b610126610913565b6040518082815260200191505060405180910390f35b341561014757600080fd5b61014f61091d565b005b6102b3600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356fffffffffffffffffffffffffffffffff191690602001909190803577ffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803577ffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919080359060200190919050506109b2565b005b34156102c057600080fd5b6102d66004808035906020019091905050610ea2565b604051808c81526020018b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001896fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff191681526020018877ffffffffffffffffffffffffffffffffffffffffffffffff191677ffffffffffffffffffffffffffffffffffffffffffffffff191681526020018060200180602001876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001806020018677ffffffffffffffffffffffffffffffffffffffffffffffff191677ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200185815260200184810384528a8181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156104a75780601f1061047c576101008083540402835291602001916104a7565b820191906000526020600020905b81548152906001019060200180831161048a57829003601f168201915b505084810383528981815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561052a5780601f106104ff5761010080835404028352916020019161052a565b820191906000526020600020905b81548152906001019060200180831161050d57829003601f168201915b50508481038252878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156105ad5780601f10610582576101008083540402835291602001916105ad565b820191906000526020600020905b81548152906001019060200180831161059057829003601f168201915b50509e50505050505050505050505050505060405180910390f35b34156105d357600080fd5b6105db610fbd565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561061e578082015181840152602081019050610603565b505050509050019250505060405180910390f35b341561063d57600080fd5b61066660048080356fffffffffffffffffffffffffffffffff191690602001909190505061113e565b005b341561067357600080fd5b6106c3600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506113e6565b604051808277ffffffffffffffffffffffffffffffffffffffffffffffff191677ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561071a57600080fd5b61074360048080356fffffffffffffffffffffffffffffffff191690602001909190505061142f565b6040518082815260200191505060405180910390f35b341561076457600080fd5b610790600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611447565b005b61079a6114e5565b6107a26114e5565b6000806107ad6114e5565b60006003546040518059106107bf5750595b9080825280602002602001820160405250945060009350600192505b60035483111515610899573373ffffffffffffffffffffffffffffffffffffffff166001600085815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561088c576001600084815260200190815260200160002060000154858581518110151561087557fe5b906020019060200201818152505083806001019450505b82806001019350506107db565b836040518059106108a75750595b90808252806020026020018201604052509150600090505b838110156109085784818151811015156108d557fe5b9060200190602002015182828151811015156108ed57fe5b906020019060200201818152505080806001019150506108bf565b819550505050505090565b6000600354905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561097857600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60008873ffffffffffffffffffffffffffffffffffffffff16141515156109d857600080fd5b8773ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151515610a1357600080fd5b6000601060ff16111515610a2657600080fd5b6000600860ff16111515610a3957600080fd5b60008551111515610a4957600080fd5b60008451111515610a5957600080fd5b8034141515610a6757600080fd5b8060026000896fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020540160026000896fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020819055506003600081548092919060010191905055506101606040519081016040528060035481526020018973ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff168152602001886fffffffffffffffffffffffffffffffff191681526020018777ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200186815260200185815260200160006fffffffffffffffffffffffffffffffff191681526020018481526020018377ffffffffffffffffffffffffffffffffffffffffffffffff19168152602001828152506001600060035481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030160006101000a8154816fffffffffffffffffffffffffffffffff02191690837001000000000000000000000000000000009004021790555060808201518160030160106101000a81548167ffffffffffffffff021916908378010000000000000000000000000000000000000000000000009004021790555060a0820151816004019080519060200190610d159291906114f9565b5060c0820151816005019080519060200190610d329291906114f9565b5060e08201518160060160006101000a8154816fffffffffffffffffffffffffffffffff021916908370010000000000000000000000000000000090040217905550610100820151816007019080519060200190610d919291906114f9565b506101208201518160080160006101000a81548167ffffffffffffffff02191690837801000000000000000000000000000000000000000000000000900402179055506101408201518160090155905050866fffffffffffffffffffffffffffffffff19166003547f2b32baf6aa749dcf64450a053b74bb710daf1230f871b3688cc966dc060bde408a3385604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a35050505050505050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900470010000000000000000000000000000000002908060030160109054906101000a900478010000000000000000000000000000000000000000000000000290806004019080600501908060060160009054906101000a9004700100000000000000000000000000000000029080600701908060080160009054906101000a900478010000000000000000000000000000000000000000000000000290806009015490508b565b610fc56114e5565b610fcd6114e5565b600080610fd86114e5565b6000600354604051805910610fea5750595b9080825280602002602001820160405250945060009350600192505b600354831115156110c4573373ffffffffffffffffffffffffffffffffffffffff166001600085815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110b757600160008481526020019081526020016000206000015485858151811015156110a057fe5b906020019060200201818152505083806001019450505b8280600101935050611006565b836040518059106110d25750595b90808252806020026020018201604052509150600090505b8381101561113357848181518110151561110057fe5b90602001906020020151828281518110151561111857fe5b906020019060200201818152505080806001019150506110ea565b819550505050505090565b600080600080600093505b600354841115156113df57846fffffffffffffffffffffffffffffffff19166001600086815260200190815260200160002060030160009054906101000a9004700100000000000000000000000000000000026fffffffffffffffffffffffffffffffff191614156113d2576001600085815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692506001600085815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060016000858152602001908152602001600020600901549050600060026000876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff191681526020019081526020016000205411151561128857600080fd5b8060026000876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020540360026000876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561134157600080fd5b61137f6040805190810160405280600481526020017f70616964000000000000000000000000000000000000000000000000000000008152506113e6565b6001600086815260200190815260200160002060080160006101000a81548167ffffffffffffffff02191690837801000000000000000000000000000000000000000000000000900402179055506113df565b8380600101945050611149565b5050505050565b60006113f0611579565b8290506000815114156114215760007801000000000000000000000000000000000000000000000000029150611429565b600883015191505b50919050565b60026020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114a257600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061153a57805160ff1916838001178555611568565b82800160010185558215611568579182015b8281111561156757825182559160200191906001019061154c565b5b509050611575919061158d565b5090565b602060405190810160405280600081525090565b6115af91905b808211156115ab576000816000905550600101611593565b5090565b905600a165627a7a723058203a8e958a44c342d2c7cac97186fb0e30357713bc4a0ed67da6ff9cc2dc5f132f0029",
	"deployedBytecode": "0x6060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630d83304c146100a957806324ba506d1461011357806341c0e1b51461013c5780638ce2df4a146101515780639ace38c2146102b5578063c47f0f90146105c8578063cfc405c714610632578063e69fd1c514610668578063ee9228e91461070f578063f2fde38b14610759575b600080fd5b34156100b457600080fd5b6100bc610792565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156100ff5780820151818401526020810190506100e4565b505050509050019250505060405180910390f35b341561011e57600080fd5b610126610913565b6040518082815260200191505060405180910390f35b341561014757600080fd5b61014f61091d565b005b6102b3600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356fffffffffffffffffffffffffffffffff191690602001909190803577ffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803577ffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919080359060200190919050506109b2565b005b34156102c057600080fd5b6102d66004808035906020019091905050610ea2565b604051808c81526020018b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001896fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff191681526020018877ffffffffffffffffffffffffffffffffffffffffffffffff191677ffffffffffffffffffffffffffffffffffffffffffffffff191681526020018060200180602001876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001806020018677ffffffffffffffffffffffffffffffffffffffffffffffff191677ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200185815260200184810384528a8181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156104a75780601f1061047c576101008083540402835291602001916104a7565b820191906000526020600020905b81548152906001019060200180831161048a57829003601f168201915b505084810383528981815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561052a5780601f106104ff5761010080835404028352916020019161052a565b820191906000526020600020905b81548152906001019060200180831161050d57829003601f168201915b50508481038252878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156105ad5780601f10610582576101008083540402835291602001916105ad565b820191906000526020600020905b81548152906001019060200180831161059057829003601f168201915b50509e50505050505050505050505050505060405180910390f35b34156105d357600080fd5b6105db610fbd565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561061e578082015181840152602081019050610603565b505050509050019250505060405180910390f35b341561063d57600080fd5b61066660048080356fffffffffffffffffffffffffffffffff191690602001909190505061113e565b005b341561067357600080fd5b6106c3600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506113e6565b604051808277ffffffffffffffffffffffffffffffffffffffffffffffff191677ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b341561071a57600080fd5b61074360048080356fffffffffffffffffffffffffffffffff191690602001909190505061142f565b6040518082815260200191505060405180910390f35b341561076457600080fd5b610790600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611447565b005b61079a6114e5565b6107a26114e5565b6000806107ad6114e5565b60006003546040518059106107bf5750595b9080825280602002602001820160405250945060009350600192505b60035483111515610899573373ffffffffffffffffffffffffffffffffffffffff166001600085815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561088c576001600084815260200190815260200160002060000154858581518110151561087557fe5b906020019060200201818152505083806001019450505b82806001019350506107db565b836040518059106108a75750595b90808252806020026020018201604052509150600090505b838110156109085784818151811015156108d557fe5b9060200190602002015182828151811015156108ed57fe5b906020019060200201818152505080806001019150506108bf565b819550505050505090565b6000600354905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561097857600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60008873ffffffffffffffffffffffffffffffffffffffff16141515156109d857600080fd5b8773ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151515610a1357600080fd5b6000601060ff16111515610a2657600080fd5b6000600860ff16111515610a3957600080fd5b60008551111515610a4957600080fd5b60008451111515610a5957600080fd5b8034141515610a6757600080fd5b8060026000896fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020540160026000896fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020819055506003600081548092919060010191905055506101606040519081016040528060035481526020018973ffffffffffffffffffffffffffffffffffffffff1681526020013373ffffffffffffffffffffffffffffffffffffffff168152602001886fffffffffffffffffffffffffffffffff191681526020018777ffffffffffffffffffffffffffffffffffffffffffffffff1916815260200186815260200185815260200160006fffffffffffffffffffffffffffffffff191681526020018481526020018377ffffffffffffffffffffffffffffffffffffffffffffffff19168152602001828152506001600060035481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030160006101000a8154816fffffffffffffffffffffffffffffffff02191690837001000000000000000000000000000000009004021790555060808201518160030160106101000a81548167ffffffffffffffff021916908378010000000000000000000000000000000000000000000000009004021790555060a0820151816004019080519060200190610d159291906114f9565b5060c0820151816005019080519060200190610d329291906114f9565b5060e08201518160060160006101000a8154816fffffffffffffffffffffffffffffffff021916908370010000000000000000000000000000000090040217905550610100820151816007019080519060200190610d919291906114f9565b506101208201518160080160006101000a81548167ffffffffffffffff02191690837801000000000000000000000000000000000000000000000000900402179055506101408201518160090155905050866fffffffffffffffffffffffffffffffff19166003547f2b32baf6aa749dcf64450a053b74bb710daf1230f871b3688cc966dc060bde408a3385604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a35050505050505050565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900470010000000000000000000000000000000002908060030160109054906101000a900478010000000000000000000000000000000000000000000000000290806004019080600501908060060160009054906101000a9004700100000000000000000000000000000000029080600701908060080160009054906101000a900478010000000000000000000000000000000000000000000000000290806009015490508b565b610fc56114e5565b610fcd6114e5565b600080610fd86114e5565b6000600354604051805910610fea5750595b9080825280602002602001820160405250945060009350600192505b600354831115156110c4573373ffffffffffffffffffffffffffffffffffffffff166001600085815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110b757600160008481526020019081526020016000206000015485858151811015156110a057fe5b906020019060200201818152505083806001019450505b8280600101935050611006565b836040518059106110d25750595b90808252806020026020018201604052509150600090505b8381101561113357848181518110151561110057fe5b90602001906020020151828281518110151561111857fe5b906020019060200201818152505080806001019150506110ea565b819550505050505090565b600080600080600093505b600354841115156113df57846fffffffffffffffffffffffffffffffff19166001600086815260200190815260200160002060030160009054906101000a9004700100000000000000000000000000000000026fffffffffffffffffffffffffffffffff191614156113d2576001600085815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692506001600085815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060016000858152602001908152602001600020600901549050600060026000876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff191681526020019081526020016000205411151561128857600080fd5b8060026000876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020540360026000876fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff19168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050151561134157600080fd5b61137f6040805190810160405280600481526020017f70616964000000000000000000000000000000000000000000000000000000008152506113e6565b6001600086815260200190815260200160002060080160006101000a81548167ffffffffffffffff02191690837801000000000000000000000000000000000000000000000000900402179055506113df565b8380600101945050611149565b5050505050565b60006113f0611579565b8290506000815114156114215760007801000000000000000000000000000000000000000000000000029150611429565b600883015191505b50919050565b60026020528060005260406000206000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156114a257600080fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061153a57805160ff1916838001178555611568565b82800160010185558215611568579182015b8281111561156757825182559160200191906001019061154c565b5b509050611575919061158d565b5090565b602060405190810160405280600081525090565b6115af91905b808211156115ab576000816000905550600101611593565b5090565b905600a165627a7a723058203a8e958a44c342d2c7cac97186fb0e30357713bc4a0ed67da6ff9cc2dc5f132f0029",
	"sourceMap": "1198:4341:2:-;;;929:10;921:5;;:18;;;;;;;;;;;;;;;;;;1198:4341;;;;;;",
	"deployedSourceMap": "1198:4341:2:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2085:698;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;1937:98:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1816:63;;;;;;;;;;;;;;3555:1119;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1531:56;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2836:683;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:2;8:100;;;99:1;94:3;90;84:5;80:1;75:3;71;64:6;52:2;49:1;45:3;40:15;;8:100;;;12:14;3:109;;;;;;;;;;;;;;;;;4679:597:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5280:256;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1591:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1111:82;;;;;;;;;;;;;;;;;;;;;;;;;;;;2085:698;2126:6;;:::i;:::-;2168:28;;:::i;:::-;2236:18;2302:6;2625:19;;:::i;:::-;2682:6;2210:18;;2199:30;;;;;;;;;;;;;;;;;;;;;;;;2168:61;;2257:1;2236:22;;2311:1;2302:10;;2298:254;2319:18;;2314:1;:23;;2298:254;;;2440:10;2414:36;;:12;:15;2427:1;2414:15;;;;;;;;;;;:22;;;;;;;;;;;;:36;;;2411:135;;;2494:12;:15;2507:1;2494:15;;;;;;;;;;;:18;;;2462:14;2477:13;2462:29;;;;;;;;;;;;;;;;;:50;;;;;2522:15;;;;;;;2411:135;2339:3;;;;;;;2298:254;;;2658:13;2647:25;;;;;;;;;;;;;;;;;;;;;;;;2625:47;;2691:1;2682:10;;2678:83;2698:13;2694:1;:17;2678:83;;;2737:14;2752:1;2737:17;;;;;;;;;;;;;;;;;;2726:5;2732:1;2726:8;;;;;;;;;;;;;;;;;:28;;;;;2713:3;;;;;;;2678:83;;;2773:5;2766:12;;2085:698;;;;;;:::o;1937:98::-;1993:4;2012:18;;2005:25;;1937:98;:::o;1816:63::-;850:5;;;;;;;;;;;836:19;;:10;:19;;;828:28;;;;;;;;1868:5;;;;;;;;;;;1855:19;;;3555:1119;3776:3;3765:7;:14;;;;3757:23;;;;;;;;3854:7;3840:21;;:10;:21;;;;3832:30;;;;;;;;3894:1;3877:14;:18;;;3869:27;;;;;;;;3929:1;3910:16;:20;;;3902:29;;;;;;;;3971:1;3951:9;3945:23;:27;3937:36;;;;;;;;4016:1;3993:12;3987:26;:30;3979:39;;;;;;;;4089:6;4076:9;:19;4068:28;;;;;;;;4223:6;4200:11;:20;4212:7;4200:20;;;;;;;;;;;;;;;;;;:29;4179:11;:20;4191:7;4179:20;;;;;;;;;;;;;;;;;:50;;;;4259:18;;:20;;;;;;;;;;;;;4354:208;;;;;;;;;4381:18;;4354:208;;;;4407:7;4354:208;;;;;;4422:10;4354:208;;;;;;4440:7;4354:208;;;;;;;4455:9;4354:208;;;;;;;4472:9;4354:208;;;;4489:12;4354:208;;;;;;;;;;;;4519:8;4354:208;;;;4535:7;4354:208;;;;;;;4550:6;4354:208;;;4319:12;:32;4332:18;;4319:32;;;;;;;;;;;:243;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4632:7;4604:65;;;4612:18;;4604:65;4641:7;4650:10;4662:6;4604:65;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3555:1119;;;;;;;;:::o;1531:56::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2836:683::-;2881:6;;:::i;:::-;2923:28;;:::i;:::-;2991:16;3055:6;3371:17;;:::i;:::-;3424:6;2965:18;;2954:30;;;;;;;;;;;;;;;;;;;;;;;;2923:61;;3010:1;2991:20;;3064:1;3055:10;;3051:249;3072:18;;3067:1;:23;;3051:249;;;3192:10;3167:35;;:12;:15;3180:1;3167:15;;;;;;;;;;;:21;;;;;;;;;;;;:35;;;3164:130;;;3244:12;:15;3257:1;3244:15;;;;;;;;;;;:18;;;3214:14;3229:11;3214:27;;;;;;;;;;;;;;;;;:48;;;;;3272:13;;;;;;;3164:130;3092:3;;;;;;;3051:249;;;3402:11;3391:23;;;;;;;;;;;;;;;;;;;;;;;;3371:43;;3433:1;3424:10;;3420:79;3440:11;3436:1;:15;3420:79;;;3475:14;3490:1;3475:17;;;;;;;;;;;;;;;;;;3466:3;3470:1;3466:6;;;;;;;;;;;;;;;;;:26;;;;;3453:3;;;;;;;3420:79;;;3511:3;3504:10;;2836:683;;;;;;:::o;4679:597::-;4735:6;4834:13;4881:14;4930:24;4744:1;4735:10;;4731:541;4752:18;;4747:1;:23;;4731:541;;;4814:7;4788:33;;;:12;:15;4801:1;4788:15;;;;;;;;;;;:22;;;;;;;;;;;;:33;;;;4785:481;;;4850:12;:15;4863:1;4850:15;;;;;;;;;;;:21;;;;;;;;;;;;4834:37;;4898:12;:15;4911:1;4898:15;;;;;;;;;;;:22;;;;;;;;;;;;4881:39;;4957:12;:15;4970:1;4957:15;;;;;;;;;;;:22;;;4930:49;;5019:1;4998:11;:20;5010:7;4998:20;;;;;;;;;;;;;;;;;;:22;4990:31;;;;;;;;5076:16;5052:11;:20;5064:7;5052:20;;;;;;;;;;;;;;;;;;:41;5031:11;:20;5043:7;5031:20;;;;;;;;;;;;;;;;;:62;;;;5150:6;:15;;:33;5166:16;5150:33;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5219:22;;;;;;;;;;;;;;;;;;;:14;:22::i;:::-;5194:12;:15;5207:1;5194:15;;;;;;;;;;;:22;;;:47;;;;;;;;;;;;;;;;;;;5252:5;;4785:481;4772:3;;;;;;;4731:541;;;4679:597;;;;;:::o;5280:256::-;5335:13;5356:32;;:::i;:::-;5397:6;5356:48;;5444:1;5414:19;:26;:31;5410:62;;;5462:3;5455:10;;;;;;5410:62;5523:1;5515:6;5511:3;5505:5;5495:31;;5487:45;;;;;:::o;1591:46::-;;;;;;;;;;;;;;;;;:::o;1111:82::-;850:5;;;;;;;;;;;836:19;;:10;:19;;;828:28;;;;;;;;1180:8;1172:5;;:16;;;;;;;;;;;;;;;;;;1111:82;:::o;1198:4341::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
	"source": "pragma solidity ^0.4.19;\n\nlibrary SafeMath {\n  function mul(uint256 a, uint256 b) internal constant returns (uint256) {\n    uint256 c = a * b;\n    assert(a == 0 || c / a == b);\n    return c;\n  }\n\n  function div(uint256 a, uint256 b) internal constant returns (uint256) {\n    // assert(b > 0); // Solidity automatically throws when dividing by 0\n    uint256 c = a / b;\n    // assert(a == b * c + a % b); // There is no case in which this doesn't hold\n    return c;\n  }\n\n  function sub(uint256 a, uint256 b) internal constant returns (uint256) {\n    assert(b <= a);\n    return a - b;\n  }\n\n  function add(uint256 a, uint256 b) internal constant returns (uint256) {\n    uint256 c = a + b;\n    assert(c >= a);\n    return c;\n  }\n}\n\ncontract Ownable {\n  // state variables\n  address owner;\n\n  // modifiers\n  modifier onlyOwner() {\n    require(msg.sender == owner);\n    _;\n  }\n\n  // constructor\n  function Ownable() public {\n    owner = msg.sender;\n  }\n\n  /**\n     * @dev Allows the current owner to transfer control of the contract to a newOwner.\n     * @param newOwner The address to transfer ownership to.\n     */\n  function transferOwnership(address newOwner) onlyOwner {\n    owner = newOwner;\n  }\n\n}\n\ncontract Transaction is Ownable {\n  // custom types\n  struct TransactionNeoPlace {\n    uint id;\n    address seller;\n    address buyer;\n    bytes16 itemId;\n    bytes8 typeItem;\n    string location;\n    string pictureHash;\n    bytes16 receiptHash;\n    string comment;\n    bytes8 status;\n    uint256 _price;\n  }\n\n  // state variables\n  mapping(uint => TransactionNeoPlace) public transactions;\n  mapping(bytes16 => uint256) public fundsLocked;\n\n  uint transactionCounter;\n\n  // events\n  event BuyItem(\n    uint indexed _id,\n    bytes16 indexed _itemId,\n    address _seller,\n    address _buyer,\n    uint256 _price\n  );\n\n  function kill() public onlyOwner {\n    selfdestruct(owner);\n  }\n\n  // fetch the number of transactions in the contract\n  function getNumberOfTransactions() public view returns (uint) {\n    return transactionCounter;\n  }\n\n  // fetch and return all sales of the seller\n  function getSales() public view returns (uint[]) {\n    // prepare output array\n    uint[] memory transactionIds = new uint[](transactionCounter);\n\n    uint numberOfSales = 0;\n\n    // iterate over transactions\n    for(uint i = 1; i <= transactionCounter; i++) {\n      // keep the ID if the transaction owns to the seller\n      if(transactions[i].seller == msg.sender) {\n        transactionIds[numberOfSales] = transactions[i].id;\n        numberOfSales++;\n      }\n    }\n\n    // copy the transactionIds array into a smaller getSales array\n    uint[] memory sales = new uint[](numberOfSales);\n    for(uint j = 0; j < numberOfSales; j++) {\n      sales[j] = transactionIds[j];\n    }\n    return sales;\n  }\n\n  // fetch and return all purchases of the buyer\n  function getPurchases() public view returns (uint[]) {\n    // prepare output array\n    uint[] memory transactionIds = new uint[](transactionCounter);\n\n    uint numberOfBuy = 0;\n\n    // iterate over transactions\n    for(uint i = 1; i <= transactionCounter; i++) {\n      // keep the ID if the transaction owns to the seller\n      if(transactions[i].buyer == msg.sender) {\n        transactionIds[numberOfBuy] = transactions[i].id;\n        numberOfBuy++;\n      }\n    }\n\n    // copy the transactionIds array into a smaller getBuy array\n    uint[] memory buy = new uint[](numberOfBuy);\n    for(uint j = 0; j < numberOfBuy; j++) {\n      buy[j] = transactionIds[j];\n    }\n    return buy;\n  }\n\n  // new transaction / buy item\n  function buyItem(address _seller, bytes16 _itemId, bytes8 _typeItem, string _location, string _pictureHash, string _comment, bytes8 _status, uint256 _price) payable public {\n    // address not null\n    require(_seller != 0x0);\n    // seller don't allow to buy his own item\n    require(msg.sender != _seller);\n\n    require(_itemId.length > 0);\n    require(_typeItem.length > 0);\n    require(bytes(_location).length > 0);\n    require(bytes(_pictureHash).length > 0);\n    //require(bytes(_comment).length > 0);\n\n    require(msg.value == _price);\n\n\n    // lock and put the funds in escrow\n    //_seller.transfer(msg.value);\n    fundsLocked[_itemId]=fundsLocked[_itemId] + _price;\n\n    // new transaction\n    transactionCounter++;\n\n    // store the new transaction\n    transactions[transactionCounter] = TransactionNeoPlace(\n      transactionCounter,\n      _seller,\n      msg.sender,\n      _itemId,\n      _typeItem,\n      _location,\n      _pictureHash,\n      \"\",\n      _comment,\n      _status,\n      _price\n    );\n\n    // trigger the new transaction\n    BuyItem(transactionCounter, _itemId, _seller, msg.sender, _price);\n  }\n\n\n  function unlockFunds(bytes16 _itemId) public {\n\n    for(uint i = 0; i <= transactionCounter; i++) {\n      if(transactions[i].itemId == _itemId) {\n\n        address buyer = transactions[i].buyer;\n        address seller = transactions[i].seller;\n        uint256 priceTransaction = transactions[i]._price;\n\n        require(fundsLocked[_itemId]>0);\n        fundsLocked[_itemId]=fundsLocked[_itemId] - (priceTransaction);\n\n        //transfer fund from client to vendor\n        seller.transfer(priceTransaction);\n\n        transactions[i].status = stringToBytes8('paid');\n\n        break;\n      }\n    }\n  }\n\n  function stringToBytes8(string memory source) returns (bytes8 result) {\n    bytes memory tempEmptyStringTest = bytes(source);\n    if (tempEmptyStringTest.length == 0) {\n      return 0x0;\n    }\n\n    assembly {\n      result := mload(add(source, 8))\n    }\n  }\n\n}\n",
	"sourcePath": "D:\\ivpay2\\contracts\\Transaction.sol",
	"ast": {
		"absolutePath": "/D/ivpay2/contracts/Transaction.sol",
		"exportedSymbols": {
			"Ownable": [
				211
			],
			"SafeMath": [
				176
			],
			"Transaction": [
				667
			]
		},
		"id": 668,
		"nodeType": "SourceUnit",
		"nodes": [
			{
				"id": 83,
				"literals": [
					"solidity",
					"^",
					"0.4",
					".19"
				],
				"nodeType": "PragmaDirective",
				"src": "0:24:2"
			},
			{
				"baseContracts": [],
				"contractDependencies": [],
				"contractKind": "library",
				"documentation": null,
				"fullyImplemented": true,
				"id": 176,
				"linearizedBaseContracts": [
					176
				],
				"name": "SafeMath",
				"nodeType": "ContractDefinition",
				"nodes": [
					{
						"body": {
							"id": 112,
							"nodeType": "Block",
							"src": "118:76:2",
							"statements": [
								{
									"assignments": [
										93
									],
									"declarations": [
										{
											"constant": false,
											"id": 93,
											"name": "c",
											"nodeType": "VariableDeclaration",
											"scope": 113,
											"src": "124:9:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 92,
												"name": "uint256",
												"nodeType": "ElementaryTypeName",
												"src": "124:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 97,
									"initialValue": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 96,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 94,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 85,
											"src": "136:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "*",
										"rightExpression": {
											"argumentTypes": null,
											"id": 95,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 87,
											"src": "140:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "136:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "124:17:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												},
												"id": 107,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													},
													"id": 101,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"id": 99,
														"name": "a",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 85,
														"src": "154:1:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"hexValue": "30",
														"id": 100,
														"isConstant": false,
														"isLValue": false,
														"isPure": true,
														"kind": "number",
														"lValueRequested": false,
														"nodeType": "Literal",
														"src": "159:1:2",
														"subdenomination": null,
														"typeDescriptions": {
															"typeIdentifier": "t_rational_0_by_1",
															"typeString": "int_const 0"
														},
														"value": "0"
													},
													"src": "154:6:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "||",
												"rightExpression": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													},
													"id": 106,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"id": 104,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"leftExpression": {
															"argumentTypes": null,
															"id": 102,
															"name": "c",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 93,
															"src": "164:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"nodeType": "BinaryOperation",
														"operator": "/",
														"rightExpression": {
															"argumentTypes": null,
															"id": 103,
															"name": "a",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 85,
															"src": "168:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"src": "164:5:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"id": 105,
														"name": "b",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 87,
														"src": "173:1:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"src": "164:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"src": "154:20:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 98,
											"name": "assert",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 670,
											"src": "147:6:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 108,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "147:28:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 109,
									"nodeType": "ExpressionStatement",
									"src": "147:28:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 110,
										"name": "c",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 93,
										"src": "188:1:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 91,
									"id": 111,
									"nodeType": "Return",
									"src": "181:8:2"
								}
							]
						},
						"id": 113,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "mul",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 88,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 85,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 113,
									"src": "60:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 84,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "60:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 87,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 113,
									"src": "71:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 86,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "71:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "59:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 91,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 90,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 113,
									"src": "109:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 89,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "109:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "108:9:2"
						},
						"scope": 176,
						"src": "47:147:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 130,
							"nodeType": "Block",
							"src": "269:198:2",
							"statements": [
								{
									"assignments": [
										123
									],
									"declarations": [
										{
											"constant": false,
											"id": 123,
											"name": "c",
											"nodeType": "VariableDeclaration",
											"scope": 131,
											"src": "349:9:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 122,
												"name": "uint256",
												"nodeType": "ElementaryTypeName",
												"src": "349:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 127,
									"initialValue": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 126,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 124,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 115,
											"src": "361:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "/",
										"rightExpression": {
											"argumentTypes": null,
											"id": 125,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 117,
											"src": "365:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "361:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "349:17:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 128,
										"name": "c",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 123,
										"src": "461:1:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 121,
									"id": 129,
									"nodeType": "Return",
									"src": "454:8:2"
								}
							]
						},
						"id": 131,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "div",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 118,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 115,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 131,
									"src": "211:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 114,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "211:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 117,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 131,
									"src": "222:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 116,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "222:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "210:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 121,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 120,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 131,
									"src": "260:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 119,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "260:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "259:9:2"
						},
						"scope": 176,
						"src": "198:269:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 150,
							"nodeType": "Block",
							"src": "542:43:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 143,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"id": 141,
													"name": "b",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 135,
													"src": "555:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "<=",
												"rightExpression": {
													"argumentTypes": null,
													"id": 142,
													"name": "a",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 133,
													"src": "560:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"src": "555:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 140,
											"name": "assert",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 670,
											"src": "548:6:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 144,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "548:14:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 145,
									"nodeType": "ExpressionStatement",
									"src": "548:14:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 148,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 146,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 133,
											"src": "575:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "-",
										"rightExpression": {
											"argumentTypes": null,
											"id": 147,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 135,
											"src": "579:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "575:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 139,
									"id": 149,
									"nodeType": "Return",
									"src": "568:12:2"
								}
							]
						},
						"id": 151,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "sub",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 136,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 133,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 151,
									"src": "484:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 132,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "484:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 135,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 151,
									"src": "495:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 134,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "495:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "483:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 139,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 138,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 151,
									"src": "533:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 137,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "533:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "532:9:2"
						},
						"scope": 176,
						"src": "471:114:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 174,
							"nodeType": "Block",
							"src": "660:62:2",
							"statements": [
								{
									"assignments": [
										161
									],
									"declarations": [
										{
											"constant": false,
											"id": 161,
											"name": "c",
											"nodeType": "VariableDeclaration",
											"scope": 175,
											"src": "666:9:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 160,
												"name": "uint256",
												"nodeType": "ElementaryTypeName",
												"src": "666:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 165,
									"initialValue": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 164,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 162,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 153,
											"src": "678:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "+",
										"rightExpression": {
											"argumentTypes": null,
											"id": 163,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 155,
											"src": "682:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "678:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "666:17:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 169,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"id": 167,
													"name": "c",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 161,
													"src": "696:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">=",
												"rightExpression": {
													"argumentTypes": null,
													"id": 168,
													"name": "a",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 153,
													"src": "701:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"src": "696:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 166,
											"name": "assert",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 670,
											"src": "689:6:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 170,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "689:14:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 171,
									"nodeType": "ExpressionStatement",
									"src": "689:14:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 172,
										"name": "c",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 161,
										"src": "716:1:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 159,
									"id": 173,
									"nodeType": "Return",
									"src": "709:8:2"
								}
							]
						},
						"id": 175,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "add",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 156,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 153,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 175,
									"src": "602:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 152,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "602:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 155,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 175,
									"src": "613:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 154,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "613:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "601:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 159,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 158,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 175,
									"src": "651:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 157,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "651:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "650:9:2"
						},
						"scope": 176,
						"src": "589:133:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					}
				],
				"scope": 668,
				"src": "26:698:2"
			},
			{
				"baseContracts": [],
				"contractDependencies": [],
				"contractKind": "contract",
				"documentation": null,
				"fullyImplemented": true,
				"id": 211,
				"linearizedBaseContracts": [
					211
				],
				"name": "Ownable",
				"nodeType": "ContractDefinition",
				"nodes": [
					{
						"constant": false,
						"id": 178,
						"name": "owner",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "768:13:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						},
						"typeName": {
							"id": 177,
							"name": "address",
							"nodeType": "ElementaryTypeName",
							"src": "768:7:2",
							"typeDescriptions": {
								"typeIdentifier": "t_address",
								"typeString": "address"
							}
						},
						"value": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 188,
							"nodeType": "Block",
							"src": "822:46:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												"id": 184,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 181,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "836:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 182,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "sender",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "836:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "==",
												"rightExpression": {
													"argumentTypes": null,
													"id": 183,
													"name": "owner",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 178,
													"src": "850:5:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"src": "836:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 180,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "828:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 185,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "828:28:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 186,
									"nodeType": "ExpressionStatement",
									"src": "828:28:2"
								},
								{
									"id": 187,
									"nodeType": "PlaceholderStatement",
									"src": "862:1:2"
								}
							]
						},
						"id": 189,
						"name": "onlyOwner",
						"nodeType": "ModifierDefinition",
						"parameters": {
							"id": 179,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "819:2:2"
						},
						"src": "801:67:2",
						"visibility": "internal"
					},
					{
						"body": {
							"id": 197,
							"nodeType": "Block",
							"src": "915:29:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"id": 195,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"id": 192,
											"name": "owner",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 178,
											"src": "921:5:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"expression": {
												"argumentTypes": null,
												"id": 193,
												"name": "msg",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 679,
												"src": "929:3:2",
												"typeDescriptions": {
													"typeIdentifier": "t_magic_message",
													"typeString": "msg"
												}
											},
											"id": 194,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"memberName": "sender",
											"nodeType": "MemberAccess",
											"referencedDeclaration": null,
											"src": "929:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"src": "921:18:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"id": 196,
									"nodeType": "ExpressionStatement",
									"src": "921:18:2"
								}
							]
						},
						"id": 198,
						"implemented": true,
						"isConstructor": true,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "Ownable",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 190,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "905:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 191,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "915:0:2"
						},
						"scope": 211,
						"src": "889:55:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 209,
							"nodeType": "Block",
							"src": "1166:27:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"id": 207,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"id": 205,
											"name": "owner",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 178,
											"src": "1172:5:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"id": 206,
											"name": "newOwner",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 200,
											"src": "1180:8:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"src": "1172:16:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"id": 208,
									"nodeType": "ExpressionStatement",
									"src": "1172:16:2"
								}
							]
						},
						"id": 210,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [
							{
								"arguments": [],
								"id": 203,
								"modifierName": {
									"argumentTypes": null,
									"id": 202,
									"name": "onlyOwner",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 189,
									"src": "1156:9:2",
									"typeDescriptions": {
										"typeIdentifier": "t_modifier$__$",
										"typeString": "modifier ()"
									}
								},
								"nodeType": "ModifierInvocation",
								"src": "1156:9:2"
							}
						],
						"name": "transferOwnership",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 201,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 200,
									"name": "newOwner",
									"nodeType": "VariableDeclaration",
									"scope": 210,
									"src": "1138:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 199,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "1138:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "1137:18:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 204,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1166:0:2"
						},
						"scope": 211,
						"src": "1111:82:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					}
				],
				"scope": 668,
				"src": "726:470:2"
			},
			{
				"baseContracts": [
					{
						"arguments": [],
						"baseName": {
							"contractScope": null,
							"id": 212,
							"name": "Ownable",
							"nodeType": "UserDefinedTypeName",
							"referencedDeclaration": 211,
							"src": "1222:7:2",
							"typeDescriptions": {
								"typeIdentifier": "t_contract$_Ownable_$211",
								"typeString": "contract Ownable"
							}
						},
						"id": 213,
						"nodeType": "InheritanceSpecifier",
						"src": "1222:7:2"
					}
				],
				"contractDependencies": [
					211
				],
				"contractKind": "contract",
				"documentation": null,
				"fullyImplemented": true,
				"id": 667,
				"linearizedBaseContracts": [
					667,
					211
				],
				"name": "Transaction",
				"nodeType": "ContractDefinition",
				"nodes": [
					{
						"canonicalName": "Transaction.TransactionNeoPlace",
						"id": 236,
						"members": [
							{
								"constant": false,
								"id": 215,
								"name": "id",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1285:7:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								},
								"typeName": {
									"id": 214,
									"name": "uint",
									"nodeType": "ElementaryTypeName",
									"src": "1285:4:2",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 217,
								"name": "seller",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1298:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_address",
									"typeString": "address"
								},
								"typeName": {
									"id": 216,
									"name": "address",
									"nodeType": "ElementaryTypeName",
									"src": "1298:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 219,
								"name": "buyer",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1318:13:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_address",
									"typeString": "address"
								},
								"typeName": {
									"id": 218,
									"name": "address",
									"nodeType": "ElementaryTypeName",
									"src": "1318:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 221,
								"name": "itemId",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1337:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes16",
									"typeString": "bytes16"
								},
								"typeName": {
									"id": 220,
									"name": "bytes16",
									"nodeType": "ElementaryTypeName",
									"src": "1337:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 223,
								"name": "typeItem",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1357:15:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes8",
									"typeString": "bytes8"
								},
								"typeName": {
									"id": 222,
									"name": "bytes8",
									"nodeType": "ElementaryTypeName",
									"src": "1357:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 225,
								"name": "location",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1378:15:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_string_storage_ptr",
									"typeString": "string storage pointer"
								},
								"typeName": {
									"id": 224,
									"name": "string",
									"nodeType": "ElementaryTypeName",
									"src": "1378:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_string_storage_ptr",
										"typeString": "string storage pointer"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 227,
								"name": "pictureHash",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1399:18:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_string_storage_ptr",
									"typeString": "string storage pointer"
								},
								"typeName": {
									"id": 226,
									"name": "string",
									"nodeType": "ElementaryTypeName",
									"src": "1399:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_string_storage_ptr",
										"typeString": "string storage pointer"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 229,
								"name": "receiptHash",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1423:19:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes16",
									"typeString": "bytes16"
								},
								"typeName": {
									"id": 228,
									"name": "bytes16",
									"nodeType": "ElementaryTypeName",
									"src": "1423:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 231,
								"name": "comment",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1448:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_string_storage_ptr",
									"typeString": "string storage pointer"
								},
								"typeName": {
									"id": 230,
									"name": "string",
									"nodeType": "ElementaryTypeName",
									"src": "1448:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_string_storage_ptr",
										"typeString": "string storage pointer"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 233,
								"name": "status",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1468:13:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes8",
									"typeString": "bytes8"
								},
								"typeName": {
									"id": 232,
									"name": "bytes8",
									"nodeType": "ElementaryTypeName",
									"src": "1468:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 235,
								"name": "_price",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1487:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								},
								"typeName": {
									"id": 234,
									"name": "uint256",
									"nodeType": "ElementaryTypeName",
									"src": "1487:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									}
								},
								"value": null,
								"visibility": "internal"
							}
						],
						"name": "TransactionNeoPlace",
						"nodeType": "StructDefinition",
						"scope": 667,
						"src": "1252:254:2",
						"visibility": "public"
					},
					{
						"constant": false,
						"id": 240,
						"name": "transactions",
						"nodeType": "VariableDeclaration",
						"scope": 667,
						"src": "1531:56:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
							"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
						},
						"typeName": {
							"id": 239,
							"keyType": {
								"id": 237,
								"name": "uint",
								"nodeType": "ElementaryTypeName",
								"src": "1539:4:2",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								}
							},
							"nodeType": "Mapping",
							"src": "1531:36:2",
							"typeDescriptions": {
								"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
								"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
							},
							"valueType": {
								"contractScope": null,
								"id": 238,
								"name": "TransactionNeoPlace",
								"nodeType": "UserDefinedTypeName",
								"referencedDeclaration": 236,
								"src": "1547:19:2",
								"typeDescriptions": {
									"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage_ptr",
									"typeString": "struct Transaction.TransactionNeoPlace storage pointer"
								}
							}
						},
						"value": null,
						"visibility": "public"
					},
					{
						"constant": false,
						"id": 244,
						"name": "fundsLocked",
						"nodeType": "VariableDeclaration",
						"scope": 667,
						"src": "1591:46:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
							"typeString": "mapping(bytes16 => uint256)"
						},
						"typeName": {
							"id": 243,
							"keyType": {
								"id": 241,
								"name": "bytes16",
								"nodeType": "ElementaryTypeName",
								"src": "1599:7:2",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes16",
									"typeString": "bytes16"
								}
							},
							"nodeType": "Mapping",
							"src": "1591:27:2",
							"typeDescriptions": {
								"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
								"typeString": "mapping(bytes16 => uint256)"
							},
							"valueType": {
								"id": 242,
								"name": "uint256",
								"nodeType": "ElementaryTypeName",
								"src": "1610:7:2",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								}
							}
						},
						"value": null,
						"visibility": "public"
					},
					{
						"constant": false,
						"id": 246,
						"name": "transactionCounter",
						"nodeType": "VariableDeclaration",
						"scope": 667,
						"src": "1642:23:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						},
						"typeName": {
							"id": 245,
							"name": "uint",
							"nodeType": "ElementaryTypeName",
							"src": "1642:4:2",
							"typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							}
						},
						"value": null,
						"visibility": "internal"
					},
					{
						"anonymous": false,
						"id": 258,
						"name": "BuyItem",
						"nodeType": "EventDefinition",
						"parameters": {
							"id": 257,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 248,
									"indexed": true,
									"name": "_id",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1701:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 247,
										"name": "uint",
										"nodeType": "ElementaryTypeName",
										"src": "1701:4:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 250,
									"indexed": true,
									"name": "_itemId",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1723:23:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									},
									"typeName": {
										"id": 249,
										"name": "bytes16",
										"nodeType": "ElementaryTypeName",
										"src": "1723:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes16",
											"typeString": "bytes16"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 252,
									"indexed": false,
									"name": "_seller",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1752:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 251,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "1752:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 254,
									"indexed": false,
									"name": "_buyer",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1773:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 253,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "1773:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 256,
									"indexed": false,
									"name": "_price",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1793:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 255,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "1793:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "1695:116:2"
						},
						"src": "1682:130:2"
					},
					{
						"body": {
							"id": 267,
							"nodeType": "Block",
							"src": "1849:30:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 264,
												"name": "owner",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 178,
												"src": "1868:5:2",
												"typeDescriptions": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											],
											"id": 263,
											"name": "selfdestruct",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 685,
											"src": "1855:12:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_selfdestruct_nonpayable$_t_address_$returns$__$",
												"typeString": "function (address)"
											}
										},
										"id": 265,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "1855:19:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 266,
									"nodeType": "ExpressionStatement",
									"src": "1855:19:2"
								}
							]
						},
						"id": 268,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [
							{
								"arguments": [],
								"id": 261,
								"modifierName": {
									"argumentTypes": null,
									"id": 260,
									"name": "onlyOwner",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 189,
									"src": "1839:9:2",
									"typeDescriptions": {
										"typeIdentifier": "t_modifier$__$",
										"typeString": "modifier ()"
									}
								},
								"nodeType": "ModifierInvocation",
								"src": "1839:9:2"
							}
						],
						"name": "kill",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 259,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1829:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 262,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1849:0:2"
						},
						"scope": 667,
						"src": "1816:63:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 275,
							"nodeType": "Block",
							"src": "1999:36:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"id": 273,
										"name": "transactionCounter",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 246,
										"src": "2012:18:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 272,
									"id": 274,
									"nodeType": "Return",
									"src": "2005:25:2"
								}
							]
						},
						"id": 276,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "getNumberOfTransactions",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 269,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1969:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 272,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 271,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 276,
									"src": "1993:4:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 270,
										"name": "uint",
										"nodeType": "ElementaryTypeName",
										"src": "1993:4:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "1992:6:2"
						},
						"scope": 667,
						"src": "1937:98:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 361,
							"nodeType": "Block",
							"src": "2134:649:2",
							"statements": [
								{
									"assignments": [
										285
									],
									"declarations": [
										{
											"constant": false,
											"id": 285,
											"name": "transactionIds",
											"nodeType": "VariableDeclaration",
											"scope": 362,
											"src": "2168:28:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 283,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2168:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 284,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2168:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 291,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 289,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "2210:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 288,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "2199:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 286,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2203:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 287,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2203:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 290,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "2199:30:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2168:61:2"
								},
								{
									"assignments": [
										293
									],
									"declarations": [
										{
											"constant": false,
											"id": 293,
											"name": "numberOfSales",
											"nodeType": "VariableDeclaration",
											"scope": 362,
											"src": "2236:18:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 292,
												"name": "uint",
												"nodeType": "ElementaryTypeName",
												"src": "2236:4:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 295,
									"initialValue": {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 294,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "2257:1:2",
										"subdenomination": null,
										"typeDescriptions": {
											"typeIdentifier": "t_rational_0_by_1",
											"typeString": "int_const 0"
										},
										"value": "0"
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2236:22:2"
								},
								{
									"body": {
										"id": 327,
										"nodeType": "Block",
										"src": "2344:208:2",
										"statements": [
											{
												"condition": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													"id": 312,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"baseExpression": {
																"argumentTypes": null,
																"id": 306,
																"name": "transactions",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 240,
																"src": "2414:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																	"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																}
															},
															"id": 308,
															"indexExpression": {
																"argumentTypes": null,
																"id": 307,
																"name": "i",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 297,
																"src": "2427:1:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"isConstant": false,
															"isLValue": true,
															"isPure": false,
															"lValueRequested": false,
															"nodeType": "IndexAccess",
															"src": "2414:15:2",
															"typeDescriptions": {
																"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																"typeString": "struct Transaction.TransactionNeoPlace storage ref"
															}
														},
														"id": 309,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "seller",
														"nodeType": "MemberAccess",
														"referencedDeclaration": 217,
														"src": "2414:22:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"id": 310,
															"name": "msg",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 679,
															"src": "2440:3:2",
															"typeDescriptions": {
																"typeIdentifier": "t_magic_message",
																"typeString": "msg"
															}
														},
														"id": 311,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "sender",
														"nodeType": "MemberAccess",
														"referencedDeclaration": null,
														"src": "2440:10:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"src": "2414:36:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"falseBody": null,
												"id": 326,
												"nodeType": "IfStatement",
												"src": "2411:135:2",
												"trueBody": {
													"id": 325,
													"nodeType": "Block",
													"src": "2452:94:2",
													"statements": [
														{
															"expression": {
																"argumentTypes": null,
																"id": 320,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 313,
																		"name": "transactionIds",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 285,
																		"src": "2462:14:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																			"typeString": "uint256[] memory"
																		}
																	},
																	"id": 315,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 314,
																		"name": "numberOfSales",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 293,
																		"src": "2477:13:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"nodeType": "IndexAccess",
																	"src": "2462:29:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"expression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 316,
																			"name": "transactions",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 240,
																			"src": "2494:12:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																				"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																			}
																		},
																		"id": 318,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 317,
																			"name": "i",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 297,
																			"src": "2507:1:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "2494:15:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																			"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																		}
																	},
																	"id": 319,
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"memberName": "id",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": 215,
																	"src": "2494:18:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"src": "2462:50:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 321,
															"nodeType": "ExpressionStatement",
															"src": "2462:50:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 323,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"nodeType": "UnaryOperation",
																"operator": "++",
																"prefix": false,
																"src": "2522:15:2",
																"subExpression": {
																	"argumentTypes": null,
																	"id": 322,
																	"name": "numberOfSales",
																	"nodeType": "Identifier",
																	"overloadedDeclarations": [],
																	"referencedDeclaration": 293,
																	"src": "2522:13:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 324,
															"nodeType": "ExpressionStatement",
															"src": "2522:15:2"
														}
													]
												}
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 302,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 300,
											"name": "i",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 297,
											"src": "2314:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<=",
										"rightExpression": {
											"argumentTypes": null,
											"id": 301,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "2319:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "2314:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 328,
									"initializationExpression": {
										"assignments": [
											297
										],
										"declarations": [
											{
												"constant": false,
												"id": 297,
												"name": "i",
												"nodeType": "VariableDeclaration",
												"scope": 362,
												"src": "2302:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 296,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2302:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 299,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "31",
											"id": 298,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "2311:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_1_by_1",
												"typeString": "int_const 1"
											},
											"value": "1"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "2302:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 304,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "2339:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 303,
												"name": "i",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 297,
												"src": "2339:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 305,
										"nodeType": "ExpressionStatement",
										"src": "2339:3:2"
									},
									"nodeType": "ForStatement",
									"src": "2298:254:2"
								},
								{
									"assignments": [
										332
									],
									"declarations": [
										{
											"constant": false,
											"id": 332,
											"name": "sales",
											"nodeType": "VariableDeclaration",
											"scope": 362,
											"src": "2625:19:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 330,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2625:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 331,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2625:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 338,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 336,
												"name": "numberOfSales",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 293,
												"src": "2658:13:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 335,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "2647:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 333,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2651:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 334,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2651:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 337,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "2647:25:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2625:47:2"
								},
								{
									"body": {
										"id": 357,
										"nodeType": "Block",
										"src": "2718:43:2",
										"statements": [
											{
												"expression": {
													"argumentTypes": null,
													"id": 355,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 349,
															"name": "sales",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 332,
															"src": "2726:5:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 351,
														"indexExpression": {
															"argumentTypes": null,
															"id": 350,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 340,
															"src": "2732:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": true,
														"nodeType": "IndexAccess",
														"src": "2726:8:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "Assignment",
													"operator": "=",
													"rightHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 352,
															"name": "transactionIds",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 285,
															"src": "2737:14:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 354,
														"indexExpression": {
															"argumentTypes": null,
															"id": 353,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 340,
															"src": "2752:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"nodeType": "IndexAccess",
														"src": "2737:17:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"src": "2726:28:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 356,
												"nodeType": "ExpressionStatement",
												"src": "2726:28:2"
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 345,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 343,
											"name": "j",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 340,
											"src": "2694:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<",
										"rightExpression": {
											"argumentTypes": null,
											"id": 344,
											"name": "numberOfSales",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 293,
											"src": "2698:13:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "2694:17:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 358,
									"initializationExpression": {
										"assignments": [
											340
										],
										"declarations": [
											{
												"constant": false,
												"id": 340,
												"name": "j",
												"nodeType": "VariableDeclaration",
												"scope": 362,
												"src": "2682:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 339,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2682:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 342,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 341,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "2691:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "2682:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 347,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "2713:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 346,
												"name": "j",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 340,
												"src": "2713:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 348,
										"nodeType": "ExpressionStatement",
										"src": "2713:3:2"
									},
									"nodeType": "ForStatement",
									"src": "2678:83:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 359,
										"name": "sales",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 332,
										"src": "2773:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
											"typeString": "uint256[] memory"
										}
									},
									"functionReturnParameters": 281,
									"id": 360,
									"nodeType": "Return",
									"src": "2766:12:2"
								}
							]
						},
						"id": 362,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "getSales",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 277,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "2102:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 281,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 280,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 362,
									"src": "2126:6:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
										"typeString": "uint256[] memory"
									},
									"typeName": {
										"baseType": {
											"id": 278,
											"name": "uint",
											"nodeType": "ElementaryTypeName",
											"src": "2126:4:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 279,
										"length": null,
										"nodeType": "ArrayTypeName",
										"src": "2126:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
											"typeString": "uint256[] storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "2125:8:2"
						},
						"scope": 667,
						"src": "2085:698:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 447,
							"nodeType": "Block",
							"src": "2889:630:2",
							"statements": [
								{
									"assignments": [
										371
									],
									"declarations": [
										{
											"constant": false,
											"id": 371,
											"name": "transactionIds",
											"nodeType": "VariableDeclaration",
											"scope": 448,
											"src": "2923:28:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 369,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2923:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 370,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2923:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 377,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 375,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "2965:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 374,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "2954:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 372,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2958:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 373,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2958:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 376,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "2954:30:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2923:61:2"
								},
								{
									"assignments": [
										379
									],
									"declarations": [
										{
											"constant": false,
											"id": 379,
											"name": "numberOfBuy",
											"nodeType": "VariableDeclaration",
											"scope": 448,
											"src": "2991:16:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 378,
												"name": "uint",
												"nodeType": "ElementaryTypeName",
												"src": "2991:4:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 381,
									"initialValue": {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 380,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "3010:1:2",
										"subdenomination": null,
										"typeDescriptions": {
											"typeIdentifier": "t_rational_0_by_1",
											"typeString": "int_const 0"
										},
										"value": "0"
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2991:20:2"
								},
								{
									"body": {
										"id": 413,
										"nodeType": "Block",
										"src": "3097:203:2",
										"statements": [
											{
												"condition": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													"id": 398,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"baseExpression": {
																"argumentTypes": null,
																"id": 392,
																"name": "transactions",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 240,
																"src": "3167:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																	"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																}
															},
															"id": 394,
															"indexExpression": {
																"argumentTypes": null,
																"id": 393,
																"name": "i",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 383,
																"src": "3180:1:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"isConstant": false,
															"isLValue": true,
															"isPure": false,
															"lValueRequested": false,
															"nodeType": "IndexAccess",
															"src": "3167:15:2",
															"typeDescriptions": {
																"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																"typeString": "struct Transaction.TransactionNeoPlace storage ref"
															}
														},
														"id": 395,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "buyer",
														"nodeType": "MemberAccess",
														"referencedDeclaration": 219,
														"src": "3167:21:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"id": 396,
															"name": "msg",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 679,
															"src": "3192:3:2",
															"typeDescriptions": {
																"typeIdentifier": "t_magic_message",
																"typeString": "msg"
															}
														},
														"id": 397,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "sender",
														"nodeType": "MemberAccess",
														"referencedDeclaration": null,
														"src": "3192:10:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"src": "3167:35:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"falseBody": null,
												"id": 412,
												"nodeType": "IfStatement",
												"src": "3164:130:2",
												"trueBody": {
													"id": 411,
													"nodeType": "Block",
													"src": "3204:90:2",
													"statements": [
														{
															"expression": {
																"argumentTypes": null,
																"id": 406,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 399,
																		"name": "transactionIds",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 371,
																		"src": "3214:14:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																			"typeString": "uint256[] memory"
																		}
																	},
																	"id": 401,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 400,
																		"name": "numberOfBuy",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 379,
																		"src": "3229:11:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"nodeType": "IndexAccess",
																	"src": "3214:27:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"expression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 402,
																			"name": "transactions",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 240,
																			"src": "3244:12:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																				"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																			}
																		},
																		"id": 404,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 403,
																			"name": "i",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 383,
																			"src": "3257:1:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "3244:15:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																			"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																		}
																	},
																	"id": 405,
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"memberName": "id",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": 215,
																	"src": "3244:18:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"src": "3214:48:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 407,
															"nodeType": "ExpressionStatement",
															"src": "3214:48:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 409,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"nodeType": "UnaryOperation",
																"operator": "++",
																"prefix": false,
																"src": "3272:13:2",
																"subExpression": {
																	"argumentTypes": null,
																	"id": 408,
																	"name": "numberOfBuy",
																	"nodeType": "Identifier",
																	"overloadedDeclarations": [],
																	"referencedDeclaration": 379,
																	"src": "3272:11:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 410,
															"nodeType": "ExpressionStatement",
															"src": "3272:13:2"
														}
													]
												}
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 388,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 386,
											"name": "i",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 383,
											"src": "3067:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<=",
										"rightExpression": {
											"argumentTypes": null,
											"id": 387,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "3072:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "3067:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 414,
									"initializationExpression": {
										"assignments": [
											383
										],
										"declarations": [
											{
												"constant": false,
												"id": 383,
												"name": "i",
												"nodeType": "VariableDeclaration",
												"scope": 448,
												"src": "3055:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 382,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3055:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 385,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "31",
											"id": 384,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "3064:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_1_by_1",
												"typeString": "int_const 1"
											},
											"value": "1"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "3055:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 390,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "3092:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 389,
												"name": "i",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 383,
												"src": "3092:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 391,
										"nodeType": "ExpressionStatement",
										"src": "3092:3:2"
									},
									"nodeType": "ForStatement",
									"src": "3051:249:2"
								},
								{
									"assignments": [
										418
									],
									"declarations": [
										{
											"constant": false,
											"id": 418,
											"name": "buy",
											"nodeType": "VariableDeclaration",
											"scope": 448,
											"src": "3371:17:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 416,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3371:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 417,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "3371:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 424,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 422,
												"name": "numberOfBuy",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 379,
												"src": "3402:11:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 421,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "3391:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 419,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3395:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 420,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "3395:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 423,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3391:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "3371:43:2"
								},
								{
									"body": {
										"id": 443,
										"nodeType": "Block",
										"src": "3458:41:2",
										"statements": [
											{
												"expression": {
													"argumentTypes": null,
													"id": 441,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 435,
															"name": "buy",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 418,
															"src": "3466:3:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 437,
														"indexExpression": {
															"argumentTypes": null,
															"id": 436,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 426,
															"src": "3470:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": true,
														"nodeType": "IndexAccess",
														"src": "3466:6:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "Assignment",
													"operator": "=",
													"rightHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 438,
															"name": "transactionIds",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 371,
															"src": "3475:14:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 440,
														"indexExpression": {
															"argumentTypes": null,
															"id": 439,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 426,
															"src": "3490:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"nodeType": "IndexAccess",
														"src": "3475:17:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"src": "3466:26:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 442,
												"nodeType": "ExpressionStatement",
												"src": "3466:26:2"
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 431,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 429,
											"name": "j",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 426,
											"src": "3436:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<",
										"rightExpression": {
											"argumentTypes": null,
											"id": 430,
											"name": "numberOfBuy",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 379,
											"src": "3440:11:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "3436:15:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 444,
									"initializationExpression": {
										"assignments": [
											426
										],
										"declarations": [
											{
												"constant": false,
												"id": 426,
												"name": "j",
												"nodeType": "VariableDeclaration",
												"scope": 448,
												"src": "3424:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 425,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3424:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 428,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 427,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "3433:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "3424:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 433,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "3453:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 432,
												"name": "j",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 426,
												"src": "3453:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 434,
										"nodeType": "ExpressionStatement",
										"src": "3453:3:2"
									},
									"nodeType": "ForStatement",
									"src": "3420:79:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 445,
										"name": "buy",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 418,
										"src": "3511:3:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
											"typeString": "uint256[] memory"
										}
									},
									"functionReturnParameters": 367,
									"id": 446,
									"nodeType": "Return",
									"src": "3504:10:2"
								}
							]
						},
						"id": 448,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "getPurchases",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 363,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "2857:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 367,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 366,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 448,
									"src": "2881:6:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
										"typeString": "uint256[] memory"
									},
									"typeName": {
										"baseType": {
											"id": 364,
											"name": "uint",
											"nodeType": "ElementaryTypeName",
											"src": "2881:4:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 365,
										"length": null,
										"nodeType": "ArrayTypeName",
										"src": "2881:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
											"typeString": "uint256[] storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "2880:8:2"
						},
						"scope": 667,
						"src": "2836:683:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 560,
							"nodeType": "Block",
							"src": "3727:947:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												"id": 470,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"id": 468,
													"name": "_seller",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 450,
													"src": "3765:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "!=",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "307830",
													"id": 469,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3776:3:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0x0"
												},
												"src": "3765:14:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 467,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3757:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 471,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3757:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 472,
									"nodeType": "ExpressionStatement",
									"src": "3757:23:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												"id": 477,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 474,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "3840:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 475,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "sender",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3840:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "!=",
												"rightExpression": {
													"argumentTypes": null,
													"id": 476,
													"name": "_seller",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 450,
													"src": "3854:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"src": "3840:21:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 473,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3832:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 478,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3832:30:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 479,
									"nodeType": "ExpressionStatement",
									"src": "3832:30:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint8",
													"typeString": "uint8"
												},
												"id": 484,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 481,
														"name": "_itemId",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 452,
														"src": "3877:7:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes16",
															"typeString": "bytes16"
														}
													},
													"id": 482,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3877:14:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint8",
														"typeString": "uint8"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 483,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3894:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3877:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 480,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3869:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 485,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3869:27:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 486,
									"nodeType": "ExpressionStatement",
									"src": "3869:27:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint8",
													"typeString": "uint8"
												},
												"id": 491,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 488,
														"name": "_typeItem",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 454,
														"src": "3910:9:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes8",
															"typeString": "bytes8"
														}
													},
													"id": 489,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3910:16:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint8",
														"typeString": "uint8"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 490,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3929:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3910:20:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 487,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3902:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 492,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3902:29:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 493,
									"nodeType": "ExpressionStatement",
									"src": "3902:29:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 500,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"arguments": [
															{
																"argumentTypes": null,
																"id": 496,
																"name": "_location",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 456,
																"src": "3951:9:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															}
														],
														"expression": {
															"argumentTypes": [
																{
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															],
															"id": 495,
															"isConstant": false,
															"isLValue": false,
															"isPure": true,
															"lValueRequested": false,
															"nodeType": "ElementaryTypeNameExpression",
															"src": "3945:5:2",
															"typeDescriptions": {
																"typeIdentifier": "t_type$_t_bytes_storage_ptr_$",
																"typeString": "type(bytes storage pointer)"
															},
															"typeName": "bytes"
														},
														"id": 497,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"kind": "typeConversion",
														"lValueRequested": false,
														"names": [],
														"nodeType": "FunctionCall",
														"src": "3945:16:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes_memory",
															"typeString": "bytes memory"
														}
													},
													"id": 498,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3945:23:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 499,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3971:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3945:27:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 494,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3937:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 501,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3937:36:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 502,
									"nodeType": "ExpressionStatement",
									"src": "3937:36:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 509,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"arguments": [
															{
																"argumentTypes": null,
																"id": 505,
																"name": "_pictureHash",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 458,
																"src": "3993:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															}
														],
														"expression": {
															"argumentTypes": [
																{
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															],
															"id": 504,
															"isConstant": false,
															"isLValue": false,
															"isPure": true,
															"lValueRequested": false,
															"nodeType": "ElementaryTypeNameExpression",
															"src": "3987:5:2",
															"typeDescriptions": {
																"typeIdentifier": "t_type$_t_bytes_storage_ptr_$",
																"typeString": "type(bytes storage pointer)"
															},
															"typeName": "bytes"
														},
														"id": 506,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"kind": "typeConversion",
														"lValueRequested": false,
														"names": [],
														"nodeType": "FunctionCall",
														"src": "3987:19:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes_memory",
															"typeString": "bytes memory"
														}
													},
													"id": 507,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3987:26:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 508,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "4016:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3987:30:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 503,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3979:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 510,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3979:39:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 511,
									"nodeType": "ExpressionStatement",
									"src": "3979:39:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 516,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 513,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "4076:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 514,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "value",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "4076:9:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "==",
												"rightExpression": {
													"argumentTypes": null,
													"id": 515,
													"name": "_price",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 464,
													"src": "4089:6:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"src": "4076:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 512,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "4068:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 517,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "4068:28:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 518,
									"nodeType": "ExpressionStatement",
									"src": "4068:28:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 527,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"baseExpression": {
												"argumentTypes": null,
												"id": 519,
												"name": "fundsLocked",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 244,
												"src": "4179:11:2",
												"typeDescriptions": {
													"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
													"typeString": "mapping(bytes16 => uint256)"
												}
											},
											"id": 521,
											"indexExpression": {
												"argumentTypes": null,
												"id": 520,
												"name": "_itemId",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 452,
												"src": "4191:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes16",
													"typeString": "bytes16"
												}
											},
											"isConstant": false,
											"isLValue": true,
											"isPure": false,
											"lValueRequested": true,
											"nodeType": "IndexAccess",
											"src": "4179:20:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"commonType": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"id": 526,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"leftExpression": {
												"argumentTypes": null,
												"baseExpression": {
													"argumentTypes": null,
													"id": 522,
													"name": "fundsLocked",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 244,
													"src": "4200:11:2",
													"typeDescriptions": {
														"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
														"typeString": "mapping(bytes16 => uint256)"
													}
												},
												"id": 524,
												"indexExpression": {
													"argumentTypes": null,
													"id": 523,
													"name": "_itemId",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 452,
													"src": "4212:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													}
												},
												"isConstant": false,
												"isLValue": true,
												"isPure": false,
												"lValueRequested": false,
												"nodeType": "IndexAccess",
												"src": "4200:20:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"nodeType": "BinaryOperation",
											"operator": "+",
											"rightExpression": {
												"argumentTypes": null,
												"id": 525,
												"name": "_price",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 464,
												"src": "4223:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"src": "4200:29:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "4179:50:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"id": 528,
									"nodeType": "ExpressionStatement",
									"src": "4179:50:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 530,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"nodeType": "UnaryOperation",
										"operator": "++",
										"prefix": false,
										"src": "4259:20:2",
										"subExpression": {
											"argumentTypes": null,
											"id": 529,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "4259:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"id": 531,
									"nodeType": "ExpressionStatement",
									"src": "4259:20:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 549,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"baseExpression": {
												"argumentTypes": null,
												"id": 532,
												"name": "transactions",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 240,
												"src": "4319:12:2",
												"typeDescriptions": {
													"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
													"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
												}
											},
											"id": 534,
											"indexExpression": {
												"argumentTypes": null,
												"id": 533,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "4332:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"isConstant": false,
											"isLValue": true,
											"isPure": false,
											"lValueRequested": true,
											"nodeType": "IndexAccess",
											"src": "4319:32:2",
											"typeDescriptions": {
												"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
												"typeString": "struct Transaction.TransactionNeoPlace storage ref"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"arguments": [
												{
													"argumentTypes": null,
													"id": 536,
													"name": "transactionCounter",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 246,
													"src": "4381:18:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												{
													"argumentTypes": null,
													"id": 537,
													"name": "_seller",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 450,
													"src": "4407:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												{
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 538,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "4422:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 539,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "sender",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "4422:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												{
													"argumentTypes": null,
													"id": 540,
													"name": "_itemId",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 452,
													"src": "4440:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													}
												},
												{
													"argumentTypes": null,
													"id": 541,
													"name": "_typeItem",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 454,
													"src": "4455:9:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													}
												},
												{
													"argumentTypes": null,
													"id": 542,
													"name": "_location",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 456,
													"src": "4472:9:2",
													"typeDescriptions": {
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													}
												},
												{
													"argumentTypes": null,
													"id": 543,
													"name": "_pictureHash",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 458,
													"src": "4489:12:2",
													"typeDescriptions": {
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													}
												},
												{
													"argumentTypes": null,
													"hexValue": "",
													"id": 544,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "string",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "4509:2:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
														"typeString": "literal_string \"\""
													},
													"value": ""
												},
												{
													"argumentTypes": null,
													"id": 545,
													"name": "_comment",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 460,
													"src": "4519:8:2",
													"typeDescriptions": {
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													}
												},
												{
													"argumentTypes": null,
													"id": 546,
													"name": "_status",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 462,
													"src": "4535:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													}
												},
												{
													"argumentTypes": null,
													"id": 547,
													"name": "_price",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 464,
													"src": "4550:6:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												}
											],
											"expression": {
												"argumentTypes": [
													{
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													},
													{
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													{
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													{
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													},
													{
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													},
													{
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													},
													{
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													},
													{
														"typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
														"typeString": "literal_string \"\""
													},
													{
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													},
													{
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													},
													{
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												],
												"id": 535,
												"name": "TransactionNeoPlace",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 236,
												"src": "4354:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_type$_t_struct$_TransactionNeoPlace_$236_storage_ptr_$",
													"typeString": "type(struct Transaction.TransactionNeoPlace storage pointer)"
												}
											},
											"id": 548,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"kind": "structConstructorCall",
											"lValueRequested": false,
											"names": [],
											"nodeType": "FunctionCall",
											"src": "4354:208:2",
											"typeDescriptions": {
												"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_memory",
												"typeString": "struct Transaction.TransactionNeoPlace memory"
											}
										},
										"src": "4319:243:2",
										"typeDescriptions": {
											"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
											"typeString": "struct Transaction.TransactionNeoPlace storage ref"
										}
									},
									"id": 550,
									"nodeType": "ExpressionStatement",
									"src": "4319:243:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 552,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "4612:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											{
												"argumentTypes": null,
												"id": 553,
												"name": "_itemId",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 452,
												"src": "4632:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes16",
													"typeString": "bytes16"
												}
											},
											{
												"argumentTypes": null,
												"id": 554,
												"name": "_seller",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 450,
												"src": "4641:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											},
											{
												"argumentTypes": null,
												"expression": {
													"argumentTypes": null,
													"id": 555,
													"name": "msg",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 679,
													"src": "4650:3:2",
													"typeDescriptions": {
														"typeIdentifier": "t_magic_message",
														"typeString": "msg"
													}
												},
												"id": 556,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"memberName": "sender",
												"nodeType": "MemberAccess",
												"referencedDeclaration": null,
												"src": "4650:10:2",
												"typeDescriptions": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											},
											{
												"argumentTypes": null,
												"id": 557,
												"name": "_price",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 464,
												"src": "4662:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												{
													"typeIdentifier": "t_bytes16",
													"typeString": "bytes16"
												},
												{
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												{
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 551,
											"name": "BuyItem",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 258,
											"src": "4604:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_event_nonpayable$_t_uint256_$_t_bytes16_$_t_address_$_t_address_$_t_uint256_$returns$__$",
												"typeString": "function (uint256,bytes16,address,address,uint256)"
											}
										},
										"id": 558,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "4604:65:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 559,
									"nodeType": "ExpressionStatement",
									"src": "4604:65:2"
								}
							]
						},
						"id": 561,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "buyItem",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 465,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 450,
									"name": "_seller",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3572:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 449,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "3572:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 452,
									"name": "_itemId",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3589:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									},
									"typeName": {
										"id": 451,
										"name": "bytes16",
										"nodeType": "ElementaryTypeName",
										"src": "3589:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes16",
											"typeString": "bytes16"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 454,
									"name": "_typeItem",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3606:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									},
									"typeName": {
										"id": 453,
										"name": "bytes8",
										"nodeType": "ElementaryTypeName",
										"src": "3606:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes8",
											"typeString": "bytes8"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 456,
									"name": "_location",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3624:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 455,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "3624:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 458,
									"name": "_pictureHash",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3642:19:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 457,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "3642:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 460,
									"name": "_comment",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3663:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 459,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "3663:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 462,
									"name": "_status",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3680:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									},
									"typeName": {
										"id": 461,
										"name": "bytes8",
										"nodeType": "ElementaryTypeName",
										"src": "3680:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes8",
											"typeString": "bytes8"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 464,
									"name": "_price",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3696:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 463,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "3696:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "3571:140:2"
						},
						"payable": true,
						"returnParameters": {
							"id": 466,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "3727:0:2"
						},
						"scope": 667,
						"src": "3555:1119:2",
						"stateMutability": "payable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 642,
							"nodeType": "Block",
							"src": "4724:552:2",
							"statements": [
								{
									"body": {
										"id": 640,
										"nodeType": "Block",
										"src": "4777:495:2",
										"statements": [
											{
												"condition": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													},
													"id": 581,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"baseExpression": {
																"argumentTypes": null,
																"id": 576,
																"name": "transactions",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 240,
																"src": "4788:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																	"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																}
															},
															"id": 578,
															"indexExpression": {
																"argumentTypes": null,
																"id": 577,
																"name": "i",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 567,
																"src": "4801:1:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"isConstant": false,
															"isLValue": true,
															"isPure": false,
															"lValueRequested": false,
															"nodeType": "IndexAccess",
															"src": "4788:15:2",
															"typeDescriptions": {
																"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																"typeString": "struct Transaction.TransactionNeoPlace storage ref"
															}
														},
														"id": 579,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "itemId",
														"nodeType": "MemberAccess",
														"referencedDeclaration": 221,
														"src": "4788:22:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes16",
															"typeString": "bytes16"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"id": 580,
														"name": "_itemId",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 563,
														"src": "4814:7:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes16",
															"typeString": "bytes16"
														}
													},
													"src": "4788:33:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"falseBody": null,
												"id": 639,
												"nodeType": "IfStatement",
												"src": "4785:481:2",
												"trueBody": {
													"id": 638,
													"nodeType": "Block",
													"src": "4823:443:2",
													"statements": [
														{
															"assignments": [
																583
															],
															"declarations": [
																{
																	"constant": false,
																	"id": 583,
																	"name": "buyer",
																	"nodeType": "VariableDeclaration",
																	"scope": 643,
																	"src": "4834:13:2",
																	"stateVariable": false,
																	"storageLocation": "default",
																	"typeDescriptions": {
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	"typeName": {
																		"id": 582,
																		"name": "address",
																		"nodeType": "ElementaryTypeName",
																		"src": "4834:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_address",
																			"typeString": "address"
																		}
																	},
																	"value": null,
																	"visibility": "internal"
																}
															],
															"id": 588,
															"initialValue": {
																"argumentTypes": null,
																"expression": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 584,
																		"name": "transactions",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 240,
																		"src": "4850:12:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																			"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																		}
																	},
																	"id": 586,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 585,
																		"name": "i",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 567,
																		"src": "4863:1:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"nodeType": "IndexAccess",
																	"src": "4850:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																		"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																	}
																},
																"id": 587,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"memberName": "buyer",
																"nodeType": "MemberAccess",
																"referencedDeclaration": 219,
																"src": "4850:21:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_address",
																	"typeString": "address"
																}
															},
															"nodeType": "VariableDeclarationStatement",
															"src": "4834:37:2"
														},
														{
															"assignments": [
																590
															],
															"declarations": [
																{
																	"constant": false,
																	"id": 590,
																	"name": "seller",
																	"nodeType": "VariableDeclaration",
																	"scope": 643,
																	"src": "4881:14:2",
																	"stateVariable": false,
																	"storageLocation": "default",
																	"typeDescriptions": {
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	"typeName": {
																		"id": 589,
																		"name": "address",
																		"nodeType": "ElementaryTypeName",
																		"src": "4881:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_address",
																			"typeString": "address"
																		}
																	},
																	"value": null,
																	"visibility": "internal"
																}
															],
															"id": 595,
															"initialValue": {
																"argumentTypes": null,
																"expression": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 591,
																		"name": "transactions",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 240,
																		"src": "4898:12:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																			"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																		}
																	},
																	"id": 593,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 592,
																		"name": "i",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 567,
																		"src": "4911:1:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"nodeType": "IndexAccess",
																	"src": "4898:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																		"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																	}
																},
																"id": 594,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"memberName": "seller",
																"nodeType": "MemberAccess",
																"referencedDeclaration": 217,
																"src": "4898:22:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_address",
																	"typeString": "address"
																}
															},
															"nodeType": "VariableDeclarationStatement",
															"src": "4881:39:2"
														},
														{
															"assignments": [
																597
															],
															"declarations": [
																{
																	"constant": false,
																	"id": 597,
																	"name": "priceTransaction",
																	"nodeType": "VariableDeclaration",
																	"scope": 643,
																	"src": "4930:24:2",
																	"stateVariable": false,
																	"storageLocation": "default",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	"typeName": {
																		"id": 596,
																		"name": "uint256",
																		"nodeType": "ElementaryTypeName",
																		"src": "4930:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"value": null,
																	"visibility": "internal"
																}
															],
															"id": 602,
															"initialValue": {
																"argumentTypes": null,
																"expression": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 598,
																		"name": "transactions",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 240,
																		"src": "4957:12:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																			"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																		}
																	},
																	"id": 600,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 599,
																		"name": "i",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 567,
																		"src": "4970:1:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"nodeType": "IndexAccess",
																	"src": "4957:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																		"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																	}
																},
																"id": 601,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"memberName": "_price",
																"nodeType": "MemberAccess",
																"referencedDeclaration": 235,
																"src": "4957:22:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"nodeType": "VariableDeclarationStatement",
															"src": "4930:49:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"arguments": [
																	{
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"id": 608,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"leftExpression": {
																			"argumentTypes": null,
																			"baseExpression": {
																				"argumentTypes": null,
																				"id": 604,
																				"name": "fundsLocked",
																				"nodeType": "Identifier",
																				"overloadedDeclarations": [],
																				"referencedDeclaration": 244,
																				"src": "4998:11:2",
																				"typeDescriptions": {
																					"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
																					"typeString": "mapping(bytes16 => uint256)"
																				}
																			},
																			"id": 606,
																			"indexExpression": {
																				"argumentTypes": null,
																				"id": 605,
																				"name": "_itemId",
																				"nodeType": "Identifier",
																				"overloadedDeclarations": [],
																				"referencedDeclaration": 563,
																				"src": "5010:7:2",
																				"typeDescriptions": {
																					"typeIdentifier": "t_bytes16",
																					"typeString": "bytes16"
																				}
																			},
																			"isConstant": false,
																			"isLValue": true,
																			"isPure": false,
																			"lValueRequested": false,
																			"nodeType": "IndexAccess",
																			"src": "4998:20:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"nodeType": "BinaryOperation",
																		"operator": ">",
																		"rightExpression": {
																			"argumentTypes": null,
																			"hexValue": "30",
																			"id": 607,
																			"isConstant": false,
																			"isLValue": false,
																			"isPure": true,
																			"kind": "number",
																			"lValueRequested": false,
																			"nodeType": "Literal",
																			"src": "5019:1:2",
																			"subdenomination": null,
																			"typeDescriptions": {
																				"typeIdentifier": "t_rational_0_by_1",
																				"typeString": "int_const 0"
																			},
																			"value": "0"
																		},
																		"src": "4998:22:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_bool",
																			"typeString": "bool"
																		}
																	}
																],
																"expression": {
																	"argumentTypes": [
																		{
																			"typeIdentifier": "t_bool",
																			"typeString": "bool"
																		}
																	],
																	"id": 603,
																	"name": "require",
																	"nodeType": "Identifier",
																	"overloadedDeclarations": [],
																	"referencedDeclaration": 682,
																	"src": "4990:7:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
																		"typeString": "function (bool) pure"
																	}
																},
																"id": 609,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"kind": "functionCall",
																"lValueRequested": false,
																"names": [],
																"nodeType": "FunctionCall",
																"src": "4990:31:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_tuple$__$",
																	"typeString": "tuple()"
																}
															},
															"id": 610,
															"nodeType": "ExpressionStatement",
															"src": "4990:31:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 620,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 611,
																		"name": "fundsLocked",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 244,
																		"src": "5031:11:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
																			"typeString": "mapping(bytes16 => uint256)"
																		}
																	},
																	"id": 613,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 612,
																		"name": "_itemId",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 563,
																		"src": "5043:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_bytes16",
																			"typeString": "bytes16"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"nodeType": "IndexAccess",
																	"src": "5031:20:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"commonType": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	"id": 619,
																	"isConstant": false,
																	"isLValue": false,
																	"isPure": false,
																	"lValueRequested": false,
																	"leftExpression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 614,
																			"name": "fundsLocked",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 244,
																			"src": "5052:11:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
																				"typeString": "mapping(bytes16 => uint256)"
																			}
																		},
																		"id": 616,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 615,
																			"name": "_itemId",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 563,
																			"src": "5064:7:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_bytes16",
																				"typeString": "bytes16"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "5052:20:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"nodeType": "BinaryOperation",
																	"operator": "-",
																	"rightExpression": {
																		"argumentTypes": null,
																		"components": [
																			{
																				"argumentTypes": null,
																				"id": 617,
																				"name": "priceTransaction",
																				"nodeType": "Identifier",
																				"overloadedDeclarations": [],
																				"referencedDeclaration": 597,
																				"src": "5076:16:2",
																				"typeDescriptions": {
																					"typeIdentifier": "t_uint256",
																					"typeString": "uint256"
																				}
																			}
																		],
																		"id": 618,
																		"isConstant": false,
																		"isInlineArray": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "TupleExpression",
																		"src": "5075:18:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"src": "5052:41:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"src": "5031:62:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 621,
															"nodeType": "ExpressionStatement",
															"src": "5031:62:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"arguments": [
																	{
																		"argumentTypes": null,
																		"id": 625,
																		"name": "priceTransaction",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 597,
																		"src": "5166:16:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	}
																],
																"expression": {
																	"argumentTypes": [
																		{
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	],
																	"expression": {
																		"argumentTypes": null,
																		"id": 622,
																		"name": "seller",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 590,
																		"src": "5150:6:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_address",
																			"typeString": "address"
																		}
																	},
																	"id": 624,
																	"isConstant": false,
																	"isLValue": false,
																	"isPure": false,
																	"lValueRequested": false,
																	"memberName": "transfer",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": null,
																	"src": "5150:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
																		"typeString": "function (uint256)"
																	}
																},
																"id": 626,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"kind": "functionCall",
																"lValueRequested": false,
																"names": [],
																"nodeType": "FunctionCall",
																"src": "5150:33:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_tuple$__$",
																	"typeString": "tuple()"
																}
															},
															"id": 627,
															"nodeType": "ExpressionStatement",
															"src": "5150:33:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 635,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"expression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 628,
																			"name": "transactions",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 240,
																			"src": "5194:12:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																				"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																			}
																		},
																		"id": 630,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 629,
																			"name": "i",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 567,
																			"src": "5207:1:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "5194:15:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																			"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																		}
																	},
																	"id": 631,
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"memberName": "status",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": 233,
																	"src": "5194:22:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_bytes8",
																		"typeString": "bytes8"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"arguments": [
																		{
																			"argumentTypes": null,
																			"hexValue": "70616964",
																			"id": 633,
																			"isConstant": false,
																			"isLValue": false,
																			"isPure": true,
																			"kind": "string",
																			"lValueRequested": false,
																			"nodeType": "Literal",
																			"src": "5234:6:2",
																			"subdenomination": null,
																			"typeDescriptions": {
																				"typeIdentifier": "t_stringliteral_5ab53550295bfc9315c562232d99e75119ebb4d3b8a6e012160126a3506b02a8",
																				"typeString": "literal_string \"paid\""
																			},
																			"value": "paid"
																		}
																	],
																	"expression": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_stringliteral_5ab53550295bfc9315c562232d99e75119ebb4d3b8a6e012160126a3506b02a8",
																				"typeString": "literal_string \"paid\""
																			}
																		],
																		"id": 632,
																		"name": "stringToBytes8",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 666,
																		"src": "5219:14:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_function_internal_nonpayable$_t_string_memory_ptr_$returns$_t_bytes8_$",
																			"typeString": "function (string memory) returns (bytes8)"
																		}
																	},
																	"id": 634,
																	"isConstant": false,
																	"isLValue": false,
																	"isPure": false,
																	"kind": "functionCall",
																	"lValueRequested": false,
																	"names": [],
																	"nodeType": "FunctionCall",
																	"src": "5219:22:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_bytes8",
																		"typeString": "bytes8"
																	}
																},
																"src": "5194:47:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_bytes8",
																	"typeString": "bytes8"
																}
															},
															"id": 636,
															"nodeType": "ExpressionStatement",
															"src": "5194:47:2"
														},
														{
															"id": 637,
															"nodeType": "Break",
															"src": "5252:5:2"
														}
													]
												}
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 572,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 570,
											"name": "i",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 567,
											"src": "4747:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<=",
										"rightExpression": {
											"argumentTypes": null,
											"id": 571,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "4752:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "4747:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 641,
									"initializationExpression": {
										"assignments": [
											567
										],
										"declarations": [
											{
												"constant": false,
												"id": 567,
												"name": "i",
												"nodeType": "VariableDeclaration",
												"scope": 643,
												"src": "4735:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 566,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "4735:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 569,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 568,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "4744:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "4735:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 574,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "4772:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 573,
												"name": "i",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 567,
												"src": "4772:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 575,
										"nodeType": "ExpressionStatement",
										"src": "4772:3:2"
									},
									"nodeType": "ForStatement",
									"src": "4731:541:2"
								}
							]
						},
						"id": 643,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "unlockFunds",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 564,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 563,
									"name": "_itemId",
									"nodeType": "VariableDeclaration",
									"scope": 643,
									"src": "4700:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									},
									"typeName": {
										"id": 562,
										"name": "bytes16",
										"nodeType": "ElementaryTypeName",
										"src": "4700:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes16",
											"typeString": "bytes16"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "4699:17:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 565,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "4724:0:2"
						},
						"scope": 667,
						"src": "4679:597:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 665,
							"nodeType": "Block",
							"src": "5350:186:2",
							"statements": [
								{
									"assignments": [
										651
									],
									"declarations": [
										{
											"constant": false,
											"id": 651,
											"name": "tempEmptyStringTest",
											"nodeType": "VariableDeclaration",
											"scope": 666,
											"src": "5356:32:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_bytes_memory_ptr",
												"typeString": "bytes memory"
											},
											"typeName": {
												"id": 650,
												"name": "bytes",
												"nodeType": "ElementaryTypeName",
												"src": "5356:5:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes_storage_ptr",
													"typeString": "bytes storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 655,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 653,
												"name": "source",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 645,
												"src": "5397:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_string_memory_ptr",
													"typeString": "string memory"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_string_memory_ptr",
													"typeString": "string memory"
												}
											],
											"id": 652,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "ElementaryTypeNameExpression",
											"src": "5391:5:2",
											"typeDescriptions": {
												"typeIdentifier": "t_type$_t_bytes_storage_ptr_$",
												"typeString": "type(bytes storage pointer)"
											},
											"typeName": "bytes"
										},
										"id": 654,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "typeConversion",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "5391:13:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes_memory",
											"typeString": "bytes memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "5356:48:2"
								},
								{
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 659,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"expression": {
												"argumentTypes": null,
												"id": 656,
												"name": "tempEmptyStringTest",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 651,
												"src": "5414:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes_memory_ptr",
													"typeString": "bytes memory"
												}
											},
											"id": 657,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"memberName": "length",
											"nodeType": "MemberAccess",
											"referencedDeclaration": null,
											"src": "5414:26:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "==",
										"rightExpression": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 658,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "5444:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"src": "5414:31:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"falseBody": null,
									"id": 663,
									"nodeType": "IfStatement",
									"src": "5410:62:2",
									"trueBody": {
										"id": 662,
										"nodeType": "Block",
										"src": "5447:25:2",
										"statements": [
											{
												"expression": {
													"argumentTypes": null,
													"hexValue": "307830",
													"id": 660,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "5462:3:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0x0"
												},
												"functionReturnParameters": 649,
												"id": 661,
												"nodeType": "Return",
												"src": "5455:10:2"
											}
										]
									}
								},
								{
									"externalReferences": [
										{
											"result": {
												"declaration": 648,
												"isOffset": false,
												"isSlot": false,
												"src": "5495:6:2",
												"valueSize": 1
											}
										},
										{
											"source": {
												"declaration": 645,
												"isOffset": false,
												"isSlot": false,
												"src": "5515:6:2",
												"valueSize": 1
											}
										}
									],
									"id": 664,
									"nodeType": "InlineAssembly",
									"operations": "{\n    result := mload(add(source, 8))\n}",
									"src": "5478:58:2"
								}
							]
						},
						"id": 666,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "stringToBytes8",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 646,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 645,
									"name": "source",
									"nodeType": "VariableDeclaration",
									"scope": 666,
									"src": "5304:20:2",
									"stateVariable": false,
									"storageLocation": "memory",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 644,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "5304:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "5303:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 649,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 648,
									"name": "result",
									"nodeType": "VariableDeclaration",
									"scope": 666,
									"src": "5335:13:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									},
									"typeName": {
										"id": 647,
										"name": "bytes8",
										"nodeType": "ElementaryTypeName",
										"src": "5335:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes8",
											"typeString": "bytes8"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "5334:15:2"
						},
						"scope": 667,
						"src": "5280:256:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					}
				],
				"scope": 668,
				"src": "1198:4341:2"
			}
		],
		"src": "0:5540:2"
	},
	"legacyAST": {
		"absolutePath": "/D/ivpay2/contracts/Transaction.sol",
		"exportedSymbols": {
			"Ownable": [
				211
			],
			"SafeMath": [
				176
			],
			"Transaction": [
				667
			]
		},
		"id": 668,
		"nodeType": "SourceUnit",
		"nodes": [
			{
				"id": 83,
				"literals": [
					"solidity",
					"^",
					"0.4",
					".19"
				],
				"nodeType": "PragmaDirective",
				"src": "0:24:2"
			},
			{
				"baseContracts": [],
				"contractDependencies": [],
				"contractKind": "library",
				"documentation": null,
				"fullyImplemented": true,
				"id": 176,
				"linearizedBaseContracts": [
					176
				],
				"name": "SafeMath",
				"nodeType": "ContractDefinition",
				"nodes": [
					{
						"body": {
							"id": 112,
							"nodeType": "Block",
							"src": "118:76:2",
							"statements": [
								{
									"assignments": [
										93
									],
									"declarations": [
										{
											"constant": false,
											"id": 93,
											"name": "c",
											"nodeType": "VariableDeclaration",
											"scope": 113,
											"src": "124:9:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 92,
												"name": "uint256",
												"nodeType": "ElementaryTypeName",
												"src": "124:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 97,
									"initialValue": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 96,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 94,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 85,
											"src": "136:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "*",
										"rightExpression": {
											"argumentTypes": null,
											"id": 95,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 87,
											"src": "140:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "136:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "124:17:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												},
												"id": 107,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													},
													"id": 101,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"id": 99,
														"name": "a",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 85,
														"src": "154:1:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"hexValue": "30",
														"id": 100,
														"isConstant": false,
														"isLValue": false,
														"isPure": true,
														"kind": "number",
														"lValueRequested": false,
														"nodeType": "Literal",
														"src": "159:1:2",
														"subdenomination": null,
														"typeDescriptions": {
															"typeIdentifier": "t_rational_0_by_1",
															"typeString": "int_const 0"
														},
														"value": "0"
													},
													"src": "154:6:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "||",
												"rightExpression": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													},
													"id": 106,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"commonType": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														},
														"id": 104,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"leftExpression": {
															"argumentTypes": null,
															"id": 102,
															"name": "c",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 93,
															"src": "164:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"nodeType": "BinaryOperation",
														"operator": "/",
														"rightExpression": {
															"argumentTypes": null,
															"id": 103,
															"name": "a",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 85,
															"src": "168:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"src": "164:5:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"id": 105,
														"name": "b",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 87,
														"src": "173:1:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"src": "164:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"src": "154:20:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 98,
											"name": "assert",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 670,
											"src": "147:6:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 108,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "147:28:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 109,
									"nodeType": "ExpressionStatement",
									"src": "147:28:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 110,
										"name": "c",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 93,
										"src": "188:1:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 91,
									"id": 111,
									"nodeType": "Return",
									"src": "181:8:2"
								}
							]
						},
						"id": 113,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "mul",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 88,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 85,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 113,
									"src": "60:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 84,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "60:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 87,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 113,
									"src": "71:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 86,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "71:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "59:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 91,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 90,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 113,
									"src": "109:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 89,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "109:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "108:9:2"
						},
						"scope": 176,
						"src": "47:147:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 130,
							"nodeType": "Block",
							"src": "269:198:2",
							"statements": [
								{
									"assignments": [
										123
									],
									"declarations": [
										{
											"constant": false,
											"id": 123,
											"name": "c",
											"nodeType": "VariableDeclaration",
											"scope": 131,
											"src": "349:9:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 122,
												"name": "uint256",
												"nodeType": "ElementaryTypeName",
												"src": "349:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 127,
									"initialValue": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 126,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 124,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 115,
											"src": "361:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "/",
										"rightExpression": {
											"argumentTypes": null,
											"id": 125,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 117,
											"src": "365:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "361:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "349:17:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 128,
										"name": "c",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 123,
										"src": "461:1:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 121,
									"id": 129,
									"nodeType": "Return",
									"src": "454:8:2"
								}
							]
						},
						"id": 131,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "div",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 118,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 115,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 131,
									"src": "211:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 114,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "211:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 117,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 131,
									"src": "222:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 116,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "222:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "210:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 121,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 120,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 131,
									"src": "260:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 119,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "260:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "259:9:2"
						},
						"scope": 176,
						"src": "198:269:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 150,
							"nodeType": "Block",
							"src": "542:43:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 143,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"id": 141,
													"name": "b",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 135,
													"src": "555:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "<=",
												"rightExpression": {
													"argumentTypes": null,
													"id": 142,
													"name": "a",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 133,
													"src": "560:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"src": "555:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 140,
											"name": "assert",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 670,
											"src": "548:6:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 144,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "548:14:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 145,
									"nodeType": "ExpressionStatement",
									"src": "548:14:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 148,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 146,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 133,
											"src": "575:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "-",
										"rightExpression": {
											"argumentTypes": null,
											"id": 147,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 135,
											"src": "579:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "575:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 139,
									"id": 149,
									"nodeType": "Return",
									"src": "568:12:2"
								}
							]
						},
						"id": 151,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "sub",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 136,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 133,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 151,
									"src": "484:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 132,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "484:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 135,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 151,
									"src": "495:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 134,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "495:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "483:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 139,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 138,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 151,
									"src": "533:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 137,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "533:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "532:9:2"
						},
						"scope": 176,
						"src": "471:114:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 174,
							"nodeType": "Block",
							"src": "660:62:2",
							"statements": [
								{
									"assignments": [
										161
									],
									"declarations": [
										{
											"constant": false,
											"id": 161,
											"name": "c",
											"nodeType": "VariableDeclaration",
											"scope": 175,
											"src": "666:9:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 160,
												"name": "uint256",
												"nodeType": "ElementaryTypeName",
												"src": "666:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 165,
									"initialValue": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 164,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 162,
											"name": "a",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 153,
											"src": "678:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "+",
										"rightExpression": {
											"argumentTypes": null,
											"id": 163,
											"name": "b",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 155,
											"src": "682:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "678:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "666:17:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 169,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"id": 167,
													"name": "c",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 161,
													"src": "696:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">=",
												"rightExpression": {
													"argumentTypes": null,
													"id": 168,
													"name": "a",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 153,
													"src": "701:1:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"src": "696:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 166,
											"name": "assert",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 670,
											"src": "689:6:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_assert_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 170,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "689:14:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 171,
									"nodeType": "ExpressionStatement",
									"src": "689:14:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 172,
										"name": "c",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 161,
										"src": "716:1:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 159,
									"id": 173,
									"nodeType": "Return",
									"src": "709:8:2"
								}
							]
						},
						"id": 175,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "add",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 156,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 153,
									"name": "a",
									"nodeType": "VariableDeclaration",
									"scope": 175,
									"src": "602:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 152,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "602:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 155,
									"name": "b",
									"nodeType": "VariableDeclaration",
									"scope": 175,
									"src": "613:9:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 154,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "613:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "601:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 159,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 158,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 175,
									"src": "651:7:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 157,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "651:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "650:9:2"
						},
						"scope": 176,
						"src": "589:133:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "internal"
					}
				],
				"scope": 668,
				"src": "26:698:2"
			},
			{
				"baseContracts": [],
				"contractDependencies": [],
				"contractKind": "contract",
				"documentation": null,
				"fullyImplemented": true,
				"id": 211,
				"linearizedBaseContracts": [
					211
				],
				"name": "Ownable",
				"nodeType": "ContractDefinition",
				"nodes": [
					{
						"constant": false,
						"id": 178,
						"name": "owner",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "768:13:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						},
						"typeName": {
							"id": 177,
							"name": "address",
							"nodeType": "ElementaryTypeName",
							"src": "768:7:2",
							"typeDescriptions": {
								"typeIdentifier": "t_address",
								"typeString": "address"
							}
						},
						"value": null,
						"visibility": "internal"
					},
					{
						"body": {
							"id": 188,
							"nodeType": "Block",
							"src": "822:46:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												"id": 184,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 181,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "836:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 182,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "sender",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "836:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "==",
												"rightExpression": {
													"argumentTypes": null,
													"id": 183,
													"name": "owner",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 178,
													"src": "850:5:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"src": "836:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 180,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "828:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 185,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "828:28:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 186,
									"nodeType": "ExpressionStatement",
									"src": "828:28:2"
								},
								{
									"id": 187,
									"nodeType": "PlaceholderStatement",
									"src": "862:1:2"
								}
							]
						},
						"id": 189,
						"name": "onlyOwner",
						"nodeType": "ModifierDefinition",
						"parameters": {
							"id": 179,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "819:2:2"
						},
						"src": "801:67:2",
						"visibility": "internal"
					},
					{
						"body": {
							"id": 197,
							"nodeType": "Block",
							"src": "915:29:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"id": 195,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"id": 192,
											"name": "owner",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 178,
											"src": "921:5:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"expression": {
												"argumentTypes": null,
												"id": 193,
												"name": "msg",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 679,
												"src": "929:3:2",
												"typeDescriptions": {
													"typeIdentifier": "t_magic_message",
													"typeString": "msg"
												}
											},
											"id": 194,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"memberName": "sender",
											"nodeType": "MemberAccess",
											"referencedDeclaration": null,
											"src": "929:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"src": "921:18:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"id": 196,
									"nodeType": "ExpressionStatement",
									"src": "921:18:2"
								}
							]
						},
						"id": 198,
						"implemented": true,
						"isConstructor": true,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "Ownable",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 190,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "905:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 191,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "915:0:2"
						},
						"scope": 211,
						"src": "889:55:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 209,
							"nodeType": "Block",
							"src": "1166:27:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"id": 207,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"id": 205,
											"name": "owner",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 178,
											"src": "1172:5:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"id": 206,
											"name": "newOwner",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 200,
											"src": "1180:8:2",
											"typeDescriptions": {
												"typeIdentifier": "t_address",
												"typeString": "address"
											}
										},
										"src": "1172:16:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"id": 208,
									"nodeType": "ExpressionStatement",
									"src": "1172:16:2"
								}
							]
						},
						"id": 210,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [
							{
								"arguments": [],
								"id": 203,
								"modifierName": {
									"argumentTypes": null,
									"id": 202,
									"name": "onlyOwner",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 189,
									"src": "1156:9:2",
									"typeDescriptions": {
										"typeIdentifier": "t_modifier$__$",
										"typeString": "modifier ()"
									}
								},
								"nodeType": "ModifierInvocation",
								"src": "1156:9:2"
							}
						],
						"name": "transferOwnership",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 201,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 200,
									"name": "newOwner",
									"nodeType": "VariableDeclaration",
									"scope": 210,
									"src": "1138:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 199,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "1138:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "1137:18:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 204,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1166:0:2"
						},
						"scope": 211,
						"src": "1111:82:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					}
				],
				"scope": 668,
				"src": "726:470:2"
			},
			{
				"baseContracts": [
					{
						"arguments": [],
						"baseName": {
							"contractScope": null,
							"id": 212,
							"name": "Ownable",
							"nodeType": "UserDefinedTypeName",
							"referencedDeclaration": 211,
							"src": "1222:7:2",
							"typeDescriptions": {
								"typeIdentifier": "t_contract$_Ownable_$211",
								"typeString": "contract Ownable"
							}
						},
						"id": 213,
						"nodeType": "InheritanceSpecifier",
						"src": "1222:7:2"
					}
				],
				"contractDependencies": [
					211
				],
				"contractKind": "contract",
				"documentation": null,
				"fullyImplemented": true,
				"id": 667,
				"linearizedBaseContracts": [
					667,
					211
				],
				"name": "Transaction",
				"nodeType": "ContractDefinition",
				"nodes": [
					{
						"canonicalName": "Transaction.TransactionNeoPlace",
						"id": 236,
						"members": [
							{
								"constant": false,
								"id": 215,
								"name": "id",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1285:7:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								},
								"typeName": {
									"id": 214,
									"name": "uint",
									"nodeType": "ElementaryTypeName",
									"src": "1285:4:2",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 217,
								"name": "seller",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1298:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_address",
									"typeString": "address"
								},
								"typeName": {
									"id": 216,
									"name": "address",
									"nodeType": "ElementaryTypeName",
									"src": "1298:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 219,
								"name": "buyer",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1318:13:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_address",
									"typeString": "address"
								},
								"typeName": {
									"id": 218,
									"name": "address",
									"nodeType": "ElementaryTypeName",
									"src": "1318:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 221,
								"name": "itemId",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1337:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes16",
									"typeString": "bytes16"
								},
								"typeName": {
									"id": 220,
									"name": "bytes16",
									"nodeType": "ElementaryTypeName",
									"src": "1337:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 223,
								"name": "typeItem",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1357:15:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes8",
									"typeString": "bytes8"
								},
								"typeName": {
									"id": 222,
									"name": "bytes8",
									"nodeType": "ElementaryTypeName",
									"src": "1357:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 225,
								"name": "location",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1378:15:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_string_storage_ptr",
									"typeString": "string storage pointer"
								},
								"typeName": {
									"id": 224,
									"name": "string",
									"nodeType": "ElementaryTypeName",
									"src": "1378:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_string_storage_ptr",
										"typeString": "string storage pointer"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 227,
								"name": "pictureHash",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1399:18:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_string_storage_ptr",
									"typeString": "string storage pointer"
								},
								"typeName": {
									"id": 226,
									"name": "string",
									"nodeType": "ElementaryTypeName",
									"src": "1399:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_string_storage_ptr",
										"typeString": "string storage pointer"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 229,
								"name": "receiptHash",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1423:19:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes16",
									"typeString": "bytes16"
								},
								"typeName": {
									"id": 228,
									"name": "bytes16",
									"nodeType": "ElementaryTypeName",
									"src": "1423:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 231,
								"name": "comment",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1448:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_string_storage_ptr",
									"typeString": "string storage pointer"
								},
								"typeName": {
									"id": 230,
									"name": "string",
									"nodeType": "ElementaryTypeName",
									"src": "1448:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_string_storage_ptr",
										"typeString": "string storage pointer"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 233,
								"name": "status",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1468:13:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes8",
									"typeString": "bytes8"
								},
								"typeName": {
									"id": 232,
									"name": "bytes8",
									"nodeType": "ElementaryTypeName",
									"src": "1468:6:2",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									}
								},
								"value": null,
								"visibility": "internal"
							},
							{
								"constant": false,
								"id": 235,
								"name": "_price",
								"nodeType": "VariableDeclaration",
								"scope": 236,
								"src": "1487:14:2",
								"stateVariable": false,
								"storageLocation": "default",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								},
								"typeName": {
									"id": 234,
									"name": "uint256",
									"nodeType": "ElementaryTypeName",
									"src": "1487:7:2",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									}
								},
								"value": null,
								"visibility": "internal"
							}
						],
						"name": "TransactionNeoPlace",
						"nodeType": "StructDefinition",
						"scope": 667,
						"src": "1252:254:2",
						"visibility": "public"
					},
					{
						"constant": false,
						"id": 240,
						"name": "transactions",
						"nodeType": "VariableDeclaration",
						"scope": 667,
						"src": "1531:56:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
							"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
						},
						"typeName": {
							"id": 239,
							"keyType": {
								"id": 237,
								"name": "uint",
								"nodeType": "ElementaryTypeName",
								"src": "1539:4:2",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								}
							},
							"nodeType": "Mapping",
							"src": "1531:36:2",
							"typeDescriptions": {
								"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
								"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
							},
							"valueType": {
								"contractScope": null,
								"id": 238,
								"name": "TransactionNeoPlace",
								"nodeType": "UserDefinedTypeName",
								"referencedDeclaration": 236,
								"src": "1547:19:2",
								"typeDescriptions": {
									"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage_ptr",
									"typeString": "struct Transaction.TransactionNeoPlace storage pointer"
								}
							}
						},
						"value": null,
						"visibility": "public"
					},
					{
						"constant": false,
						"id": 244,
						"name": "fundsLocked",
						"nodeType": "VariableDeclaration",
						"scope": 667,
						"src": "1591:46:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
							"typeString": "mapping(bytes16 => uint256)"
						},
						"typeName": {
							"id": 243,
							"keyType": {
								"id": 241,
								"name": "bytes16",
								"nodeType": "ElementaryTypeName",
								"src": "1599:7:2",
								"typeDescriptions": {
									"typeIdentifier": "t_bytes16",
									"typeString": "bytes16"
								}
							},
							"nodeType": "Mapping",
							"src": "1591:27:2",
							"typeDescriptions": {
								"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
								"typeString": "mapping(bytes16 => uint256)"
							},
							"valueType": {
								"id": 242,
								"name": "uint256",
								"nodeType": "ElementaryTypeName",
								"src": "1610:7:2",
								"typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								}
							}
						},
						"value": null,
						"visibility": "public"
					},
					{
						"constant": false,
						"id": 246,
						"name": "transactionCounter",
						"nodeType": "VariableDeclaration",
						"scope": 667,
						"src": "1642:23:2",
						"stateVariable": true,
						"storageLocation": "default",
						"typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						},
						"typeName": {
							"id": 245,
							"name": "uint",
							"nodeType": "ElementaryTypeName",
							"src": "1642:4:2",
							"typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							}
						},
						"value": null,
						"visibility": "internal"
					},
					{
						"anonymous": false,
						"id": 258,
						"name": "BuyItem",
						"nodeType": "EventDefinition",
						"parameters": {
							"id": 257,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 248,
									"indexed": true,
									"name": "_id",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1701:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 247,
										"name": "uint",
										"nodeType": "ElementaryTypeName",
										"src": "1701:4:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 250,
									"indexed": true,
									"name": "_itemId",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1723:23:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									},
									"typeName": {
										"id": 249,
										"name": "bytes16",
										"nodeType": "ElementaryTypeName",
										"src": "1723:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes16",
											"typeString": "bytes16"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 252,
									"indexed": false,
									"name": "_seller",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1752:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 251,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "1752:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 254,
									"indexed": false,
									"name": "_buyer",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1773:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 253,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "1773:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 256,
									"indexed": false,
									"name": "_price",
									"nodeType": "VariableDeclaration",
									"scope": 258,
									"src": "1793:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 255,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "1793:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "1695:116:2"
						},
						"src": "1682:130:2"
					},
					{
						"body": {
							"id": 267,
							"nodeType": "Block",
							"src": "1849:30:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 264,
												"name": "owner",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 178,
												"src": "1868:5:2",
												"typeDescriptions": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											],
											"id": 263,
											"name": "selfdestruct",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 685,
											"src": "1855:12:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_selfdestruct_nonpayable$_t_address_$returns$__$",
												"typeString": "function (address)"
											}
										},
										"id": 265,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "1855:19:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 266,
									"nodeType": "ExpressionStatement",
									"src": "1855:19:2"
								}
							]
						},
						"id": 268,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [
							{
								"arguments": [],
								"id": 261,
								"modifierName": {
									"argumentTypes": null,
									"id": 260,
									"name": "onlyOwner",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 189,
									"src": "1839:9:2",
									"typeDescriptions": {
										"typeIdentifier": "t_modifier$__$",
										"typeString": "modifier ()"
									}
								},
								"nodeType": "ModifierInvocation",
								"src": "1839:9:2"
							}
						],
						"name": "kill",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 259,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1829:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 262,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1849:0:2"
						},
						"scope": 667,
						"src": "1816:63:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 275,
							"nodeType": "Block",
							"src": "1999:36:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"id": 273,
										"name": "transactionCounter",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 246,
										"src": "2012:18:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"functionReturnParameters": 272,
									"id": 274,
									"nodeType": "Return",
									"src": "2005:25:2"
								}
							]
						},
						"id": 276,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "getNumberOfTransactions",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 269,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "1969:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 272,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 271,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 276,
									"src": "1993:4:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 270,
										"name": "uint",
										"nodeType": "ElementaryTypeName",
										"src": "1993:4:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "1992:6:2"
						},
						"scope": 667,
						"src": "1937:98:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 361,
							"nodeType": "Block",
							"src": "2134:649:2",
							"statements": [
								{
									"assignments": [
										285
									],
									"declarations": [
										{
											"constant": false,
											"id": 285,
											"name": "transactionIds",
											"nodeType": "VariableDeclaration",
											"scope": 362,
											"src": "2168:28:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 283,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2168:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 284,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2168:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 291,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 289,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "2210:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 288,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "2199:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 286,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2203:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 287,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2203:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 290,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "2199:30:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2168:61:2"
								},
								{
									"assignments": [
										293
									],
									"declarations": [
										{
											"constant": false,
											"id": 293,
											"name": "numberOfSales",
											"nodeType": "VariableDeclaration",
											"scope": 362,
											"src": "2236:18:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 292,
												"name": "uint",
												"nodeType": "ElementaryTypeName",
												"src": "2236:4:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 295,
									"initialValue": {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 294,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "2257:1:2",
										"subdenomination": null,
										"typeDescriptions": {
											"typeIdentifier": "t_rational_0_by_1",
											"typeString": "int_const 0"
										},
										"value": "0"
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2236:22:2"
								},
								{
									"body": {
										"id": 327,
										"nodeType": "Block",
										"src": "2344:208:2",
										"statements": [
											{
												"condition": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													"id": 312,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"baseExpression": {
																"argumentTypes": null,
																"id": 306,
																"name": "transactions",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 240,
																"src": "2414:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																	"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																}
															},
															"id": 308,
															"indexExpression": {
																"argumentTypes": null,
																"id": 307,
																"name": "i",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 297,
																"src": "2427:1:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"isConstant": false,
															"isLValue": true,
															"isPure": false,
															"lValueRequested": false,
															"nodeType": "IndexAccess",
															"src": "2414:15:2",
															"typeDescriptions": {
																"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																"typeString": "struct Transaction.TransactionNeoPlace storage ref"
															}
														},
														"id": 309,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "seller",
														"nodeType": "MemberAccess",
														"referencedDeclaration": 217,
														"src": "2414:22:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"id": 310,
															"name": "msg",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 679,
															"src": "2440:3:2",
															"typeDescriptions": {
																"typeIdentifier": "t_magic_message",
																"typeString": "msg"
															}
														},
														"id": 311,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "sender",
														"nodeType": "MemberAccess",
														"referencedDeclaration": null,
														"src": "2440:10:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"src": "2414:36:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"falseBody": null,
												"id": 326,
												"nodeType": "IfStatement",
												"src": "2411:135:2",
												"trueBody": {
													"id": 325,
													"nodeType": "Block",
													"src": "2452:94:2",
													"statements": [
														{
															"expression": {
																"argumentTypes": null,
																"id": 320,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 313,
																		"name": "transactionIds",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 285,
																		"src": "2462:14:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																			"typeString": "uint256[] memory"
																		}
																	},
																	"id": 315,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 314,
																		"name": "numberOfSales",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 293,
																		"src": "2477:13:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"nodeType": "IndexAccess",
																	"src": "2462:29:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"expression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 316,
																			"name": "transactions",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 240,
																			"src": "2494:12:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																				"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																			}
																		},
																		"id": 318,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 317,
																			"name": "i",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 297,
																			"src": "2507:1:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "2494:15:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																			"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																		}
																	},
																	"id": 319,
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"memberName": "id",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": 215,
																	"src": "2494:18:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"src": "2462:50:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 321,
															"nodeType": "ExpressionStatement",
															"src": "2462:50:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 323,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"nodeType": "UnaryOperation",
																"operator": "++",
																"prefix": false,
																"src": "2522:15:2",
																"subExpression": {
																	"argumentTypes": null,
																	"id": 322,
																	"name": "numberOfSales",
																	"nodeType": "Identifier",
																	"overloadedDeclarations": [],
																	"referencedDeclaration": 293,
																	"src": "2522:13:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 324,
															"nodeType": "ExpressionStatement",
															"src": "2522:15:2"
														}
													]
												}
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 302,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 300,
											"name": "i",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 297,
											"src": "2314:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<=",
										"rightExpression": {
											"argumentTypes": null,
											"id": 301,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "2319:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "2314:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 328,
									"initializationExpression": {
										"assignments": [
											297
										],
										"declarations": [
											{
												"constant": false,
												"id": 297,
												"name": "i",
												"nodeType": "VariableDeclaration",
												"scope": 362,
												"src": "2302:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 296,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2302:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 299,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "31",
											"id": 298,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "2311:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_1_by_1",
												"typeString": "int_const 1"
											},
											"value": "1"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "2302:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 304,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "2339:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 303,
												"name": "i",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 297,
												"src": "2339:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 305,
										"nodeType": "ExpressionStatement",
										"src": "2339:3:2"
									},
									"nodeType": "ForStatement",
									"src": "2298:254:2"
								},
								{
									"assignments": [
										332
									],
									"declarations": [
										{
											"constant": false,
											"id": 332,
											"name": "sales",
											"nodeType": "VariableDeclaration",
											"scope": 362,
											"src": "2625:19:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 330,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2625:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 331,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2625:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 338,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 336,
												"name": "numberOfSales",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 293,
												"src": "2658:13:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 335,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "2647:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 333,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2651:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 334,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2651:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 337,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "2647:25:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2625:47:2"
								},
								{
									"body": {
										"id": 357,
										"nodeType": "Block",
										"src": "2718:43:2",
										"statements": [
											{
												"expression": {
													"argumentTypes": null,
													"id": 355,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 349,
															"name": "sales",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 332,
															"src": "2726:5:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 351,
														"indexExpression": {
															"argumentTypes": null,
															"id": 350,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 340,
															"src": "2732:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": true,
														"nodeType": "IndexAccess",
														"src": "2726:8:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "Assignment",
													"operator": "=",
													"rightHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 352,
															"name": "transactionIds",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 285,
															"src": "2737:14:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 354,
														"indexExpression": {
															"argumentTypes": null,
															"id": 353,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 340,
															"src": "2752:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"nodeType": "IndexAccess",
														"src": "2737:17:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"src": "2726:28:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 356,
												"nodeType": "ExpressionStatement",
												"src": "2726:28:2"
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 345,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 343,
											"name": "j",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 340,
											"src": "2694:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<",
										"rightExpression": {
											"argumentTypes": null,
											"id": 344,
											"name": "numberOfSales",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 293,
											"src": "2698:13:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "2694:17:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 358,
									"initializationExpression": {
										"assignments": [
											340
										],
										"declarations": [
											{
												"constant": false,
												"id": 340,
												"name": "j",
												"nodeType": "VariableDeclaration",
												"scope": 362,
												"src": "2682:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 339,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2682:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 342,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 341,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "2691:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "2682:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 347,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "2713:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 346,
												"name": "j",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 340,
												"src": "2713:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 348,
										"nodeType": "ExpressionStatement",
										"src": "2713:3:2"
									},
									"nodeType": "ForStatement",
									"src": "2678:83:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 359,
										"name": "sales",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 332,
										"src": "2773:5:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
											"typeString": "uint256[] memory"
										}
									},
									"functionReturnParameters": 281,
									"id": 360,
									"nodeType": "Return",
									"src": "2766:12:2"
								}
							]
						},
						"id": 362,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "getSales",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 277,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "2102:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 281,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 280,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 362,
									"src": "2126:6:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
										"typeString": "uint256[] memory"
									},
									"typeName": {
										"baseType": {
											"id": 278,
											"name": "uint",
											"nodeType": "ElementaryTypeName",
											"src": "2126:4:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 279,
										"length": null,
										"nodeType": "ArrayTypeName",
										"src": "2126:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
											"typeString": "uint256[] storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "2125:8:2"
						},
						"scope": 667,
						"src": "2085:698:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 447,
							"nodeType": "Block",
							"src": "2889:630:2",
							"statements": [
								{
									"assignments": [
										371
									],
									"declarations": [
										{
											"constant": false,
											"id": 371,
											"name": "transactionIds",
											"nodeType": "VariableDeclaration",
											"scope": 448,
											"src": "2923:28:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 369,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2923:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 370,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2923:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 377,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 375,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "2965:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 374,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "2954:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 372,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "2958:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 373,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "2958:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 376,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "2954:30:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2923:61:2"
								},
								{
									"assignments": [
										379
									],
									"declarations": [
										{
											"constant": false,
											"id": 379,
											"name": "numberOfBuy",
											"nodeType": "VariableDeclaration",
											"scope": 448,
											"src": "2991:16:2",
											"stateVariable": false,
											"storageLocation": "default",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"typeName": {
												"id": 378,
												"name": "uint",
												"nodeType": "ElementaryTypeName",
												"src": "2991:4:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 381,
									"initialValue": {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 380,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "3010:1:2",
										"subdenomination": null,
										"typeDescriptions": {
											"typeIdentifier": "t_rational_0_by_1",
											"typeString": "int_const 0"
										},
										"value": "0"
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "2991:20:2"
								},
								{
									"body": {
										"id": 413,
										"nodeType": "Block",
										"src": "3097:203:2",
										"statements": [
											{
												"condition": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													"id": 398,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"baseExpression": {
																"argumentTypes": null,
																"id": 392,
																"name": "transactions",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 240,
																"src": "3167:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																	"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																}
															},
															"id": 394,
															"indexExpression": {
																"argumentTypes": null,
																"id": 393,
																"name": "i",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 383,
																"src": "3180:1:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"isConstant": false,
															"isLValue": true,
															"isPure": false,
															"lValueRequested": false,
															"nodeType": "IndexAccess",
															"src": "3167:15:2",
															"typeDescriptions": {
																"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																"typeString": "struct Transaction.TransactionNeoPlace storage ref"
															}
														},
														"id": 395,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "buyer",
														"nodeType": "MemberAccess",
														"referencedDeclaration": 219,
														"src": "3167:21:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"id": 396,
															"name": "msg",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 679,
															"src": "3192:3:2",
															"typeDescriptions": {
																"typeIdentifier": "t_magic_message",
																"typeString": "msg"
															}
														},
														"id": 397,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "sender",
														"nodeType": "MemberAccess",
														"referencedDeclaration": null,
														"src": "3192:10:2",
														"typeDescriptions": {
															"typeIdentifier": "t_address",
															"typeString": "address"
														}
													},
													"src": "3167:35:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"falseBody": null,
												"id": 412,
												"nodeType": "IfStatement",
												"src": "3164:130:2",
												"trueBody": {
													"id": 411,
													"nodeType": "Block",
													"src": "3204:90:2",
													"statements": [
														{
															"expression": {
																"argumentTypes": null,
																"id": 406,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 399,
																		"name": "transactionIds",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 371,
																		"src": "3214:14:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																			"typeString": "uint256[] memory"
																		}
																	},
																	"id": 401,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 400,
																		"name": "numberOfBuy",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 379,
																		"src": "3229:11:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"nodeType": "IndexAccess",
																	"src": "3214:27:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"expression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 402,
																			"name": "transactions",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 240,
																			"src": "3244:12:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																				"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																			}
																		},
																		"id": 404,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 403,
																			"name": "i",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 383,
																			"src": "3257:1:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "3244:15:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																			"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																		}
																	},
																	"id": 405,
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"memberName": "id",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": 215,
																	"src": "3244:18:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"src": "3214:48:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 407,
															"nodeType": "ExpressionStatement",
															"src": "3214:48:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 409,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"nodeType": "UnaryOperation",
																"operator": "++",
																"prefix": false,
																"src": "3272:13:2",
																"subExpression": {
																	"argumentTypes": null,
																	"id": 408,
																	"name": "numberOfBuy",
																	"nodeType": "Identifier",
																	"overloadedDeclarations": [],
																	"referencedDeclaration": 379,
																	"src": "3272:11:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 410,
															"nodeType": "ExpressionStatement",
															"src": "3272:13:2"
														}
													]
												}
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 388,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 386,
											"name": "i",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 383,
											"src": "3067:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<=",
										"rightExpression": {
											"argumentTypes": null,
											"id": 387,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "3072:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "3067:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 414,
									"initializationExpression": {
										"assignments": [
											383
										],
										"declarations": [
											{
												"constant": false,
												"id": 383,
												"name": "i",
												"nodeType": "VariableDeclaration",
												"scope": 448,
												"src": "3055:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 382,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3055:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 385,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "31",
											"id": 384,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "3064:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_1_by_1",
												"typeString": "int_const 1"
											},
											"value": "1"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "3055:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 390,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "3092:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 389,
												"name": "i",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 383,
												"src": "3092:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 391,
										"nodeType": "ExpressionStatement",
										"src": "3092:3:2"
									},
									"nodeType": "ForStatement",
									"src": "3051:249:2"
								},
								{
									"assignments": [
										418
									],
									"declarations": [
										{
											"constant": false,
											"id": 418,
											"name": "buy",
											"nodeType": "VariableDeclaration",
											"scope": 448,
											"src": "3371:17:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
												"typeString": "uint256[] memory"
											},
											"typeName": {
												"baseType": {
													"id": 416,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3371:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 417,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "3371:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 424,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 422,
												"name": "numberOfBuy",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 379,
												"src": "3402:11:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 421,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "NewExpression",
											"src": "3391:10:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_objectcreation_pure$_t_uint256_$returns$_t_array$_t_uint256_$dyn_memory_$",
												"typeString": "function (uint256) pure returns (uint256[] memory)"
											},
											"typeName": {
												"baseType": {
													"id": 419,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3395:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 420,
												"length": null,
												"nodeType": "ArrayTypeName",
												"src": "3395:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
													"typeString": "uint256[] storage pointer"
												}
											}
										},
										"id": 423,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3391:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory",
											"typeString": "uint256[] memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "3371:43:2"
								},
								{
									"body": {
										"id": 443,
										"nodeType": "Block",
										"src": "3458:41:2",
										"statements": [
											{
												"expression": {
													"argumentTypes": null,
													"id": 441,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 435,
															"name": "buy",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 418,
															"src": "3466:3:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 437,
														"indexExpression": {
															"argumentTypes": null,
															"id": 436,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 426,
															"src": "3470:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": true,
														"nodeType": "IndexAccess",
														"src": "3466:6:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"nodeType": "Assignment",
													"operator": "=",
													"rightHandSide": {
														"argumentTypes": null,
														"baseExpression": {
															"argumentTypes": null,
															"id": 438,
															"name": "transactionIds",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 371,
															"src": "3475:14:2",
															"typeDescriptions": {
																"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
																"typeString": "uint256[] memory"
															}
														},
														"id": 440,
														"indexExpression": {
															"argumentTypes": null,
															"id": 439,
															"name": "j",
															"nodeType": "Identifier",
															"overloadedDeclarations": [],
															"referencedDeclaration": 426,
															"src": "3490:1:2",
															"typeDescriptions": {
																"typeIdentifier": "t_uint256",
																"typeString": "uint256"
															}
														},
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"nodeType": "IndexAccess",
														"src": "3475:17:2",
														"typeDescriptions": {
															"typeIdentifier": "t_uint256",
															"typeString": "uint256"
														}
													},
													"src": "3466:26:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"id": 442,
												"nodeType": "ExpressionStatement",
												"src": "3466:26:2"
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 431,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 429,
											"name": "j",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 426,
											"src": "3436:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<",
										"rightExpression": {
											"argumentTypes": null,
											"id": 430,
											"name": "numberOfBuy",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 379,
											"src": "3440:11:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "3436:15:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 444,
									"initializationExpression": {
										"assignments": [
											426
										],
										"declarations": [
											{
												"constant": false,
												"id": 426,
												"name": "j",
												"nodeType": "VariableDeclaration",
												"scope": 448,
												"src": "3424:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 425,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "3424:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 428,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 427,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "3433:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "3424:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 433,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "3453:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 432,
												"name": "j",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 426,
												"src": "3453:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 434,
										"nodeType": "ExpressionStatement",
										"src": "3453:3:2"
									},
									"nodeType": "ForStatement",
									"src": "3420:79:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 445,
										"name": "buy",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 418,
										"src": "3511:3:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
											"typeString": "uint256[] memory"
										}
									},
									"functionReturnParameters": 367,
									"id": 446,
									"nodeType": "Return",
									"src": "3504:10:2"
								}
							]
						},
						"id": 448,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": true,
						"modifiers": [],
						"name": "getPurchases",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 363,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "2857:2:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 367,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 366,
									"name": "",
									"nodeType": "VariableDeclaration",
									"scope": 448,
									"src": "2881:6:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
										"typeString": "uint256[] memory"
									},
									"typeName": {
										"baseType": {
											"id": 364,
											"name": "uint",
											"nodeType": "ElementaryTypeName",
											"src": "2881:4:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 365,
										"length": null,
										"nodeType": "ArrayTypeName",
										"src": "2881:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
											"typeString": "uint256[] storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "2880:8:2"
						},
						"scope": 667,
						"src": "2836:683:2",
						"stateMutability": "view",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 560,
							"nodeType": "Block",
							"src": "3727:947:2",
							"statements": [
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												"id": 470,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"id": 468,
													"name": "_seller",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 450,
													"src": "3765:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "!=",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "307830",
													"id": 469,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3776:3:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0x0"
												},
												"src": "3765:14:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 467,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3757:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 471,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3757:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 472,
									"nodeType": "ExpressionStatement",
									"src": "3757:23:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												"id": 477,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 474,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "3840:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 475,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "sender",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3840:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "!=",
												"rightExpression": {
													"argumentTypes": null,
													"id": 476,
													"name": "_seller",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 450,
													"src": "3854:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												"src": "3840:21:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 473,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3832:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 478,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3832:30:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 479,
									"nodeType": "ExpressionStatement",
									"src": "3832:30:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint8",
													"typeString": "uint8"
												},
												"id": 484,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 481,
														"name": "_itemId",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 452,
														"src": "3877:7:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes16",
															"typeString": "bytes16"
														}
													},
													"id": 482,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3877:14:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint8",
														"typeString": "uint8"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 483,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3894:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3877:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 480,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3869:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 485,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3869:27:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 486,
									"nodeType": "ExpressionStatement",
									"src": "3869:27:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint8",
													"typeString": "uint8"
												},
												"id": 491,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 488,
														"name": "_typeItem",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 454,
														"src": "3910:9:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes8",
															"typeString": "bytes8"
														}
													},
													"id": 489,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3910:16:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint8",
														"typeString": "uint8"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 490,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3929:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3910:20:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 487,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3902:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 492,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3902:29:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 493,
									"nodeType": "ExpressionStatement",
									"src": "3902:29:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 500,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"arguments": [
															{
																"argumentTypes": null,
																"id": 496,
																"name": "_location",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 456,
																"src": "3951:9:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															}
														],
														"expression": {
															"argumentTypes": [
																{
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															],
															"id": 495,
															"isConstant": false,
															"isLValue": false,
															"isPure": true,
															"lValueRequested": false,
															"nodeType": "ElementaryTypeNameExpression",
															"src": "3945:5:2",
															"typeDescriptions": {
																"typeIdentifier": "t_type$_t_bytes_storage_ptr_$",
																"typeString": "type(bytes storage pointer)"
															},
															"typeName": "bytes"
														},
														"id": 497,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"kind": "typeConversion",
														"lValueRequested": false,
														"names": [],
														"nodeType": "FunctionCall",
														"src": "3945:16:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes_memory",
															"typeString": "bytes memory"
														}
													},
													"id": 498,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3945:23:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 499,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "3971:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3945:27:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 494,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3937:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 501,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3937:36:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 502,
									"nodeType": "ExpressionStatement",
									"src": "3937:36:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 509,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"arguments": [
															{
																"argumentTypes": null,
																"id": 505,
																"name": "_pictureHash",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 458,
																"src": "3993:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															}
														],
														"expression": {
															"argumentTypes": [
																{
																	"typeIdentifier": "t_string_memory_ptr",
																	"typeString": "string memory"
																}
															],
															"id": 504,
															"isConstant": false,
															"isLValue": false,
															"isPure": true,
															"lValueRequested": false,
															"nodeType": "ElementaryTypeNameExpression",
															"src": "3987:5:2",
															"typeDescriptions": {
																"typeIdentifier": "t_type$_t_bytes_storage_ptr_$",
																"typeString": "type(bytes storage pointer)"
															},
															"typeName": "bytes"
														},
														"id": 506,
														"isConstant": false,
														"isLValue": false,
														"isPure": false,
														"kind": "typeConversion",
														"lValueRequested": false,
														"names": [],
														"nodeType": "FunctionCall",
														"src": "3987:19:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes_memory",
															"typeString": "bytes memory"
														}
													},
													"id": 507,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "length",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "3987:26:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": ">",
												"rightExpression": {
													"argumentTypes": null,
													"hexValue": "30",
													"id": 508,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "4016:1:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0"
												},
												"src": "3987:30:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 503,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "3979:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 510,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "3979:39:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 511,
									"nodeType": "ExpressionStatement",
									"src": "3979:39:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"commonType": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"id": 516,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"leftExpression": {
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 513,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "4076:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 514,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "value",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "4076:9:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"nodeType": "BinaryOperation",
												"operator": "==",
												"rightExpression": {
													"argumentTypes": null,
													"id": 515,
													"name": "_price",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 464,
													"src": "4089:6:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"src": "4076:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_bool",
													"typeString": "bool"
												}
											],
											"id": 512,
											"name": "require",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 682,
											"src": "4068:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
												"typeString": "function (bool) pure"
											}
										},
										"id": 517,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "4068:28:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 518,
									"nodeType": "ExpressionStatement",
									"src": "4068:28:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 527,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"baseExpression": {
												"argumentTypes": null,
												"id": 519,
												"name": "fundsLocked",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 244,
												"src": "4179:11:2",
												"typeDescriptions": {
													"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
													"typeString": "mapping(bytes16 => uint256)"
												}
											},
											"id": 521,
											"indexExpression": {
												"argumentTypes": null,
												"id": 520,
												"name": "_itemId",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 452,
												"src": "4191:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes16",
													"typeString": "bytes16"
												}
											},
											"isConstant": false,
											"isLValue": true,
											"isPure": false,
											"lValueRequested": true,
											"nodeType": "IndexAccess",
											"src": "4179:20:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"commonType": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											},
											"id": 526,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"leftExpression": {
												"argumentTypes": null,
												"baseExpression": {
													"argumentTypes": null,
													"id": 522,
													"name": "fundsLocked",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 244,
													"src": "4200:11:2",
													"typeDescriptions": {
														"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
														"typeString": "mapping(bytes16 => uint256)"
													}
												},
												"id": 524,
												"indexExpression": {
													"argumentTypes": null,
													"id": 523,
													"name": "_itemId",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 452,
													"src": "4212:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													}
												},
												"isConstant": false,
												"isLValue": true,
												"isPure": false,
												"lValueRequested": false,
												"nodeType": "IndexAccess",
												"src": "4200:20:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"nodeType": "BinaryOperation",
											"operator": "+",
											"rightExpression": {
												"argumentTypes": null,
												"id": 525,
												"name": "_price",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 464,
												"src": "4223:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"src": "4200:29:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "4179:50:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"id": 528,
									"nodeType": "ExpressionStatement",
									"src": "4179:50:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 530,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"nodeType": "UnaryOperation",
										"operator": "++",
										"prefix": false,
										"src": "4259:20:2",
										"subExpression": {
											"argumentTypes": null,
											"id": 529,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "4259:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"id": 531,
									"nodeType": "ExpressionStatement",
									"src": "4259:20:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"id": 549,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftHandSide": {
											"argumentTypes": null,
											"baseExpression": {
												"argumentTypes": null,
												"id": 532,
												"name": "transactions",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 240,
												"src": "4319:12:2",
												"typeDescriptions": {
													"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
													"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
												}
											},
											"id": 534,
											"indexExpression": {
												"argumentTypes": null,
												"id": 533,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "4332:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"isConstant": false,
											"isLValue": true,
											"isPure": false,
											"lValueRequested": true,
											"nodeType": "IndexAccess",
											"src": "4319:32:2",
											"typeDescriptions": {
												"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
												"typeString": "struct Transaction.TransactionNeoPlace storage ref"
											}
										},
										"nodeType": "Assignment",
										"operator": "=",
										"rightHandSide": {
											"argumentTypes": null,
											"arguments": [
												{
													"argumentTypes": null,
													"id": 536,
													"name": "transactionCounter",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 246,
													"src": "4381:18:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												{
													"argumentTypes": null,
													"id": 537,
													"name": "_seller",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 450,
													"src": "4407:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												{
													"argumentTypes": null,
													"expression": {
														"argumentTypes": null,
														"id": 538,
														"name": "msg",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 679,
														"src": "4422:3:2",
														"typeDescriptions": {
															"typeIdentifier": "t_magic_message",
															"typeString": "msg"
														}
													},
													"id": 539,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"memberName": "sender",
													"nodeType": "MemberAccess",
													"referencedDeclaration": null,
													"src": "4422:10:2",
													"typeDescriptions": {
														"typeIdentifier": "t_address",
														"typeString": "address"
													}
												},
												{
													"argumentTypes": null,
													"id": 540,
													"name": "_itemId",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 452,
													"src": "4440:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													}
												},
												{
													"argumentTypes": null,
													"id": 541,
													"name": "_typeItem",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 454,
													"src": "4455:9:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													}
												},
												{
													"argumentTypes": null,
													"id": 542,
													"name": "_location",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 456,
													"src": "4472:9:2",
													"typeDescriptions": {
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													}
												},
												{
													"argumentTypes": null,
													"id": 543,
													"name": "_pictureHash",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 458,
													"src": "4489:12:2",
													"typeDescriptions": {
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													}
												},
												{
													"argumentTypes": null,
													"hexValue": "",
													"id": 544,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "string",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "4509:2:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
														"typeString": "literal_string \"\""
													},
													"value": ""
												},
												{
													"argumentTypes": null,
													"id": 545,
													"name": "_comment",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 460,
													"src": "4519:8:2",
													"typeDescriptions": {
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													}
												},
												{
													"argumentTypes": null,
													"id": 546,
													"name": "_status",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 462,
													"src": "4535:7:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													}
												},
												{
													"argumentTypes": null,
													"id": 547,
													"name": "_price",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 464,
													"src": "4550:6:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												}
											],
											"expression": {
												"argumentTypes": [
													{
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													},
													{
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													{
														"typeIdentifier": "t_address",
														"typeString": "address"
													},
													{
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													},
													{
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													},
													{
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													},
													{
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													},
													{
														"typeIdentifier": "t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
														"typeString": "literal_string \"\""
													},
													{
														"typeIdentifier": "t_string_memory_ptr",
														"typeString": "string memory"
													},
													{
														"typeIdentifier": "t_bytes8",
														"typeString": "bytes8"
													},
													{
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												],
												"id": 535,
												"name": "TransactionNeoPlace",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 236,
												"src": "4354:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_type$_t_struct$_TransactionNeoPlace_$236_storage_ptr_$",
													"typeString": "type(struct Transaction.TransactionNeoPlace storage pointer)"
												}
											},
											"id": 548,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"kind": "structConstructorCall",
											"lValueRequested": false,
											"names": [],
											"nodeType": "FunctionCall",
											"src": "4354:208:2",
											"typeDescriptions": {
												"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_memory",
												"typeString": "struct Transaction.TransactionNeoPlace memory"
											}
										},
										"src": "4319:243:2",
										"typeDescriptions": {
											"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
											"typeString": "struct Transaction.TransactionNeoPlace storage ref"
										}
									},
									"id": 550,
									"nodeType": "ExpressionStatement",
									"src": "4319:243:2"
								},
								{
									"expression": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 552,
												"name": "transactionCounter",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 246,
												"src": "4612:18:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											{
												"argumentTypes": null,
												"id": 553,
												"name": "_itemId",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 452,
												"src": "4632:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes16",
													"typeString": "bytes16"
												}
											},
											{
												"argumentTypes": null,
												"id": 554,
												"name": "_seller",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 450,
												"src": "4641:7:2",
												"typeDescriptions": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											},
											{
												"argumentTypes": null,
												"expression": {
													"argumentTypes": null,
													"id": 555,
													"name": "msg",
													"nodeType": "Identifier",
													"overloadedDeclarations": [],
													"referencedDeclaration": 679,
													"src": "4650:3:2",
													"typeDescriptions": {
														"typeIdentifier": "t_magic_message",
														"typeString": "msg"
													}
												},
												"id": 556,
												"isConstant": false,
												"isLValue": false,
												"isPure": false,
												"lValueRequested": false,
												"memberName": "sender",
												"nodeType": "MemberAccess",
												"referencedDeclaration": null,
												"src": "4650:10:2",
												"typeDescriptions": {
													"typeIdentifier": "t_address",
													"typeString": "address"
												}
											},
											{
												"argumentTypes": null,
												"id": 557,
												"name": "_price",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 464,
												"src": "4662:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												{
													"typeIdentifier": "t_bytes16",
													"typeString": "bytes16"
												},
												{
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												{
													"typeIdentifier": "t_address",
													"typeString": "address"
												},
												{
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											],
											"id": 551,
											"name": "BuyItem",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 258,
											"src": "4604:7:2",
											"typeDescriptions": {
												"typeIdentifier": "t_function_event_nonpayable$_t_uint256_$_t_bytes16_$_t_address_$_t_address_$_t_uint256_$returns$__$",
												"typeString": "function (uint256,bytes16,address,address,uint256)"
											}
										},
										"id": 558,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "functionCall",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "4604:65:2",
										"typeDescriptions": {
											"typeIdentifier": "t_tuple$__$",
											"typeString": "tuple()"
										}
									},
									"id": 559,
									"nodeType": "ExpressionStatement",
									"src": "4604:65:2"
								}
							]
						},
						"id": 561,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "buyItem",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 465,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 450,
									"name": "_seller",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3572:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_address",
										"typeString": "address"
									},
									"typeName": {
										"id": 449,
										"name": "address",
										"nodeType": "ElementaryTypeName",
										"src": "3572:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_address",
											"typeString": "address"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 452,
									"name": "_itemId",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3589:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									},
									"typeName": {
										"id": 451,
										"name": "bytes16",
										"nodeType": "ElementaryTypeName",
										"src": "3589:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes16",
											"typeString": "bytes16"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 454,
									"name": "_typeItem",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3606:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									},
									"typeName": {
										"id": 453,
										"name": "bytes8",
										"nodeType": "ElementaryTypeName",
										"src": "3606:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes8",
											"typeString": "bytes8"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 456,
									"name": "_location",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3624:16:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 455,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "3624:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 458,
									"name": "_pictureHash",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3642:19:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 457,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "3642:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 460,
									"name": "_comment",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3663:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 459,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "3663:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 462,
									"name": "_status",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3680:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									},
									"typeName": {
										"id": 461,
										"name": "bytes8",
										"nodeType": "ElementaryTypeName",
										"src": "3680:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes8",
											"typeString": "bytes8"
										}
									},
									"value": null,
									"visibility": "internal"
								},
								{
									"constant": false,
									"id": 464,
									"name": "_price",
									"nodeType": "VariableDeclaration",
									"scope": 561,
									"src": "3696:14:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									},
									"typeName": {
										"id": 463,
										"name": "uint256",
										"nodeType": "ElementaryTypeName",
										"src": "3696:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "3571:140:2"
						},
						"payable": true,
						"returnParameters": {
							"id": 466,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "3727:0:2"
						},
						"scope": 667,
						"src": "3555:1119:2",
						"stateMutability": "payable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 642,
							"nodeType": "Block",
							"src": "4724:552:2",
							"statements": [
								{
									"body": {
										"id": 640,
										"nodeType": "Block",
										"src": "4777:495:2",
										"statements": [
											{
												"condition": {
													"argumentTypes": null,
													"commonType": {
														"typeIdentifier": "t_bytes16",
														"typeString": "bytes16"
													},
													"id": 581,
													"isConstant": false,
													"isLValue": false,
													"isPure": false,
													"lValueRequested": false,
													"leftExpression": {
														"argumentTypes": null,
														"expression": {
															"argumentTypes": null,
															"baseExpression": {
																"argumentTypes": null,
																"id": 576,
																"name": "transactions",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 240,
																"src": "4788:12:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																	"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																}
															},
															"id": 578,
															"indexExpression": {
																"argumentTypes": null,
																"id": 577,
																"name": "i",
																"nodeType": "Identifier",
																"overloadedDeclarations": [],
																"referencedDeclaration": 567,
																"src": "4801:1:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"isConstant": false,
															"isLValue": true,
															"isPure": false,
															"lValueRequested": false,
															"nodeType": "IndexAccess",
															"src": "4788:15:2",
															"typeDescriptions": {
																"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																"typeString": "struct Transaction.TransactionNeoPlace storage ref"
															}
														},
														"id": 579,
														"isConstant": false,
														"isLValue": true,
														"isPure": false,
														"lValueRequested": false,
														"memberName": "itemId",
														"nodeType": "MemberAccess",
														"referencedDeclaration": 221,
														"src": "4788:22:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes16",
															"typeString": "bytes16"
														}
													},
													"nodeType": "BinaryOperation",
													"operator": "==",
													"rightExpression": {
														"argumentTypes": null,
														"id": 580,
														"name": "_itemId",
														"nodeType": "Identifier",
														"overloadedDeclarations": [],
														"referencedDeclaration": 563,
														"src": "4814:7:2",
														"typeDescriptions": {
															"typeIdentifier": "t_bytes16",
															"typeString": "bytes16"
														}
													},
													"src": "4788:33:2",
													"typeDescriptions": {
														"typeIdentifier": "t_bool",
														"typeString": "bool"
													}
												},
												"falseBody": null,
												"id": 639,
												"nodeType": "IfStatement",
												"src": "4785:481:2",
												"trueBody": {
													"id": 638,
													"nodeType": "Block",
													"src": "4823:443:2",
													"statements": [
														{
															"assignments": [
																583
															],
															"declarations": [
																{
																	"constant": false,
																	"id": 583,
																	"name": "buyer",
																	"nodeType": "VariableDeclaration",
																	"scope": 643,
																	"src": "4834:13:2",
																	"stateVariable": false,
																	"storageLocation": "default",
																	"typeDescriptions": {
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	"typeName": {
																		"id": 582,
																		"name": "address",
																		"nodeType": "ElementaryTypeName",
																		"src": "4834:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_address",
																			"typeString": "address"
																		}
																	},
																	"value": null,
																	"visibility": "internal"
																}
															],
															"id": 588,
															"initialValue": {
																"argumentTypes": null,
																"expression": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 584,
																		"name": "transactions",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 240,
																		"src": "4850:12:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																			"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																		}
																	},
																	"id": 586,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 585,
																		"name": "i",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 567,
																		"src": "4863:1:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"nodeType": "IndexAccess",
																	"src": "4850:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																		"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																	}
																},
																"id": 587,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"memberName": "buyer",
																"nodeType": "MemberAccess",
																"referencedDeclaration": 219,
																"src": "4850:21:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_address",
																	"typeString": "address"
																}
															},
															"nodeType": "VariableDeclarationStatement",
															"src": "4834:37:2"
														},
														{
															"assignments": [
																590
															],
															"declarations": [
																{
																	"constant": false,
																	"id": 590,
																	"name": "seller",
																	"nodeType": "VariableDeclaration",
																	"scope": 643,
																	"src": "4881:14:2",
																	"stateVariable": false,
																	"storageLocation": "default",
																	"typeDescriptions": {
																		"typeIdentifier": "t_address",
																		"typeString": "address"
																	},
																	"typeName": {
																		"id": 589,
																		"name": "address",
																		"nodeType": "ElementaryTypeName",
																		"src": "4881:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_address",
																			"typeString": "address"
																		}
																	},
																	"value": null,
																	"visibility": "internal"
																}
															],
															"id": 595,
															"initialValue": {
																"argumentTypes": null,
																"expression": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 591,
																		"name": "transactions",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 240,
																		"src": "4898:12:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																			"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																		}
																	},
																	"id": 593,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 592,
																		"name": "i",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 567,
																		"src": "4911:1:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"nodeType": "IndexAccess",
																	"src": "4898:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																		"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																	}
																},
																"id": 594,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"memberName": "seller",
																"nodeType": "MemberAccess",
																"referencedDeclaration": 217,
																"src": "4898:22:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_address",
																	"typeString": "address"
																}
															},
															"nodeType": "VariableDeclarationStatement",
															"src": "4881:39:2"
														},
														{
															"assignments": [
																597
															],
															"declarations": [
																{
																	"constant": false,
																	"id": 597,
																	"name": "priceTransaction",
																	"nodeType": "VariableDeclaration",
																	"scope": 643,
																	"src": "4930:24:2",
																	"stateVariable": false,
																	"storageLocation": "default",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	"typeName": {
																		"id": 596,
																		"name": "uint256",
																		"nodeType": "ElementaryTypeName",
																		"src": "4930:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"value": null,
																	"visibility": "internal"
																}
															],
															"id": 602,
															"initialValue": {
																"argumentTypes": null,
																"expression": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 598,
																		"name": "transactions",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 240,
																		"src": "4957:12:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																			"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																		}
																	},
																	"id": 600,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 599,
																		"name": "i",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 567,
																		"src": "4970:1:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": false,
																	"nodeType": "IndexAccess",
																	"src": "4957:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																		"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																	}
																},
																"id": 601,
																"isConstant": false,
																"isLValue": true,
																"isPure": false,
																"lValueRequested": false,
																"memberName": "_price",
																"nodeType": "MemberAccess",
																"referencedDeclaration": 235,
																"src": "4957:22:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"nodeType": "VariableDeclarationStatement",
															"src": "4930:49:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"arguments": [
																	{
																		"argumentTypes": null,
																		"commonType": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		},
																		"id": 608,
																		"isConstant": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"leftExpression": {
																			"argumentTypes": null,
																			"baseExpression": {
																				"argumentTypes": null,
																				"id": 604,
																				"name": "fundsLocked",
																				"nodeType": "Identifier",
																				"overloadedDeclarations": [],
																				"referencedDeclaration": 244,
																				"src": "4998:11:2",
																				"typeDescriptions": {
																					"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
																					"typeString": "mapping(bytes16 => uint256)"
																				}
																			},
																			"id": 606,
																			"indexExpression": {
																				"argumentTypes": null,
																				"id": 605,
																				"name": "_itemId",
																				"nodeType": "Identifier",
																				"overloadedDeclarations": [],
																				"referencedDeclaration": 563,
																				"src": "5010:7:2",
																				"typeDescriptions": {
																					"typeIdentifier": "t_bytes16",
																					"typeString": "bytes16"
																				}
																			},
																			"isConstant": false,
																			"isLValue": true,
																			"isPure": false,
																			"lValueRequested": false,
																			"nodeType": "IndexAccess",
																			"src": "4998:20:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"nodeType": "BinaryOperation",
																		"operator": ">",
																		"rightExpression": {
																			"argumentTypes": null,
																			"hexValue": "30",
																			"id": 607,
																			"isConstant": false,
																			"isLValue": false,
																			"isPure": true,
																			"kind": "number",
																			"lValueRequested": false,
																			"nodeType": "Literal",
																			"src": "5019:1:2",
																			"subdenomination": null,
																			"typeDescriptions": {
																				"typeIdentifier": "t_rational_0_by_1",
																				"typeString": "int_const 0"
																			},
																			"value": "0"
																		},
																		"src": "4998:22:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_bool",
																			"typeString": "bool"
																		}
																	}
																],
																"expression": {
																	"argumentTypes": [
																		{
																			"typeIdentifier": "t_bool",
																			"typeString": "bool"
																		}
																	],
																	"id": 603,
																	"name": "require",
																	"nodeType": "Identifier",
																	"overloadedDeclarations": [],
																	"referencedDeclaration": 682,
																	"src": "4990:7:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
																		"typeString": "function (bool) pure"
																	}
																},
																"id": 609,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"kind": "functionCall",
																"lValueRequested": false,
																"names": [],
																"nodeType": "FunctionCall",
																"src": "4990:31:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_tuple$__$",
																	"typeString": "tuple()"
																}
															},
															"id": 610,
															"nodeType": "ExpressionStatement",
															"src": "4990:31:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 620,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"baseExpression": {
																		"argumentTypes": null,
																		"id": 611,
																		"name": "fundsLocked",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 244,
																		"src": "5031:11:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
																			"typeString": "mapping(bytes16 => uint256)"
																		}
																	},
																	"id": 613,
																	"indexExpression": {
																		"argumentTypes": null,
																		"id": 612,
																		"name": "_itemId",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 563,
																		"src": "5043:7:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_bytes16",
																			"typeString": "bytes16"
																		}
																	},
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"nodeType": "IndexAccess",
																	"src": "5031:20:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"commonType": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	},
																	"id": 619,
																	"isConstant": false,
																	"isLValue": false,
																	"isPure": false,
																	"lValueRequested": false,
																	"leftExpression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 614,
																			"name": "fundsLocked",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 244,
																			"src": "5052:11:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_bytes16_$_t_uint256_$",
																				"typeString": "mapping(bytes16 => uint256)"
																			}
																		},
																		"id": 616,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 615,
																			"name": "_itemId",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 563,
																			"src": "5064:7:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_bytes16",
																				"typeString": "bytes16"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "5052:20:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"nodeType": "BinaryOperation",
																	"operator": "-",
																	"rightExpression": {
																		"argumentTypes": null,
																		"components": [
																			{
																				"argumentTypes": null,
																				"id": 617,
																				"name": "priceTransaction",
																				"nodeType": "Identifier",
																				"overloadedDeclarations": [],
																				"referencedDeclaration": 597,
																				"src": "5076:16:2",
																				"typeDescriptions": {
																					"typeIdentifier": "t_uint256",
																					"typeString": "uint256"
																				}
																			}
																		],
																		"id": 618,
																		"isConstant": false,
																		"isInlineArray": false,
																		"isLValue": false,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "TupleExpression",
																		"src": "5075:18:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	},
																	"src": "5052:41:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_uint256",
																		"typeString": "uint256"
																	}
																},
																"src": "5031:62:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_uint256",
																	"typeString": "uint256"
																}
															},
															"id": 621,
															"nodeType": "ExpressionStatement",
															"src": "5031:62:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"arguments": [
																	{
																		"argumentTypes": null,
																		"id": 625,
																		"name": "priceTransaction",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 597,
																		"src": "5166:16:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	}
																],
																"expression": {
																	"argumentTypes": [
																		{
																			"typeIdentifier": "t_uint256",
																			"typeString": "uint256"
																		}
																	],
																	"expression": {
																		"argumentTypes": null,
																		"id": 622,
																		"name": "seller",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 590,
																		"src": "5150:6:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_address",
																			"typeString": "address"
																		}
																	},
																	"id": 624,
																	"isConstant": false,
																	"isLValue": false,
																	"isPure": false,
																	"lValueRequested": false,
																	"memberName": "transfer",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": null,
																	"src": "5150:15:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
																		"typeString": "function (uint256)"
																	}
																},
																"id": 626,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"kind": "functionCall",
																"lValueRequested": false,
																"names": [],
																"nodeType": "FunctionCall",
																"src": "5150:33:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_tuple$__$",
																	"typeString": "tuple()"
																}
															},
															"id": 627,
															"nodeType": "ExpressionStatement",
															"src": "5150:33:2"
														},
														{
															"expression": {
																"argumentTypes": null,
																"id": 635,
																"isConstant": false,
																"isLValue": false,
																"isPure": false,
																"lValueRequested": false,
																"leftHandSide": {
																	"argumentTypes": null,
																	"expression": {
																		"argumentTypes": null,
																		"baseExpression": {
																			"argumentTypes": null,
																			"id": 628,
																			"name": "transactions",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 240,
																			"src": "5194:12:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_TransactionNeoPlace_$236_storage_$",
																				"typeString": "mapping(uint256 => struct Transaction.TransactionNeoPlace storage ref)"
																			}
																		},
																		"id": 630,
																		"indexExpression": {
																			"argumentTypes": null,
																			"id": 629,
																			"name": "i",
																			"nodeType": "Identifier",
																			"overloadedDeclarations": [],
																			"referencedDeclaration": 567,
																			"src": "5207:1:2",
																			"typeDescriptions": {
																				"typeIdentifier": "t_uint256",
																				"typeString": "uint256"
																			}
																		},
																		"isConstant": false,
																		"isLValue": true,
																		"isPure": false,
																		"lValueRequested": false,
																		"nodeType": "IndexAccess",
																		"src": "5194:15:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_struct$_TransactionNeoPlace_$236_storage",
																			"typeString": "struct Transaction.TransactionNeoPlace storage ref"
																		}
																	},
																	"id": 631,
																	"isConstant": false,
																	"isLValue": true,
																	"isPure": false,
																	"lValueRequested": true,
																	"memberName": "status",
																	"nodeType": "MemberAccess",
																	"referencedDeclaration": 233,
																	"src": "5194:22:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_bytes8",
																		"typeString": "bytes8"
																	}
																},
																"nodeType": "Assignment",
																"operator": "=",
																"rightHandSide": {
																	"argumentTypes": null,
																	"arguments": [
																		{
																			"argumentTypes": null,
																			"hexValue": "70616964",
																			"id": 633,
																			"isConstant": false,
																			"isLValue": false,
																			"isPure": true,
																			"kind": "string",
																			"lValueRequested": false,
																			"nodeType": "Literal",
																			"src": "5234:6:2",
																			"subdenomination": null,
																			"typeDescriptions": {
																				"typeIdentifier": "t_stringliteral_5ab53550295bfc9315c562232d99e75119ebb4d3b8a6e012160126a3506b02a8",
																				"typeString": "literal_string \"paid\""
																			},
																			"value": "paid"
																		}
																	],
																	"expression": {
																		"argumentTypes": [
																			{
																				"typeIdentifier": "t_stringliteral_5ab53550295bfc9315c562232d99e75119ebb4d3b8a6e012160126a3506b02a8",
																				"typeString": "literal_string \"paid\""
																			}
																		],
																		"id": 632,
																		"name": "stringToBytes8",
																		"nodeType": "Identifier",
																		"overloadedDeclarations": [],
																		"referencedDeclaration": 666,
																		"src": "5219:14:2",
																		"typeDescriptions": {
																			"typeIdentifier": "t_function_internal_nonpayable$_t_string_memory_ptr_$returns$_t_bytes8_$",
																			"typeString": "function (string memory) returns (bytes8)"
																		}
																	},
																	"id": 634,
																	"isConstant": false,
																	"isLValue": false,
																	"isPure": false,
																	"kind": "functionCall",
																	"lValueRequested": false,
																	"names": [],
																	"nodeType": "FunctionCall",
																	"src": "5219:22:2",
																	"typeDescriptions": {
																		"typeIdentifier": "t_bytes8",
																		"typeString": "bytes8"
																	}
																},
																"src": "5194:47:2",
																"typeDescriptions": {
																	"typeIdentifier": "t_bytes8",
																	"typeString": "bytes8"
																}
															},
															"id": 636,
															"nodeType": "ExpressionStatement",
															"src": "5194:47:2"
														},
														{
															"id": 637,
															"nodeType": "Break",
															"src": "5252:5:2"
														}
													]
												}
											}
										]
									},
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 572,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"id": 570,
											"name": "i",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 567,
											"src": "4747:1:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "<=",
										"rightExpression": {
											"argumentTypes": null,
											"id": 571,
											"name": "transactionCounter",
											"nodeType": "Identifier",
											"overloadedDeclarations": [],
											"referencedDeclaration": 246,
											"src": "4752:18:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"src": "4747:23:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"id": 641,
									"initializationExpression": {
										"assignments": [
											567
										],
										"declarations": [
											{
												"constant": false,
												"id": 567,
												"name": "i",
												"nodeType": "VariableDeclaration",
												"scope": 643,
												"src": "4735:6:2",
												"stateVariable": false,
												"storageLocation": "default",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												},
												"typeName": {
													"id": 566,
													"name": "uint",
													"nodeType": "ElementaryTypeName",
													"src": "4735:4:2",
													"typeDescriptions": {
														"typeIdentifier": "t_uint256",
														"typeString": "uint256"
													}
												},
												"value": null,
												"visibility": "internal"
											}
										],
										"id": 569,
										"initialValue": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 568,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "4744:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"nodeType": "VariableDeclarationStatement",
										"src": "4735:10:2"
									},
									"loopExpression": {
										"expression": {
											"argumentTypes": null,
											"id": 574,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"nodeType": "UnaryOperation",
											"operator": "++",
											"prefix": false,
											"src": "4772:3:2",
											"subExpression": {
												"argumentTypes": null,
												"id": 573,
												"name": "i",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 567,
												"src": "4772:1:2",
												"typeDescriptions": {
													"typeIdentifier": "t_uint256",
													"typeString": "uint256"
												}
											},
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"id": 575,
										"nodeType": "ExpressionStatement",
										"src": "4772:3:2"
									},
									"nodeType": "ForStatement",
									"src": "4731:541:2"
								}
							]
						},
						"id": 643,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "unlockFunds",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 564,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 563,
									"name": "_itemId",
									"nodeType": "VariableDeclaration",
									"scope": 643,
									"src": "4700:15:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes16",
										"typeString": "bytes16"
									},
									"typeName": {
										"id": 562,
										"name": "bytes16",
										"nodeType": "ElementaryTypeName",
										"src": "4700:7:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes16",
											"typeString": "bytes16"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "4699:17:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 565,
							"nodeType": "ParameterList",
							"parameters": [],
							"src": "4724:0:2"
						},
						"scope": 667,
						"src": "4679:597:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					},
					{
						"body": {
							"id": 665,
							"nodeType": "Block",
							"src": "5350:186:2",
							"statements": [
								{
									"assignments": [
										651
									],
									"declarations": [
										{
											"constant": false,
											"id": 651,
											"name": "tempEmptyStringTest",
											"nodeType": "VariableDeclaration",
											"scope": 666,
											"src": "5356:32:2",
											"stateVariable": false,
											"storageLocation": "memory",
											"typeDescriptions": {
												"typeIdentifier": "t_bytes_memory_ptr",
												"typeString": "bytes memory"
											},
											"typeName": {
												"id": 650,
												"name": "bytes",
												"nodeType": "ElementaryTypeName",
												"src": "5356:5:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes_storage_ptr",
													"typeString": "bytes storage pointer"
												}
											},
											"value": null,
											"visibility": "internal"
										}
									],
									"id": 655,
									"initialValue": {
										"argumentTypes": null,
										"arguments": [
											{
												"argumentTypes": null,
												"id": 653,
												"name": "source",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 645,
												"src": "5397:6:2",
												"typeDescriptions": {
													"typeIdentifier": "t_string_memory_ptr",
													"typeString": "string memory"
												}
											}
										],
										"expression": {
											"argumentTypes": [
												{
													"typeIdentifier": "t_string_memory_ptr",
													"typeString": "string memory"
												}
											],
											"id": 652,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"lValueRequested": false,
											"nodeType": "ElementaryTypeNameExpression",
											"src": "5391:5:2",
											"typeDescriptions": {
												"typeIdentifier": "t_type$_t_bytes_storage_ptr_$",
												"typeString": "type(bytes storage pointer)"
											},
											"typeName": "bytes"
										},
										"id": 654,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"kind": "typeConversion",
										"lValueRequested": false,
										"names": [],
										"nodeType": "FunctionCall",
										"src": "5391:13:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes_memory",
											"typeString": "bytes memory"
										}
									},
									"nodeType": "VariableDeclarationStatement",
									"src": "5356:48:2"
								},
								{
									"condition": {
										"argumentTypes": null,
										"commonType": {
											"typeIdentifier": "t_uint256",
											"typeString": "uint256"
										},
										"id": 659,
										"isConstant": false,
										"isLValue": false,
										"isPure": false,
										"lValueRequested": false,
										"leftExpression": {
											"argumentTypes": null,
											"expression": {
												"argumentTypes": null,
												"id": 656,
												"name": "tempEmptyStringTest",
												"nodeType": "Identifier",
												"overloadedDeclarations": [],
												"referencedDeclaration": 651,
												"src": "5414:19:2",
												"typeDescriptions": {
													"typeIdentifier": "t_bytes_memory_ptr",
													"typeString": "bytes memory"
												}
											},
											"id": 657,
											"isConstant": false,
											"isLValue": false,
											"isPure": false,
											"lValueRequested": false,
											"memberName": "length",
											"nodeType": "MemberAccess",
											"referencedDeclaration": null,
											"src": "5414:26:2",
											"typeDescriptions": {
												"typeIdentifier": "t_uint256",
												"typeString": "uint256"
											}
										},
										"nodeType": "BinaryOperation",
										"operator": "==",
										"rightExpression": {
											"argumentTypes": null,
											"hexValue": "30",
											"id": 658,
											"isConstant": false,
											"isLValue": false,
											"isPure": true,
											"kind": "number",
											"lValueRequested": false,
											"nodeType": "Literal",
											"src": "5444:1:2",
											"subdenomination": null,
											"typeDescriptions": {
												"typeIdentifier": "t_rational_0_by_1",
												"typeString": "int_const 0"
											},
											"value": "0"
										},
										"src": "5414:31:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bool",
											"typeString": "bool"
										}
									},
									"falseBody": null,
									"id": 663,
									"nodeType": "IfStatement",
									"src": "5410:62:2",
									"trueBody": {
										"id": 662,
										"nodeType": "Block",
										"src": "5447:25:2",
										"statements": [
											{
												"expression": {
													"argumentTypes": null,
													"hexValue": "307830",
													"id": 660,
													"isConstant": false,
													"isLValue": false,
													"isPure": true,
													"kind": "number",
													"lValueRequested": false,
													"nodeType": "Literal",
													"src": "5462:3:2",
													"subdenomination": null,
													"typeDescriptions": {
														"typeIdentifier": "t_rational_0_by_1",
														"typeString": "int_const 0"
													},
													"value": "0x0"
												},
												"functionReturnParameters": 649,
												"id": 661,
												"nodeType": "Return",
												"src": "5455:10:2"
											}
										]
									}
								},
								{
									"externalReferences": [
										{
											"result": {
												"declaration": 648,
												"isOffset": false,
												"isSlot": false,
												"src": "5495:6:2",
												"valueSize": 1
											}
										},
										{
											"source": {
												"declaration": 645,
												"isOffset": false,
												"isSlot": false,
												"src": "5515:6:2",
												"valueSize": 1
											}
										}
									],
									"id": 664,
									"nodeType": "InlineAssembly",
									"operations": "{\n    result := mload(add(source, 8))\n}",
									"src": "5478:58:2"
								}
							]
						},
						"id": 666,
						"implemented": true,
						"isConstructor": false,
						"isDeclaredConst": false,
						"modifiers": [],
						"name": "stringToBytes8",
						"nodeType": "FunctionDefinition",
						"parameters": {
							"id": 646,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 645,
									"name": "source",
									"nodeType": "VariableDeclaration",
									"scope": 666,
									"src": "5304:20:2",
									"stateVariable": false,
									"storageLocation": "memory",
									"typeDescriptions": {
										"typeIdentifier": "t_string_memory_ptr",
										"typeString": "string memory"
									},
									"typeName": {
										"id": 644,
										"name": "string",
										"nodeType": "ElementaryTypeName",
										"src": "5304:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_string_storage_ptr",
											"typeString": "string storage pointer"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "5303:22:2"
						},
						"payable": false,
						"returnParameters": {
							"id": 649,
							"nodeType": "ParameterList",
							"parameters": [
								{
									"constant": false,
									"id": 648,
									"name": "result",
									"nodeType": "VariableDeclaration",
									"scope": 666,
									"src": "5335:13:2",
									"stateVariable": false,
									"storageLocation": "default",
									"typeDescriptions": {
										"typeIdentifier": "t_bytes8",
										"typeString": "bytes8"
									},
									"typeName": {
										"id": 647,
										"name": "bytes8",
										"nodeType": "ElementaryTypeName",
										"src": "5335:6:2",
										"typeDescriptions": {
											"typeIdentifier": "t_bytes8",
											"typeString": "bytes8"
										}
									},
									"value": null,
									"visibility": "internal"
								}
							],
							"src": "5334:15:2"
						},
						"scope": 667,
						"src": "5280:256:2",
						"stateMutability": "nonpayable",
						"superFunction": null,
						"visibility": "public"
					}
				],
				"scope": 668,
				"src": "1198:4341:2"
			}
		],
		"src": "0:5540:2"
	},
	"compiler": {
		"name": "solc",
		"version": "0.4.19+commit.c4cbbb05.Emscripten.clang"
	},
	"networks": {
		"4": {
			"events": {},
			"links": {},
			"address": "0xe7507bda215b7312c4bfb110d89a8d8e56243623",
			"transactionHash": "0x3755902e04cf49a511626d177d6facc974dd6430143b6d106702b7a3d93986a3"
		},
		"5791": {
			"events": {},
			"links": {},
			"address": "0x345ca3e014aaf5dca488057592ee47305d9b3e10",
			"transactionHash": "0x9e7e2217d46222b6c2233d4d4028989b43bfc855ceab71862d88587461852030"
		},
		"5792": {
			"events": {},
			"links": {},
			"address": "0xf328c11c4df88d18fcbd30ad38d8b4714f4b33bf",
			"transactionHash": "0x9e84a0c569dc2ef0276457a1f4a4611b70d6ca36342f229aff0bf416d982a2ed"
		}
	},
	"schemaVersion": "2.0.0",
	"updatedAt": "2018-03-12T15:20:40.919Z"
};

/***/ }),

/***/ 1629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
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

/***/ 1633:
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

/***/ 1634:
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

/***/ 1635:
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

/***/ 1636:
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

/***/ 1637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({ name: 'keys' })
], KeysPipe);

//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ 1638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashCardComponent; });
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

var FlashCardComponent = (function () {
    function FlashCardComponent() {
        this.toggled = false;
    }
    FlashCardComponent.prototype.ngAfterViewChecked = function () {
        var frontH = this.fcFront.nativeElement.querySelector('.fc-front').offsetHeight + 0;
        var backH = this.fcBack.nativeElement.querySelector('.fc-back').offsetHeight + 0;
        var h = ((frontH > backH) ? frontH : backH) + 'px';
        this.fcContainer.nativeElement.style.height = h;
        this.fcBack.nativeElement.style.height = 0;
        this.fcFront.nativeElement.style.height = h;
    };
    FlashCardComponent.prototype.toggle = function () {
        this.toggled = !this.toggled;
    };
    return FlashCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('fcContainer'),
    __metadata("design:type", Object)
], FlashCardComponent.prototype, "fcContainer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('front'),
    __metadata("design:type", Object)
], FlashCardComponent.prototype, "fcFront", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('back'),
    __metadata("design:type", Object)
], FlashCardComponent.prototype, "fcBack", void 0);
FlashCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'flash-card',template:/*ion-inline-start:"D:\ivpay2\src\components\flash-card\flash-card.html"*/'<ion-card class="fc-container" #fcContainer>\n    <div class="front" #front>\n        <ng-content class="" select=".fc-front"></ng-content>\n    </div>\n\n    <div class="back" #back>\n        <ng-content select=".fc-back"></ng-content>\n    </div>\n</ion-card>\n'/*ion-inline-end:"D:\ivpay2\src\components\flash-card\flash-card.html"*/
    })
], FlashCardComponent);

//# sourceMappingURL=flash-card.js.map

/***/ }),

/***/ 1639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_map_service__ = __webpack_require__(390);
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

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WalletService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__web3_service__ = __webpack_require__(180);
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
    function WalletService(api, web3Service, http, afd) {
        this.api = api;
        this.web3Service = web3Service;
        this.http = http;
        this.afd = afd;
        this.token = "4dcf9608e8ad4fd8bb3e5262b66d4cee";
        this.trigramAvailable = ['ETH', 'BTC', 'NEO', 'GAS'];
        this.walletCaract = {
            btc: { url: "btc/test3/addrs", rate: Math.pow(10, 8) },
            eth: { url: "beth/test/addrs", rate: Math.pow(10, 18) },
            neo: { url: "testnet", rate: Math.pow(10, 18) }
        };
        this.apiEtherScan = "https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=";
        this.tokenUrl = "?token=" + this.token;
    }
    WalletService.prototype.createWallet = function (cryptoTrigram) {
        if (cryptoTrigram.toLowerCase() != 'neo' && cryptoTrigram.toLowerCase() != 'gas') {
            return this.api.post(this.walletCaract[cryptoTrigram.toLowerCase()].url + this.tokenUrl, {}).map(mapWallet);
        }
        else {
            return this.createWalletNeo();
        }
    };
    WalletService.prototype.getBalanceWallets = function (fromAddress, trigram) {
        var _this = this;
        if (trigram.toLowerCase() != 'neo' && trigram.toLowerCase() != 'gas' && trigram.toLowerCase() != 'eth') {
            return this.api.get(this.walletCaract[trigram.toLowerCase()].url + "/" + fromAddress + "/balance" + this.tokenUrl, {}).map(function (data) { return data.json().balance / _this.walletCaract[trigram.toLowerCase()].rate; });
        }
        else if (trigram.toLowerCase() == "eth") {
            return this.http.get(this.apiEtherScan + "0x" + fromAddress + "&tag=latest").map(function (data) { return data.json()['result'] / _this.walletCaract[trigram.toLowerCase()].rate; });
        }
        else {
            return this.getBalanceWalletNeo(fromAddress).map(function (data) { return data.assets[trigram.toUpperCase()].balance.toNumber(); });
        }
    };
    WalletService.prototype.saveWallets = function (wallets, uid) {
        //console.log(wallets);
        this.afd.object('/users/' + uid + "/wallets/").set(wallets);
    };
    WalletService.prototype.getWallets = function (uid) {
        return this.afd.object('/users/' + uid + '/wallets/');
    };
    WalletService.prototype.createWalletNeo = function () {
        var privateKey = __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js___default.a.create.privateKey();
        var publicKey = __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js___default.a.get.publicKeyFromPrivateKey(privateKey);
        var scriptHash = __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js___default.a.get.scriptHashFromPublicKey(publicKey);
        var address = __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js___default.a.get.addressFromScriptHash(scriptHash);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].fromPromise(new Promise(function (resolve) {
            resolve(({ name: 'NEO', trigram: 'NEO', address: address, public: publicKey, private: privateKey, amount: 0 }));
        }));
    };
    WalletService.prototype.getBalanceWalletNeo = function (fromAddress) {
        var balance = __WEBPACK_IMPORTED_MODULE_6__cityofzion_neon_js___default.a.get.balance('TestNet', fromAddress);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].fromPromise(balance);
    };
    return WalletService;
}());
WalletService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_7__web3_service__["a" /* Web3Service */],
        __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
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

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* unused harmony export environment */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Web3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
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



var environment = {
    production: false,
    //HttpProvider: "http://localhost:7545",
    HttpProvider: "https://rinkeby.infura.io/EU0TpB2ZTZvVWhC7qM7a"
};
var Web3Service = (function () {
    function Web3Service(alertCtrl) {
        this.alertCtrl = alertCtrl;
        //this.checkAndInstantiateWeb3();
    }
    Web3Service.prototype.initWeb3 = function (password, privateKeyEncrypted, addressWallet) {
        var Web3 = __webpack_require__(279);
        var ProviderEngine = __webpack_require__(1057);
        var CacheSubprovider = __webpack_require__(1196);
        var FixtureSubprovider = __webpack_require__(1198);
        var FilterSubprovider = __webpack_require__(1199);
        var VmSubprovider = __webpack_require__(1200);
        var HookedWalletSubprovider = __webpack_require__(1304);
        var NonceSubprovider = __webpack_require__(1311);
        var RpcSubprovider = __webpack_require__(1312);
        var Transaction = __webpack_require__(317);
        var decrypted = null;
        try {
            decrypted = __WEBPACK_IMPORTED_MODULE_1_crypto_js__["AES"].decrypt(privateKeyEncrypted, password);
        }
        catch (e) {
            decrypted = null;
        }
        var key = decrypted.toString(__WEBPACK_IMPORTED_MODULE_1_crypto_js__["enc"].Utf8);
        var engine = new ProviderEngine();
        var privateKey = new Buffer(key, 'hex');
        var address = new Buffer(addressWallet, 'hex');
        var addressHex = '0x' + address.toString('hex');
        // static results
        var providerC = engine.addProvider(new FixtureSubprovider({
            web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
            net_listening: true,
            eth_hashrate: '0x00',
            eth_mining: false,
            eth_syncing: true
        }));
        // cache layer
        engine.addProvider(new CacheSubprovider());
        // filters
        engine.addProvider(new FilterSubprovider());
        // pending nonce
        var providerB = engine.addProvider(new NonceSubprovider());
        // vm
        engine.addProvider(new VmSubprovider());
        // id mgmt
        var providerA = engine.addProvider(new HookedWalletSubprovider({
            getAccounts: function (cb) {
                cb(null, [addressHex]);
            },
            signTransaction: function (txParams, cb) {
                var tx = new Transaction(txParams);
                tx.sign(privateKey);
                var rawTx = '0x' + tx.serialize().toString('hex');
                cb(null, rawTx);
            }
        }));
        // data source
        engine.addProvider(new RpcSubprovider({
            rpcUrl: environment.HttpProvider,
        }));
        // log new blocks
        // engine.on('block', function(block){
        //   console.log('================================')
        //   console.log('BLOCK CHANGED:', '#'+block.number.toString('hex'), '0x'+block.hash.toString('hex'))
        //   console.log('================================')
        // });
        // network connectivity error
        engine.on('error', function (err) {
            // report connectivity errors
            console.error(err.stack);
        });
        // start polling for blocks
        engine.start();
        var web3 = new Web3(engine);
        this.web3 = web3;
    };
    return Web3Service;
}());
Web3Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], Web3Service);

//# sourceMappingURL=web3.service.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2).Buffer))

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firebase_firebase__ = __webpack_require__(240);
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
        this.afd.list('/articles/').push(article);
        // this.firebase.uploadToFirebaseData(article.taked_picture, "articles").then((value:any) => {
        //   article.taked_picture = value.photo;
        //   this.afd.list('/articles/').push(article);
        // }).catch(err => {
        //   this.makeFileIntoBlob(article.taked_picture).then(datablob => {
        //     this.firebase.uploadToFirebaseFile(datablob, "articles").then((value:any) => {
        //       article.taked_picture = value.photo;
        //       this.afd.list('/articles/').push(article);
        //     });
        //   });
        // });
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
        this.afd.object('/users/' + this.userService._userFirebase.uid + "/inventory/" + article.ean + '/').set(article);
        // this.firebase.uploadToFirebaseData(article.taked_picture, "inventory").then((value:any) => {
        //   article.taked_picture = value.photo;
        //   this.afd.object('/users/' + this.userService._userFirebase.uid + "/inventory/" + article.ean + '/').set(article);
        // }).catch(err => {
        //   this.makeFileIntoBlob(article.taked_picture).then(datablob => {
        //     this.firebase.uploadToFirebaseFile(datablob, "inventory").then((value:any) => {
        //       article.taked_picture = value.photo;
        //       this.afd.object('/users/' + this.userService._userFirebase.uid + "/inventory/" + article.ean + '/').set(article);
        //     });
        //   });
        // });
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
        this.afd.list('/services/').push(service);
        // this.firebase.uploadToFirebaseData(service.taked_picture, "services").then((value:any) => {
        //   service.taked_picture = value.photo;
        //   this.afd.list('/services/').push(service);
        // }).catch(err => {
        //   this.makeFileIntoBlob(service.taked_picture).then(datablob => {
        //     this.firebase.uploadToFirebaseFile(datablob, "services").then((value:any) => {
        //       service.taked_picture = value.photo;
        //       this.afd.list('/services/').push(service);
        //     });
        //   });
        // });
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

/***/ 239:
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

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(713);
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

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(120);
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

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(389);
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

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionWeb3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__web3_service__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__wallet_service__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var transactionArtifacts = __webpack_require__(1568);
var contract = __webpack_require__(1569);
var TransactionWeb3Service = (function () {
    function TransactionWeb3Service(web3Ser, walletService) {
        this.web3Ser = web3Ser;
        this.walletService = walletService;
        this.Transaction = contract(transactionArtifacts);
        // Bootstrap the MetaCoin abstraction for Use
        this.Transaction.setProvider(web3Ser.web3.currentProvider);
    }
    TransactionWeb3Service.prototype.getSales = function (from) {
        var _this = this;
        var meta;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.Transaction
                .deployed()
                .then(function (instance) {
                meta = instance;
                //we use call here so the call doesn't try and write, making it free
                return meta.getSales.call({
                    from: from
                });
            })
                .then(function (value) {
                observer.next(value);
                observer.complete();
            })
                .catch(function (e) {
                console.log(e);
                observer.error(e);
            });
        });
    };
    TransactionWeb3Service.prototype.getPurchases = function (from) {
        var _this = this;
        var meta;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.Transaction
                .deployed()
                .then(function (instance) {
                meta = instance;
                //we use call here so the call doesn't try and write, making it free
                return meta.getPurchases.call({
                    from: from
                });
            })
                .then(function (value) {
                observer.next(value);
                observer.complete();
            })
                .catch(function (e) {
                console.log(e);
                observer.error(e);
            });
        });
    };
    TransactionWeb3Service.prototype.getTransaction = function (id) {
        var _this = this;
        var meta;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.Transaction
                .deployed()
                .then(function (instance) {
                meta = instance;
                //we use call here so the call doesn't try and write, making it free
                return meta.transactions.call(id);
            })
                .then(function (value) {
                observer.next(value);
                observer.complete();
            })
                .catch(function (e) {
                console.log(e);
                observer.error(e);
            });
        });
    };
    TransactionWeb3Service.prototype.buyItem = function (from, to, itemId, typeItem, location, pictureHash, comment, price) {
        var _this = this;
        var meta;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.Transaction
                .deployed()
                .then(function (instance) {
                meta = instance;
                //we use call here so the call doesn't try and write, making it free
                return meta.buyItem(to.startsWith("0x") ? to : "0x" + to, _this.web3Ser.web3.fromAscii(itemId), _this.web3Ser.web3.fromAscii(typeItem), _this.web3Ser.web3.fromAscii(location), pictureHash, _this.web3Ser.web3.fromAscii(comment), _this.web3Ser.web3.fromAscii("sold"), _this.web3Ser.web3.toWei(price, "ether"), {
                    from: from.startsWith("0x") ? from : "0x" + from,
                    value: _this.web3Ser.web3.toWei(price, "ether"),
                    gasLimit: 3000000,
                    gas: 500000,
                    gasPrice: 21000000000
                });
            })
                .then(function (value) {
                console.log(value);
                observer.next(value);
                observer.complete();
            })
                .catch(function (e) {
                console.log(e);
                observer.error(e);
            });
        });
    };
    TransactionWeb3Service.prototype.unlockFunds = function (articleId) {
        var _this = this;
        var meta;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.Transaction
                .deployed()
                .then(function (instance) {
                meta = instance;
                //we use call here so the call doesn't try and write, making it free
                return meta.unlockFunds(articleId, {
                    from: _this.walletService.wallets.eth.address.startsWith("0x") ? _this.walletService.wallets.eth.address : "0x" + _this.walletService.wallets.eth.address,
                    gasLimit: 3000000,
                    gas: 500000,
                    gasPrice: 21000000000
                });
            })
                .then(function (value) {
                console.log(value);
                observer.next(value);
                observer.complete();
            })
                .catch(function (e) {
                console.log(e);
                observer.error(e);
            });
        });
    };
    return TransactionWeb3Service;
}());
TransactionWeb3Service = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__web3_service__["a" /* Web3Service */],
        __WEBPACK_IMPORTED_MODULE_3__wallet_service__["a" /* WalletService */]])
], TransactionWeb3Service);

//# sourceMappingURL=transaction..web3.service.js.map

/***/ }),

/***/ 402:
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
webpackEmptyAsyncContext.id = 402;

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NATIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPONENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PIPES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant_variable__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__global_setting__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_firebase_firebase__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_crud_storage_crud_storage__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_util_toast_service__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_util_alert_service__ = __webpack_require__(1629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_call_number__ = __webpack_require__(1630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_crop__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_date_picker__ = __webpack_require__(1631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_photo_library__ = __webpack_require__(1632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_push__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_autosize_autosize__ = __webpack_require__(1633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_invoke_directive_invokeDirective__ = __webpack_require__(1634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pipes_capitalize_pipe__ = __webpack_require__(1635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_barcode_scanner__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_google_maps__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_wallet_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_api__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angularfire2_auth__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_cryptocompare_service__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_request_service__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_transaction_service__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers_article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pipes_distance_pipe__ = __webpack_require__(1636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_message_service__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__agm_core__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_map_service__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_clipboard__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38_ionic2_rating__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pipes_keys_pipe__ = __webpack_require__(1637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_in_app_browser__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_flash_card_flash_card__ = __webpack_require__(1638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_web3_service__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_transaction_web3_service__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__providers_ipfs_service__ = __webpack_require__(691);
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
    __WEBPACK_IMPORTED_MODULE_40__ionic_native_in_app_browser__["a" /* InAppBrowser */],
    __WEBPACK_IMPORTED_MODULE_42__providers_web3_service__["a" /* Web3Service */],
    __WEBPACK_IMPORTED_MODULE_43__providers_transaction_web3_service__["a" /* TransactionWeb3Service */],
    __WEBPACK_IMPORTED_MODULE_44__providers_ipfs_service__["a" /* IpfsService */]
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
var COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_41__components_flash_card_flash_card__["a" /* FlashCardComponent */]
];
var DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_20__components_autosize_autosize__["a" /* Autosize */],
    __WEBPACK_IMPORTED_MODULE_21__components_invoke_directive_invokeDirective__["a" /* InvokeDirective */]
];
var PIPES = [
    __WEBPACK_IMPORTED_MODULE_22__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
    __WEBPACK_IMPORTED_MODULE_33__pipes_distance_pipe__["a" /* DistancePipe */],
    __WEBPACK_IMPORTED_MODULE_39__pipes_keys_pipe__["a" /* KeysPipe */]
];
//# sourceMappingURL=app.imports.js.map

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add/add.module": [
		1640,
		35
	],
	"../pages/addService/addService.module": [
		1641,
		36
	],
	"../pages/article/article.module": [
		1642,
		34
	],
	"../pages/article/modalpopup/modal-article-action.module": [
		1643,
		33
	],
	"../pages/article/modalqrcoderequest/modal-article-qrcode.module": [
		1644,
		7
	],
	"../pages/auth/login.module": [
		1645,
		32
	],
	"../pages/auth/login/firebase-login.module": [
		1646,
		31
	],
	"../pages/auth/register/register.module": [
		1647,
		30
	],
	"../pages/discussions/discussions.module": [
		1648,
		29
	],
	"../pages/fiat/fiat.module": [
		1649,
		6
	],
	"../pages/home/home.module": [
		1650,
		28
	],
	"../pages/home/homeMarket/homeMarket.module": [
		1651,
		27
	],
	"../pages/home/homeService/homeService.module": [
		1652,
		26
	],
	"../pages/inventory/inventory.module": [
		1653,
		25
	],
	"../pages/ivpay/ivpay.module": [
		1654,
		24
	],
	"../pages/messages/messages.module": [
		1655,
		9
	],
	"../pages/mystore/mystore.module": [
		1656,
		23
	],
	"../pages/pay/pay.module": [
		1657,
		5
	],
	"../pages/profile/profile-settings.module": [
		1658,
		22
	],
	"../pages/purchase/purchase.module": [
		1659,
		21
	],
	"../pages/request/request.module": [
		1660,
		4
	],
	"../pages/sales/mysales.module": [
		1661,
		20
	],
	"../pages/scan/scan.module": [
		1662,
		3
	],
	"../pages/service/modalpopup/modal-service-action.module": [
		1664,
		19
	],
	"../pages/service/modalqrcoderequest/modal-service-qrcode.module": [
		1665,
		2
	],
	"../pages/service/service.module": [
		1663,
		18
	],
	"../pages/side-menu/side-menu.module": [
		1666,
		17
	],
	"../pages/store/store.module": [
		1667,
		15
	],
	"../pages/storeService/storeService.module": [
		1668,
		16
	],
	"../pages/tabs/tabs.module": [
		1669,
		14
	],
	"../pages/theming/theming.module": [
		1670,
		13
	],
	"../pages/transaction/transaction.module": [
		1671,
		12
	],
	"../pages/transfer/transfer.module": [
		1672,
		11
	],
	"../pages/wallet-action/action-wallet.module": [
		1674,
		1
	],
	"../pages/wallet-action/modalpopup/modal-wallet-action.module": [
		1675,
		8
	],
	"../pages/wallet-detail/wallet-detail.module": [
		1676,
		10
	],
	"../pages/wallet/wallet.module": [
		1673,
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
webpackAsyncContext.id = 456;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 601:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CryptocompareService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(186);
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

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallet_service__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_service__ = __webpack_require__(135);
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

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransactionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__article_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib__ = __webpack_require__(1578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_bigi__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_bigi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_bigi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_buffer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__cityofzion_neon_js__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__cityofzion_neon_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__cityofzion_neon_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__transaction_web3_service__ = __webpack_require__(392);
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
    function TransactionService(toastCtrl, loadingCtrl, apiHttp, userService, articleService, transactionWeb3Service, afd, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.apiHttp = apiHttp;
        this.userService = userService;
        this.articleService = articleService;
        this.transactionWeb3Service = transactionWeb3Service;
        this.afd = afd;
        this.alertCtrl = alertCtrl;
        this.token = "4dcf9608e8ad4fd8bb3e5262b66d4cee";
        this.walletCaract = {
            btc: { url: "btc/test3", rate: Math.pow(10, 8) },
            eth: { url: "beth/test", rate: Math.pow(10, 18) },
            neo: { url: "Testnet", rate: Math.pow(10, 0) },
            gas: { url: "Testnet", rate: Math.pow(10, 0) }
        };
        this.tokenUrl = "?token=" + this.token;
    }
    TransactionService.prototype.sendCrypto = function (trigram, amount, wallet, toAddress, password) {
        var _this = this;
        amount = Math.round(amount * this.walletCaract[trigram.toLowerCase()].rate);
        //console.log(wallet);
        //console.log(password);
        var intent = null;
        var config = null;
        try {
            var decrypted = __WEBPACK_IMPORTED_MODULE_6_crypto_js__["AES"].decrypt(wallet.private, password);
            var key = decrypted.toString(__WEBPACK_IMPORTED_MODULE_6_crypto_js__["enc"].Utf8);
            var keys = new __WEBPACK_IMPORTED_MODULE_7_bitcoinjs_lib__["ECPair"](__WEBPACK_IMPORTED_MODULE_8_bigi__["fromHex"](key));
            if (trigram.toUpperCase() == 'NEO' || trigram.toUpperCase() == 'GAS') {
                if (trigram.toUpperCase() == 'NEO') {
                    intent = __WEBPACK_IMPORTED_MODULE_11__cityofzion_neon_js__["api"].makeIntent({ NEO: amount }, toAddress);
                }
                else {
                    intent = __WEBPACK_IMPORTED_MODULE_11__cityofzion_neon_js__["api"].makeIntent({ GAS: amount }, toAddress);
                }
                config = { net: 'TestNet',
                    address: wallet.address,
                    privateKey: key,
                    intents: intent
                };
            }
        }
        catch (e) {
            return __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].throw(new EvalError('Your password is not correct'));
        }
        if (trigram.toUpperCase() == 'NEO' || trigram.toUpperCase() == 'GAS') {
            var request = __WEBPACK_IMPORTED_MODULE_10_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_11__cityofzion_neon_js___default.a.sendAsset(config)
                .then(function (config) {
                return config.result;
            }));
            return request;
        }
        else {
            var request = this.apiHttp.post(this.walletCaract[trigram.toLowerCase()].url + "/txs/new" + this.tokenUrl, JSON.stringify({
                inputs: [{ addresses: [wallet.address] }],
                "outputs": [{ "addresses": [toAddress], "value": amount }]
            }));
            var self_1 = this;
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
                self_1.apiHttp.post(_this.walletCaract[trigram.toLowerCase()].url + "/txs/send" + _this.tokenUrl, JSON.stringify(content)).subscribe(function (response1) {
                });
            });
            return request;
        }
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
        var loading = this.loadingCtrl.create({
            content: 'Please wait while validating your transaction'
        });
        loading.present();
        if (trigram.toUpperCase() == "ETH") {
            this.transactionWeb3Service.buyItem(wallet.address, toAddress, articleId, "article", article.address, article.taked_picture.split('/ipfs/')[1], label, amount)
                .subscribe(function (value) {
                article.status = "sold";
                article.buyeruid = _this.userService._userFirebase.uid;
                _this.articleService.updateArticle(articleId, article);
                _this.saveTransaction(({
                    cryptoTrigram: trigram,
                    walletFrom: wallet.address,
                    walletTo: toAddress,
                    amount: amount,
                    date: Date.now(),
                    label: label,
                    articleId: articleId,
                    hash: value.tx
                }));
                loading.dismissAll();
                var toast = _this.toastCtrl.create({
                    message: 'Transaction saved and funds locked in Smart contract.\nConfirm the reception once the item received to unlock funds\nTx: ' + value.tx,
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
        }
        else {
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
                loading.dismissAll();
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
        }
    };
    TransactionService.prototype.payInventory = function (trigram, wallet, toAddress, amount, password, label, article) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait while validating your transaction'
        });
        loading.present();
        if (trigram.toUpperCase() == "ETH") {
            this.transactionWeb3Service.buyItem(wallet.address, toAddress, article.$key, "article", article.address, article.taked_picture.split('/ipfs/')[1], label, amount)
                .subscribe(function (value) {
                _this.saveTransaction(({
                    cryptoTrigram: trigram,
                    walletFrom: wallet.address,
                    walletTo: toAddress,
                    amount: amount,
                    date: Date.now(),
                    label: label,
                    inventory: { uid: article.uid, id: article.ean }
                }));
                loading.dismissAll();
                var toast = _this.toastCtrl.create({
                    message: 'Article paid\nTx: ' + value.tx,
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
        }
        else {
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
                loading.dismissAll();
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
        }
    };
    TransactionService.prototype.payService = function (trigram, wallet, toAddress, amount, password, label, service, serviceOrdered) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait while validating your transaction'
        });
        loading.present();
        if (trigram.toUpperCase() == "ETH") {
            this.transactionWeb3Service.buyItem(wallet.address, toAddress, serviceOrdered.$key, "service", service.address, service.taked_picture.split('/ipfs/')[1], label, amount)
                .subscribe(function (value) {
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
                loading.dismissAll();
                var toast = _this.toastCtrl.create({
                    message: 'Service paid\nTx: ' + value.tx,
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
        }
        else {
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
                loading.dismissAll();
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
        }
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
        return this.apiHttp.get(this.walletCaract[trigram.toLowerCase()].url + "/addrs/" + address, {}).map(function (response) { return response.json().txrefs; });
    };
    return TransactionService;
}());
TransactionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1__api__["a" /* Api */],
        __WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_5__article_service__["a" /* ArticleService */],
        __WEBPACK_IMPORTED_MODULE_12__transaction_web3_service__["a" /* TransactionWeb3Service */],
        __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], TransactionService);

//# sourceMappingURL=transaction.service.js.map

/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_imports__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
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

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* unused harmony export environment */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IpfsService; });
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

var ipfsAPI = __webpack_require__(1321);
var environment = {
    production: false,
    Node: "/ec2-35-180-21-176.eu-west-3.compute.amazonaws.com",
    Gateway: "https://ipfs.io/ipfs/"
};
var IpfsService = (function () {
    function IpfsService() {
        this.gateway = environment.Gateway;
        this.ipfsApi = ipfsAPI(environment.Node);
    }
    IpfsService.prototype.addData = function (data) {
        var ipfsId;
        var buffer = new Buffer(data);
        return this.ipfsApi.add(buffer)
            .then(function (response) {
            console.log(response);
            ipfsId = response[0].hash;
            console.log(ipfsId);
            return ipfsId;
        }).catch(function (err) {
            console.error(err);
        });
    };
    IpfsService.prototype.addFile = function (file, platformCordova) {
        if (platformCordova) {
            return new Promise(function (resolve, reject) {
                window.resolveLocalFileSystemURL(file, function (fileEntry) {
                    fileEntry.file(function (resFile) {
                        var reader = new FileReader();
                        reader.onloadend = function (evt) {
                            // var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
                            // imgBlob.name = 'sample.jpg';
                            // resolve(imgBlob);
                            resolve(reader);
                        };
                        reader.onerror = function (e) {
                            reject(e);
                        };
                        reader.readAsArrayBuffer(resFile);
                    });
                });
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                var reader = new window.FileReader();
                reader.onloadend = function () { return resolve(reader); };
                reader.readAsArrayBuffer(file);
            });
        }
    };
    IpfsService.prototype.saveToIpfs = function (reader) {
        var ipfsId;
        var buffer = new Buffer(reader.result);
        return this.ipfsApi.add(buffer)
            .then(function (response) {
            console.log(response);
            ipfsId = response[0].hash;
            console.log(ipfsId);
            return ipfsId;
        }).catch(function (err) {
            console.error(err);
        });
    };
    IpfsService.prototype.dataURLtoFile = function (dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    IpfsService.prototype.uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return IpfsService;
}());
IpfsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], IpfsService);

//# sourceMappingURL=ipfs.service.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(2).Buffer))

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(102);
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

/***/ 694:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_21" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_module__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(1639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_imports__ = __webpack_require__(403);
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
                    { loadChildren: '../pages/home/homeMarket/homeMarket.module#HomeMarketPageModule', name: 'HomeMarketPage', segment: 'homeMarket', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/homeService/homeService.module#HomeServicePageModule', name: 'HomeServicePage', segment: 'homeService', priority: 'low', defaultHistory: [] },
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

/***/ 700:
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

/***/ 716:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrudStorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(120);
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

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(65);
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

/***/ })

},[694]);
//# sourceMappingURL=main.js.map