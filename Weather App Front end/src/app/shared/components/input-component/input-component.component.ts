import { Component, ContentChild, HostBinding } from '@angular/core';
import { InputRefDirective } from 'src/app/directives/input-ref.directive';

@Component({
    selector: 'app-input-component',
    templateUrl: './input-component.component.html',
    styleUrls: ['./input-component.component.css'],
    standalone: true
})
export class InputComponentComponent {
  @ContentChild(InputRefDirective)
  input!: InputRefDirective;

  @HostBinding("class.focus")
  get focus() {
    return this.input ? this.input.focus : false;
  }
}