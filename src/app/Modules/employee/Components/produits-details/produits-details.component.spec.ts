import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsDetailsComponent } from './produits-details.component';

describe('ProduitsDetailsComponent', () => {
  let component: ProduitsDetailsComponent;
  let fixture: ComponentFixture<ProduitsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitsDetailsComponent]
    });
    fixture = TestBed.createComponent(ProduitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
