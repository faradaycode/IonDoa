import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { TajwidProvider } from '../../providers/tajwid/tajwid';
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
    public datas: any = [];
    public childm = [];
    child: boolean = false;
    title_bar;
    
    constructor(public navCtrl: NavController, public navParams: NavParams,
        app: App, platform: Platform, private serv: TajwidProvider) {
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
        this.serv.jsonCall('content.json').subscribe(data => {
            this.datas = data[keyword];
        });

        //backbutton handler
        platform.ready().then(() => {
            platform.registerBackButtonAction(() => {
                let nav = app.getActiveNavs()[0];
                let activeView = nav.getActive();
                if (activeView.name === "HomePage") {
                    platform.exitApp();
                }
                if (activeView.name === "PagelistPage") {
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
        for (let child in this.datas) {
            this.childm = this.datas[child]['childmenu'];
        }
        this.child = true;
    }
    //view with zoom 
    getDescript(param) {
        let par = param.replace(/\s/g,"-");
        this.navCtrl.push('DescriptionPage', {keyword: par});
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad PagelistPage');
    }
}
