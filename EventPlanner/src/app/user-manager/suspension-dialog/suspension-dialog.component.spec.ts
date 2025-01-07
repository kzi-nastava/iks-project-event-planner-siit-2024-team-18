import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionDialogComponent } from './suspension-dialog.component';

describe('SuspensionDialogComponent', () => {
  let component: SuspensionDialogComponent;
  let fixture: ComponentFixture<SuspensionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspensionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspensionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
