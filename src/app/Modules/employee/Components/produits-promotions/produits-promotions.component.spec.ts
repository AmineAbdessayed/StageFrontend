import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsPromotionsComponent } from './produits-promotions.component';

describe('ProduitsPromotionsComponent', () => {
  let component: ProduitsPromotionsComponent;
  let fixture: ComponentFixture<ProduitsPromotionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitsPromotionsComponent]
    });
    fixture = TestBed.createComponent(ProduitsPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
