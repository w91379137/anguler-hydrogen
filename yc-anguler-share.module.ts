import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { StorageService } from './service/storage/storage.service';
import { ApiService } from './service/api/api.service';
import { BannerComponent } from './component/banner/banner.component';
import { MarqueeComponent } from './component/marquee/marquee.component';


@NgModule({
  declarations: [
    BannerComponent,
    MarqueeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    StorageService,
    ApiService,
  ],
  exports: [
    BannerComponent,
    MarqueeComponent,
  ]
})
export class YcAngulerShareModule { }
