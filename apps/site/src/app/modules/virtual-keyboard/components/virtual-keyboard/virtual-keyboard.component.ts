import { Component, effect, inject, input, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardService } from '../../services/virtual-keyboard/virtual-keyboard.service';


@Component({
  selector: 'app-virtual-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-keyboard.component.html',
  styleUrl: './virtual-keyboard.component.scss',
})
export class VirtualKeyboardComponent {
  private readonly _virtualKeyboardService = inject(VirtualKeyboardService);
  private readonly _templateRef = viewChild.required<TemplateRef<void>>('template');

  name = input.required<string>();

  constructor() {
    /* Registra keyboard */
    effect((onCleanup) => {
      this._virtualKeyboardService.register(this.name(), this._templateRef());

      onCleanup(() => {
        this._virtualKeyboardService.unregister(this.name());
      })
    });
  }
  
}
