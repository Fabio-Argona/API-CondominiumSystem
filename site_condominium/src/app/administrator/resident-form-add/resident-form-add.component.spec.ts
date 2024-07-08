import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFormAddComponent } from './resident-form-add.component';

describe('ResidentFormAddComponent', () => {
  let component: ResidentFormAddComponent;
  let fixture: ComponentFixture<ResidentFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentFormAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
