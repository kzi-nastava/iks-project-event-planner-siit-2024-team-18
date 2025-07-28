import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockUser$: BehaviorSubject<string>;

  beforeEach(() => {
    mockUser$ = new BehaviorSubject<string>('ADMIN');

    authServiceSpy = jasmine.createSpyObj('AuthService', ['user$', 'getRole']);
    authServiceSpy.user$ = mockUser$;
    authServiceSpy.getRole.and.returnValue('ADMIN');

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user has correct role', () => {
    expect(guard.canActivate({ data: { role: ['ADMIN'] } } as any)).toBeTrue();
  });

  it('should navigate to home if user has incorrect role', () => {
    mockUser$.next('user');
    expect(guard.canActivate({ data: { role: ['ADMIN'] } } as any)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
});
