import { ElementRef, Renderer2 } from "@angular/core";

export function changeDisabled(
  render: Renderer2,
  elementRef: ElementRef,
  isDisabled: boolean,
) {
  if (isDisabled) {
    render.setAttribute(
      elementRef.nativeElement,
      'disabled',
      'true'
    )
  }
  else {
    render.removeAttribute(
      elementRef.nativeElement,
      'disabled'
    )
  }
}
