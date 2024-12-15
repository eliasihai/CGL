import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CountiesService } from '../../services/countries/counties.service';
import { Country } from '../../services/countries/countries';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({});
  public countries: Observable<Country[]>;
  public displayPopUp: boolean = false;
  constructor(
    private fb: FormBuilder,
    private countiesService: CountiesService,
    private userService: UserService
  ) {
    this.countries = this.countiesService.getCountries();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[+]?[-0-9]{8,}$')],
      ],
      prefix: ['+972', Validators.required],
    });
  }
  get nameControl() {
    return this.userForm?.get('name');
  }
  get emailControl() {
    return this.userForm?.get('email');
  }
  get countryControl() {
    return this.userForm?.get('country');
  }
  get phoneControl() {
    return this.userForm?.get('phone');
  }
  get phonePrefix() {
    return this.userForm?.get('prefix');
  }

  changeCountry(event: Event) {}
  changePrefix(event: Event) {}

  showSuccessPopup(): void {
    this.displayPopUp = true;
  }
  dismissPopup(): void {
    this.displayPopUp = false;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formUser = this.userForm.value;
      this.userService.createNewUser(formUser).subscribe({
        next: (value) => {
          console.log('Value:', value);
          this.showSuccessPopup();
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Complete');
        },
      });
      this.userForm.reset({
        email: '',
        phone: '',
        firstname: '',
        country: '',
        prefix: '+972',
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
