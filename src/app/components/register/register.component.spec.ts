import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const mockedRegistration: any = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    uname: new UntypedFormControl('m'),
    lcname: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [RegisterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain a username', () => {
    expect(mockedRegistration).toBeTruthy();
  });


});
