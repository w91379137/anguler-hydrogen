import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { StorageService } from './service/storage/storage.service';
import { ApiService } from './service/api/api.service';
import { BannerComponent } from './component/banner/banner.component';
import { MarqueeComponent } from './component/marquee/marquee.component';
import { PointFmtPipe } from './pipe/PointFmt/point-fmt.pipe';
import { AlertComponent } from './component/alert/alert.component';
import { MessageBoxService } from './service/message-box/message-box.service';
import { FloatingActionMenuComponent } from './component/floating-action-menu/floating-action-menu.component';


@NgModule({
  declarations: [
    BannerComponent,
    MarqueeComponent,
    PointFmtPipe,
    AlertComponent,
    FloatingActionMenuComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    StorageService,
    ApiService,
    MessageBoxService,
  ],
  exports: [
    BannerComponent,
    MarqueeComponent,
    PointFmtPipe,
    FloatingActionMenuComponent,
  ]
})
export class AngulerHydrogenModule { }
