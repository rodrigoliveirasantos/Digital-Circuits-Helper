import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";
import { VirtualKeyboardComponent } from "../../components/virtual-keyboard/virtual-keyboard.component";
import { FormControlDirective, FormControlName } from "@angular/forms";
import { VirtualKeyboardService } from "../../services/virtual-keyboard/virtual-keyboard.service";

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

  get input() {
    return this.elementRef.nativeElement;
  }

  get formControl() {
    return this.ngControl?.control;
  } 
  
  setValue(value: string) {
    this.input.value = value;
    this.input.dispatchEvent(new InputEvent('change', { 
      inputType: this.input.type 
    }));
    this.formControl?.setValue(value);
  }

  @HostListener('focus')
  handleFocus() {
    this._virtualKeyboardService.setKeyboard(this.name());
  }

  @HostListener('blur')
  handleBlur() {
    this._virtualKeyboardService.closeKeyboard();
  }

  private _injectNgControl() {
    return (
      inject(FormControlName, { optional: true }) ??
      inject(FormControlDirective, { optional: true })
    )
  }
}
