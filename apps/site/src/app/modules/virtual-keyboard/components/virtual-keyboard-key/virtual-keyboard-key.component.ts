import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardService } from '../../services/virtual-keyboard/virtual-keyboard.service';

@Component({
  selector: 'app-virtual-keyboard-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-keyboard-key.component.html',
  styleUrl: './virtual-keyboard-key.component.scss',
})
export class VirtualKeyboardKeyComponent {
  private readonly _virtualKeyboardService = inject(VirtualKeyboardService);
  
  value = input.required<string>();

  handleClick() {
    this._virtualKeyboardService.pressKey(this.value());
  }
}
