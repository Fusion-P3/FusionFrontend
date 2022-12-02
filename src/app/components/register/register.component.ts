import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    uname: new UntypedFormControl(''),
    lcname: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // Should not be empty lol
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('uname')?.value, this.registerForm.get('lcname')?.value, this.registerForm.get('password')?.value).subscribe({
      next: () => console.log("New user registered"),
      error: (err) => console.log(err),
      complete: () => this.router.navigate(['login'])
    });
  }

}
