import { Component, Input } from '@angular/core';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
    selector: '.app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.css'],
    standalone: true,
    imports: [NgIf, TitleCasePipe]
})
export class AccordionComponent {
  @Input() title!: string;
  @Input() hasFooter = false;
}
