import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaComponent } from './agenda.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { EventService } from '../../services/event.service';
import { ActivityService } from '../../services/activity.service';

describe('AgendaComponent', () => {
    let component: AgendaComponent;
    let fixture: ComponentFixture<AgendaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                ReactiveFormsModule,
                MatSnackBarModule,
                MaterialModule,
                BrowserAnimationsModule,
            ],
            declarations: [AgendaComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: { params: of({ id: 1 }) },
                },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AgendaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
