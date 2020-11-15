import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalNotesModifyComponent } from './clinical-notes-modify.component';

describe('ClinicalNotesModifyComponent', () => {
  let component: ClinicalNotesModifyComponent;
  let fixture: ComponentFixture<ClinicalNotesModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalNotesModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalNotesModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
