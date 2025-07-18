import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditActivityComponent } from './edit-activity.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditActivityComponent', () => {
    let component: EditActivityComponent;
    let fixture: ComponentFixture<EditActivityComponent>;

    const mockActivity = {
        id: 1,
        name: 'Test Activity',
        description: 'Test description',
        location: 'Test location',
        startDate: new Date('2025-07-14T09:00:00'),
        endDate: new Date('2025-07-14T17:00:00'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MaterialModule,
                BrowserAnimationsModule,
            ],
            declarations: [EditActivityComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { activity: mockActivity },
                },
                {
                    provide: MatDialogRef,
                    useValue: { close: jasmine.createSpy('close') },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditActivityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
