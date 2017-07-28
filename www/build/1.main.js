webpackJsonp([1],{

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__camera__ = __webpack_require__(280);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraPageModule", function() { return CameraPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CameraPageModule = (function () {
    function CameraPageModule() {
    }
    return CameraPageModule;
}());
CameraPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__camera__["a" /* CameraPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__camera__["a" /* CameraPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__camera__["a" /* CameraPage */]
        ]
    })
], CameraPageModule);

//# sourceMappingURL=camera.module.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CameraPage = (function () {
    function CameraPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // this.options = {
        //   quality: 100,
        //   destinationType: this.camera.DestinationType.DATA_URL,
        //   encodingType: this.camera.EncodingType.JPEG,
        //   mediaType: this.camera.MediaType.PICTURE
        // }
    }
    CameraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CameraPage');
    };
    CameraPage.prototype.makePhoto = function () {
        // this.camera.getPicture(this.options).then((imageData) => {
        //   this.base64Image = 'data:image/jpeg;base64,' + imageData;
        // }, (err) => {
        // });
    };
    return CameraPage;
}());
CameraPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-camera',template:/*ion-inline-start:"C:\dev\Tcc\tcc_hibrido\src\pages\camera\camera.html"*/'\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Camera</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <image [src]="base64Image" style="width: 50%;height: 50%"></image>\n</ion-content>\n'/*ion-inline-end:"C:\dev\Tcc\tcc_hibrido\src\pages\camera\camera.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], CameraPage);

//# sourceMappingURL=camera.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map