import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentDataComponent } from './resident-data.component';

describe('ResidentDataComponent', () => {
  let component: ResidentDataComponent;
  let fixture: ComponentFixture<ResidentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
