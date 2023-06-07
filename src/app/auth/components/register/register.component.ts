import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {select, Store} from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import {Observable, of} from 'rxjs';
import {isSubmittingSelector} from "../../store/selectors";

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isSubmitting$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }


  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.store.dispatch(registerAction(this.form.value));
  }

  private initializeValues():void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    console.log('isSubmitting$', this.isSubmitting$)
  }
}
