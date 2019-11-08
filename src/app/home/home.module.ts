import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { QrcodeComponent } from '../components/qrcode/qrcode.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { EssenceNg2PrintModule } from 'essence-ng2-print';


@NgModule({
  imports: [
    EssenceNg2PrintModule,
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,QrcodeComponent],
  providers:[BarcodeScanner]
})
export class HomePageModule {}
