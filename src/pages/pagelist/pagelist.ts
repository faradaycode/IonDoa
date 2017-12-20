import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the PagelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagelist',
  templateUrl: 'pagelist.html',
})
export class PagelistPage {
  private datas = [];
  private childm = [];
  private child: boolean = false;
  private title_bar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private http: HttpClient, app: App, platform: Platform, private photoViewer: PhotoViewer,
             private file: File) {
    let keyword = navParams.get('keyword');
    this.title_bar = keyword;
      if (this.title_bar === 'aliflam') {
          this.title_bar = "Alif Lam";
      } else if (keyword === 'mimsukun') {
          this.title_bar = 'mim sukun';
      } else if (keyword === 'tanwin') {
          this.title_bar = "nun mati & tanwin";
      }
      //get json data
    this.http.get('assets/content.json').subscribe(data=>{
      this.datas = data[keyword];
    });

      //backbutton handler
      platform.ready().then(()=>{
         platform.registerBackButtonAction(()=>{
          let nav = app.getActiveNavs()[0];
          let activeView = nav.getActive();
          if(activeView.name === "HomePage") {
              platform.exitApp();
          }
          if(activeView.name === "PagelistPage") {
             if (this.child) {
                 this.child = false;
             } else {
                 nav.pop();
             }
          } else {
              nav.pop();
          }
      }); 
      });
  }
//child array method
  getChild() {
      for(let child in this.datas) {
          this.childm = this.datas[child]['childmenu'];
      }
      this.child = true;
  }
//view with zoom 
getTajwid(param) {
    let par = param.replace(/\s/g,"-");
    const url = "www/assets/media/";
    this.photoViewer.show(this.file.applicationDirectory + url + par + ".png",'', {share: false});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PagelistPage');
  }
}
