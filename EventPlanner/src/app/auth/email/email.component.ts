import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, Validators} from '@angular/forms';
import {merge} from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Please enter e-mail address.');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('E-mail address is invalid.');
    } else {
      this.errorMessage.set('');
    }
  }

  validateOnSubmit() {
    this.email.markAsTouched();
    this.email.markAsDirty();
    this.updateErrorMessage();
  }
}
