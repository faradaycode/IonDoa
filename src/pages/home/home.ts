import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];

  constructor(public navCtrl: NavController, private file: File,
    private photoViewer: PhotoViewer) { }
  goTo(page, param) {
    this.navCtrl.push(page, { keyword: param })
  }
  getTajwid(param) {
    let par = param.replace(/\s/g, "-");
    const url = "www/assets/media/";
    this.photoViewer.show(this.file.applicationDirectory + url + par + ".png", '', { share: false });
  }
}
