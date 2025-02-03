import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule,
                  BrowserAnimationsModule
                ],
      declarations: [EditProfileComponent],
      providers: [
                    UserService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
