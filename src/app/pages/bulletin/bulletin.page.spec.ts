import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulletinPage } from './bulletin.page';

describe('BulletinPage', () => {
  let component: BulletinPage;
  let fixture: ComponentFixture<BulletinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
