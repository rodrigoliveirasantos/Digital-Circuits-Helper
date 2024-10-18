import { Component, computed, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { VirtualKeyboardService } from '../../services/virtual-keyboard/virtual-keyboard.service';

@Component({
  selector: 'app-virtual-keyboard-outlet',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './virtual-keyboard-outlet.component.html',
  styleUrl: './virtual-keyboard-outlet.component.scss',
})
export class VirtualKeyboardOutletComponent {
  private readonly _virtualKeyboardService = inject(VirtualKeyboardService);
  private readonly _viewRef = inject(ViewContainerRef);

  portal = computed(() => {
    const keyboardTemplate = this._virtualKeyboardService.selectedKeyboardTemplate();
    
    if (!keyboardTemplate) {
      return;
    }

    return new TemplatePortal(keyboardTemplate, this._viewRef);
  });
}

