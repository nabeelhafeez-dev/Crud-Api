import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
import * as CryptoJS from 'crypto-js';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  listdata: Employee[];
  submitted: boolean;
  employee: Employee[] = [];
  index: any;
  encryptMode: boolean;
  encryptText: string;
  encryptSecretKey = "1mySecretKeyHere";

  constructor(private fb: FormBuilder, public service: EmployeeService) {
    this.encryptMode = true;

  }


  get f() {
    return this.employeeForm.controls;
  }


  addEmployee() {
    debugger
    if (this.employeeForm.invalid) {
      return;
    }
    let userInfo = this.employeeForm.value

    let encrypted = this.encryptData(JSON.stringify({
      name: userInfo.Name,
      contact: userInfo.Contact,
      email: userInfo.Email,
      doj: userInfo.DOJ,
      city: userInfo.City,
      gender: userInfo.Gender,
    }))

    this.service.postEmployee(encrypted, (value) => {
      this.employeeForm.reset()
      let obj = {
        id: value.id,
        Name: value.name,
        Contact: value.contact,
        Email: value.email,
        DOJ: value.doj,
        City: value.city,
        Gender: value.gender,
      }
      this.listdata.push(obj)

    });

  }
  encryptData(userInfo) {
    debugger
    var key = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
    var encryptedData = CryptoJS.AES.encrypt(userInfo, key,
    {
        keySize: 128 / 8,
        // iv: iv,
        mode: CryptoJS.mode.ECB,
        // padding: CryptoJS.pad.Pkcs7
    }).toString();
    return encryptedData;
  }

  decryptData(userInfo, key) {
    debugger
    try {
      const bytes = CryptoJS.AES.decrypt(userInfo, key); //data is encrypted string from ASP
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return userInfo;
    } catch (e) {
      console.log(e);
    }
  }


  saveInLocalStorage(userInfo) {

    localStorage.setItem("formdata", JSON.stringify({
      Name: userInfo.Name,
      Contact: userInfo.Contact,
      Email: userInfo.Email,
      DOJ: userInfo.DOJ,
      City: userInfo.City,
      Gender: userInfo.Gender,
    }));
  }

  updateEmployee() {
    debugger
    if (this.employeeForm.invalid) {
      return;
    }
    let userInfo = this.employeeForm.value

    let json = {
      Name: userInfo.Name,
      Contact: userInfo.Contact,
      Email: userInfo.Email,
      DOJ: userInfo.DOJ,
      City: userInfo.City,
      Gender: userInfo.Gender,
      id: this.listdata[this.index].id
    }
    this.service.updateEmployee(this.listdata[this.index].id, json)
    // this.listdata[this.index] = this.employeeForm.value
    this.employeeForm.reset()
  }

  populateForm(item: any, index: number) {
    debugger
    console.log(item);
    this.index = index;
    this.employeeForm.patchValue({
      id: item.id,
      Name: item.Name,
      Contact: item.Contact,
      Email: item.Email,
      DOJ: item.DOJ,
      City: item.City,
      Gender: item.Gender,
    })
  }

  getAllUsers() {
    this.service.getAllEmployee((response: any) => {
      debugger
      for (let value of response) {
        debugger
        let obj = {
          id: value.id,
          Name: value.name,
          Contact: value.contact,
          Email: value.email,
          DOJ: value.doj,
          City: value.city,
          Gender: value.gender,
        }
        this.listdata.push(obj)
      }
    })
  }

  // encryptData() {

  //    try {
  //     var value = CryptoJS.AES.encrypt(JSON.stringify(this.listdata), this.encryptSecretKey).toString();
  //     console.log("encrypted" + value);
  //     localStorage.setItem("formdata", value);

  //   } catch (item) {
  //     console.log(item);
  //   }
  // }

  // decryptData() {
  //   debugger
  //   try {
  //     var value = localStorage.getItem("formdata")

  //     const bytes = CryptoJS.AES.decrypt(value, this.encryptSecretKey);
  //     if (bytes.toString()) {
  //       console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));

  //     }
  //     //return index;
  //   } catch (item) {
  //     console.log(item);
  //   }
  // }

  deleteEmployee(index): void {

    //delete service call with table column id

    // this.listdata.splice(index, 1);
    let objectId = this.listdata[index].id
    debugger
    this.service.deleteEmployee(objectId, (index) => {
      this.listdata.forEach((element, index) => {
        debugger
        if (element.id == objectId) this.listdata.splice(index, 1);
      });
    });

  }


  ngOnInit(): void {


    this.listdata = [];
    this.employeeForm = this.fb.group({
      Name: ['', Validators.required],
      Contact: ['', Validators.required],
      Email: ['', Validators.required],
      DOJ: ['', Validators.required],
      City: ['', Validators.required],
      Gender: ['', Validators.required],
    })
    this.getAllUsers()
  }
  display() {

    debugger
    let data = JSON.parse(localStorage.getItem("formdata"));

    //decrypt and display
    console.log(data);

  }

}
