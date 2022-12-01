import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/userDTO';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let user: UserDTO = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log(response);

        this.authService.loggedIn = true;
        this.authService.getUserId(user.username).subscribe({
          next: (res) => {
            this.authService.userId = res.substring(1, res.length - 1);
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.router.navigate(['home']);
      },
    });
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
