import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login:['',Validators.required],
      password:['', Validators.required]
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.Message);
          this.loginForm.reset();
          if(res.role){
            this.router.navigate(['admin-menu']);
          }
          else{
            this.router.navigate(['user-menu']);
          }
        },
        error:(err)=>{
          console.log(err)
          alert(err.error.Message)
        }
      })
      
    }
    else{
      
    }
  }
}
