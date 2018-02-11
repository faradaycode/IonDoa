import { Component } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { AppRate } from '@ionic-native/app-rate';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];

  constructor(public navCtrl: NavController, private file: File,
    private photoViewer: PhotoViewer, private platform: Platform,
    private rating: AppRate) {
    this.platform.ready().then(() => {
      //playstore rating
      this.rating.preferences = {
        displayAppName: 'Belajar Tajwid',
        usesUntilPrompt: 2,
        promptAgainForEachNewVersion: false,
        storeAppURL: {
          android: 'market://details?id=com.magentamedia.belajartajwidnew'
        },
        customLocale: {
          title: 'Do you enjoy %@?',
          message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
          cancelButtonLabel: 'No, Thanks',
          laterButtonLabel: 'Remind Me Later',
          rateButtonLabel: 'Rate It Now'
        },
        callbacks: {
          onRateDialogShow: function (callback) {
            console.log('rate dialog shown!');
          },
          onButtonClicked: function (buttonIndex) {
            console.log('Selected index: -> ' + buttonIndex);
          }
        }
      };
      this.rating.promptForRating(false);
    })
  }
  goTo(page, param) {
    this.navCtrl.push(page, { keyword: param })
  }
  getTajwid(param) {
    let par = param.replace(/\s/g, "-");
    const url = "www/assets/media/";
    this.photoViewer.show(this.file.applicationDirectory + url + par + ".png", '', { share: false });
  }
}
