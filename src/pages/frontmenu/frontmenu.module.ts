import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontmenuPage } from './frontmenu';

@NgModule({
  declarations: [
    FrontmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontmenuPage),
  ],
})
export class FrontmenuPageModule {}
