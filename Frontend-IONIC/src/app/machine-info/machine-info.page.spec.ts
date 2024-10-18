import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MachineInfoPage } from './machine-info.page';

describe('MachineInfoPage', () => {
  let component: MachineInfoPage;
  let fixture: ComponentFixture<MachineInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
