import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStore } from './favorite.store';

describe('FavoriteStore', () => {
  let component: FavoriteStore;
  let fixture: ComponentFixture<FavoriteStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteStore],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
