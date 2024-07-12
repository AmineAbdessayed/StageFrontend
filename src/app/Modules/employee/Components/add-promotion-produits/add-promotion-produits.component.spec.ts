import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionProduitsComponent } from './add-promotion-produits.component';

describe('AddPromotionProduitsComponent', () => {
  let component: AddPromotionProduitsComponent;
  let fixture: ComponentFixture<AddPromotionProduitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPromotionProduitsComponent]
    });
    fixture = TestBed.createComponent(AddPromotionProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
