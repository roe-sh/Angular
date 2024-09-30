import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RahafComponent } from './rahaf.component';

describe('RahafComponent', () => {
  let component: RahafComponent;
  let fixture: ComponentFixture<RahafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RahafComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RahafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
