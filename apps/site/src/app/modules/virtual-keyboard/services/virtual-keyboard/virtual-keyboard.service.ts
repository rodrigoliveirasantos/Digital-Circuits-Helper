import { computed, Injectable, signal, TemplateRef } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class VirtualKeyboardService { 
  /* 
  * Usado apenas para impedir que sejam registrados dois 
  * teclados com o nome igual. 
  */
  readonly registeredKeyboards = new Map<string, TemplateRef<unknown>>();

  private _selectedKeyboard = signal<string>('');

  selectedKeyboard = this._selectedKeyboard.asReadonly();
  selectedKeyboardTemplate = computed(() => {
    return this.registeredKeyboards.get(this._selectedKeyboard())
  })

  register(name: string, templateRef: TemplateRef<unknown>) {
    if (this.registeredKeyboards.has(name)) {
      throw new Error(`Teclado com o nome "${name}" já existe.`);
    }

    this.registeredKeyboards.set(name, templateRef);
  }

  unregister(name: string) {
    if (this.selectedKeyboard() === name) {
      this.closeKeyboard();
    }

    this.registeredKeyboards.delete(name);
  }

  setKeyboard(name: string) {
    if (this._selectedKeyboard() === name) {
      return;
    }
    
    this._selectedKeyboard.set(name);
  }
  
  closeKeyboard() {
    this.setKeyboard('');
  }
}
