import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]',
  standalone: true,
})
export class BackgroundColorDirective implements OnInit {
  @Input('appBackgroundColor') temp: number = 0;
  constructor(private _ElementRef: ElementRef) {}

  ngOnInit(): void {
    this.setBackground();
  }

  @Input('boxShadow') boxShadow: boolean = false;

  private setBackground() {
    if (this.temp < 10) {
      this._ElementRef.nativeElement.classList.add('text-blue-500');

      if (this.boxShadow) {
        this._ElementRef.nativeElement.style.boxShadow = `0 0 10px 0 rgba(0, 0, 255, 0.5)`;
      }
    } else if (this.temp > 10 && this.temp <= 25) {
      this._ElementRef.nativeElement.classList.add('text-green-500');

      if (this.boxShadow) {
        this._ElementRef.nativeElement.style.boxShadow = `0 0 10px 0 rgba(0, 255, 0, 0.5)`;
      }
    } else {
      this._ElementRef.nativeElement.classList.add('text-red-500');

      if (this.boxShadow) {
        this._ElementRef.nativeElement.style.boxShadow = `0 0 10px 0 rgba(255, 0, 0, 0.5)`;
      }
    }
  }
}
