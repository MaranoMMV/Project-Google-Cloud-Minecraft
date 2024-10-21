import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogadoresFormComponent } from './jogadores-form.component';

describe('JogadoresFormComponent', () => {
  let component: JogadoresFormComponent;
  let fixture: ComponentFixture<JogadoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JogadoresFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JogadoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
