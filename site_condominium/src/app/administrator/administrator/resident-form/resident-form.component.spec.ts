import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFormComponent } from './resident-form.component';

describe('ResidentFormComponent', () => {
  let component: ResidentFormComponent;
  let fixture: ComponentFixture<ResidentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
