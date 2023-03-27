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
import { DragContainerComponent } from './component/drag-container/drag-container.component';
import { YcAngulerShareMaterialModule } from '../yc-anguler-share-material/yc-anguler-share-material.module';
import { ScrollListComponent } from './component/scroll-list/scroll-list.component';
import { HoverDirective } from './directive/hover/hover.directive';
import { AsyncClickDirective } from './directive/async-click/async-click.directive';
import { FloatingActionMenuCustomComponent } from './component/floating-action-menu-custom/floating-action-menu-custom.component';

let component = [
  BannerComponent,
  MarqueeComponent,
  AlertComponent,
  FloatingActionMenuComponent,
  FloatingActionMenuCustomComponent,
  DragContainerComponent,
  ScrollListComponent,
]

let directive = [
  HoverDirective,
  AsyncClickDirective,
]

let pipe = [
  PointFmtPipe,
]

let allDeclaration = [...component, ...directive, ...pipe]

@NgModule({
  declarations: allDeclaration,
  imports: [
    CommonModule,
    HttpClientModule,
    YcAngulerShareMaterialModule,
  ],
  providers: [
    StorageService,
    ApiService,
    MessageBoxService,
  ],
  exports: allDeclaration,
})
export class AngulerHydrogenModule { }
