import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";
import { VirtualKeyboardComponent } from "../../components/virtual-keyboard/virtual-keyboard.component";
import { FormControlDirective, FormControlName } from "@angular/forms";
import { VirtualKeyboardService } from "../../services/virtual-keyboard/virtual-keyboard.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter } from "rxjs";

@Directive({
  standalone: true,
  selector: "input[appVirtualKeyboard], textarea[appVirtualKeyboard]" 
})
export class VirtualKeyboardDirective {
  elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly _virtualKeyboardService = inject(VirtualKeyboardService);
  ngControl = this._injectNgControl();

  name = input.required({
    alias: 'appVirtualKeyboard',
    transform: (keyboardName: string|VirtualKeyboardComponent) => {
      return (keyboardName instanceof VirtualKeyboardComponent)
        ? keyboardName.name() 
        : keyboardName;
    }
  });

  keyPressed$ = this._virtualKeyboardService.keyPressed$.pipe(
    filter(() => { 
      return this.isKeyboardActive()
    }),
    takeUntilDestroyed()
  );

  get input() {
    return this.elementRef.nativeElement;
  }

  get formControl() {
    return this.ngControl?.control;
  } 
  
  constructor() {
    this.keyPressed$.subscribe((value) => {
      this.appendValue(value);
      this.input.focus();
    })
  }

  setValue(value: string) {
    this.input.value = value;
    this.input.dispatchEvent(new InputEvent('change', { 
      inputType: this.input.type 
    }));
    this.formControl?.setValue(value);
  }

  getValue() {
    return this.input.value;
  }

  appendValue(value: string) {
    this.setValue(this.getValue() + value);
  }

  isKeyboardActive() {
    return this._virtualKeyboardService.selectedKeyboard() === this.name();
  }

  isInVirtualKeyboard(target: Element) {
    const keyboardKeyTagName = 'APP-VIRTUAL-KEYBOARD-KEY';
    let parent = target.parentElement;
    while (parent) {
      if (parent.tagName === keyboardKeyTagName) {
        return true;
      }

      parent = parent.parentElement;
    }

    return false;
  }

  @HostListener('focus')
  handleFocus() {
    this._virtualKeyboardService.setKeyboard(this.name());
  }
  
  @HostListener('document:focusout', [ '$event' ])
  handleBlur(event: FocusEvent) {
    if (
      this.isKeyboardActive() && 
      !(event.relatedTarget && this.isInVirtualKeyboard(event.relatedTarget as Element))
    ) {
      this._virtualKeyboardService.closeKeyboard();
    }
  }

  private _injectNgControl() {
    return (
      inject(FormControlName, { optional: true }) ??
      inject(FormControlDirective, { optional: true })
    )
  }
}
