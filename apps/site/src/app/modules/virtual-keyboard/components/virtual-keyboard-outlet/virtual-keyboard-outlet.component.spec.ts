import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualKeyboardOutletComponent } from './virtual-keyboard-outlet.component';

describe('VirtualKeyboardOutletComponent', () => {
  let component: VirtualKeyboardOutletComponent;
  let fixture: ComponentFixture<VirtualKeyboardOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualKeyboardOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualKeyboardOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
