import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[inputRef]',
    standalone: true
})
export class InputRefDirective {
  // constructor(private elementRef: ElementRef) {}
  focus = false;

  @HostListener('focus')
  onFocus() {
    // this.elementRef.nativeElement.classList.add('focused');
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    // this.elementRef.nativeElement.classList.remove('focused');
    this.focus = false;
  }
}