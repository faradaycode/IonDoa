import { File } from '@ionic-native/file';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TajwidProvider } from '../../providers/tajwid/tajwid';

/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  tajpage: String = "";
  datas: any = []; //for string
  imgs: any = []; //for image string url
  dirName: string;
  apptitle: string;
  playCount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HttpClient, private file: File, private serv: TajwidProvider) {
    this.tajpage = 'describe'; //initiate first segment as describe
    let keyword = navParams.get('keyword');
    this.apptitle = keyword.replace(/-/g, " ");
    //get json data
    this.http.get('assets/deskripsi.json').subscribe(data => {
      this.datas = data[keyword];
      //console.log(data[keyword][0].contoh);
      this.getImgDir(keyword);
    });
  }

  getImgDir(dirname) {
    this.dirName = dirname;
    let fileUrl = "www/assets/media/" + dirname;

    this.file.listDir(this.file.applicationDirectory, fileUrl).then(
      data => {
        this.imgs = data;
      }
    ).catch(err => this.serv.onToast(JSON.stringify(err)));
  }

  playSound(filename) {
    this.playCount++;
    let dire = this.file.applicationDirectory + 'www/assets/audio/' + this.dirName + '/';
    this.file.checkFile(dire, filename + '.ogg').then(
      _ => {
        this.serv.playSound('contoh', "assets/audio/" + this.dirName + '/' + filename + '.ogg');
      }).catch(err => this.serv.onToast(JSON.stringify(err)));
      if(this.playCount > 1) {
        this.playCount = 0;
        this.serv.stopIt('contoh');
      }
  }
}