import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators} from '@angular/forms';
import {merge} from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  readonly password = new FormControl('', [Validators.required]);

  errorMessage = signal('');

  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorMessage.set('Please enter password.');
    } else {
      this.errorMessage.set('');
    }
  }

  validateOnSubmit() {
    this.password.markAsTouched();
    this.password.markAsDirty();
    this.updateErrorMessage();
  }
}
