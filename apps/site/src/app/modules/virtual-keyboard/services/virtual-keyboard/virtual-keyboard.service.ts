import { computed, Injectable, signal, TemplateRef } from "@angular/core";
import { Subject } from "rxjs";


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
  private _keyPressed$ = new Subject<string>();

  selectedKeyboard = this._selectedKeyboard.asReadonly();
  selectedKeyboardTemplate = computed(() => {
    return this.registeredKeyboards.get(this._selectedKeyboard())
  });
  
  keyPressed$ = this._keyPressed$.asObservable();

  register(name: string, templateRef: TemplateRef<unknown>) {
    if (this.registeredKeyboards.has(name)) {
      throw new Error(`Teclado com o nome "${name}" já existe.`);
    }

    this.registeredKeyboards.set(name, templateRef);
  }

  setKeyboard(name: string) {
    if (this._selectedKeyboard() === name) {
      return;
    }
    
    this._selectedKeyboard.set(name);
  }
  
  pressKey(key: string) {
    this._keyPressed$.next(key);
  }

  unregister(name: string) {
    if (this.selectedKeyboard() === name) {
      this.closeKeyboard();
    }

    this.registeredKeyboards.delete(name);
  }

  closeKeyboard() {
    this.setKeyboard('');
  }
}
