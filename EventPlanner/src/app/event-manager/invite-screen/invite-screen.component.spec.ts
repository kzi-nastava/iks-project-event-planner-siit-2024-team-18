import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteScreenComponent } from './invite-screen.component';
import { EmailService } from '../../services/email.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';

describe('InviteScreenComponent', () => {
  let component: InviteScreenComponent;
  let fixture: ComponentFixture<InviteScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule
                ],
      declarations: [InviteScreenComponent],
      providers: [
                          EmailService,
                          provideHttpClient(),
                          provideHttpClientTesting(),
                        ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
