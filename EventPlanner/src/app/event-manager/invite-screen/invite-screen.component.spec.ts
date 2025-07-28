import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InviteScreenComponent } from './invite-screen.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockEmailService {
    sendEventInvitations() {
        return of(null);
    }
}

describe('InviteScreenComponent', () => {
    let component: InviteScreenComponent;
    let fixture: ComponentFixture<InviteScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
            ],
            declarations: [InviteScreenComponent],
            providers: [
                { provide: EmailService, useClass: MockEmailService },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { paramMap: { get: () => '1' } } },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InviteScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
