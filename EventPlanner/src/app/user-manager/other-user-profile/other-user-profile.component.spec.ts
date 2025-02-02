import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserProfileComponent } from './other-user-profile.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { UserManagerModule } from '../user-manager.module';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('OtherUserProfileComponent', () => {
  let component: OtherUserProfileComponent;
  let fixture: ComponentFixture<OtherUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  RouterModule.forRoot([]),
                  MaterialModule,
                  UserManagerModule
                ],
      declarations: [],
      providers: [
                    UserService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
