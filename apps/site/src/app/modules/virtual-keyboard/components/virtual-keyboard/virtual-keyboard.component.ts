import { Component, effect, inject, input, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardService } from '../../services/virtual-keyboard/virtual-keyboard.service';
import { animate, style, transition, trigger } from '@angular/animations';


const ANIMATION_TIMING = "250ms cubic-bezier(.39,.33,.15,1.33)";

const ANIMATION_HIDDEN_STYLE = {
  transform: 'translateY(25%)',
  opacity: 0
};

const ANIMATION_SHOW_STYLE = {
  transform: 'translateY(0)',
  opacity: 1
}


@Component({
  selector: 'app-virtual-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-keyboard.component.html',
  styleUrl: './virtual-keyboard.component.scss',
  animations: [
    trigger('enterLeave', [
      transition(
        ':enter', 
        [
          style(ANIMATION_HIDDEN_STYLE),
          animate(ANIMATION_TIMING, style(ANIMATION_SHOW_STYLE))
        ] 
      ),
      transition(
        ":leave",
        [
          style(ANIMATION_SHOW_STYLE),
          animate(ANIMATION_TIMING, style(ANIMATION_HIDDEN_STYLE)),
        ] 
      )
    ])
  ]
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
