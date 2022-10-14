import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { StorageService } from './service/storage/storage.service';
import { ApiService } from './service/api/api.service';
import { BannerComponent } from './component/banner/banner.component';
import { MarqueeComponent } from './component/marquee/marquee.component';
import { PointFmtPipe } from './pipe/PointFmt/point-fmt.pipe';


@NgModule({
  declarations: [
    BannerComponent,
    MarqueeComponent,
    PointFmtPipe,
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
    PointFmtPipe,
  ]
})
export class YcAngulerShareModule { }
