import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperatorsKeyboardComponent } from './operators-keyboard.component';

describe('OperatorsKeyboardComponent', () => {
  let component: OperatorsKeyboardComponent;
  let fixture: ComponentFixture<OperatorsKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorsKeyboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorsKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
