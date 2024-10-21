import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from '../../../virtual-keyboard/components/virtual-keyboard/virtual-keyboard.component';
import { VirtualKeyboardKeyComponent } from '../../../virtual-keyboard/components/virtual-keyboard-key/virtual-keyboard-key.component';

@Component({
  selector: 'app-operators-keyboard',
  standalone: true,
  imports: [CommonModule, VirtualKeyboardComponent, VirtualKeyboardKeyComponent],
  templateUrl: './operators-keyboard.component.html',
  styleUrl: './operators-keyboard.component.scss',
})
export class OperatorsKeyboardComponent {
  /*
  * Cada tupla é uma tecla do teclado, sendo o primeiro item
  * o valor que será digitado no input e o segundo item é o que 
  * será exibido na tecla. Caso os itens sejam iguais, será 
  * exibido apenas uma vez na tecla.
  */
  readonly keys: [string, string][] = [
    ['(',   '('],
    ['~',  'NOT'],
    ['.',  'AND'],
    ['+',  'OR'],
    ['^',  'XOR'],
    ['==', 'NXOR'],
    [')',   ')'],
  ]
}
