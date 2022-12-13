import { Directive, HostListener, Input } from '@angular/core';
import { HoverCenter, HoverDefaultKey } from './hover-center';

@Directive({
  selector: '[h2-hover]'
})
export class HoverDirective {

  @Input() hoverKey = HoverDefaultKey

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor() { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  @HostListener('mouseenter', ['$event'])
  async onMouseenter($event){
    HoverCenter.moveEnter(this.hoverKey)
  }

  @HostListener('mouseleave', ['$event'])
  async onMouseleave($event){
    HoverCenter.moveLeave(this.hoverKey)
  }
}
