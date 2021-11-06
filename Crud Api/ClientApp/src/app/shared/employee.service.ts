import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly baseURL = 'http://localhost:54555/api'
  readonly encryptSecretKey = "1mySecretKeyHere";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })
  }

  constructor(private http: HttpClient) {
  }

  v:any;
  r:any;
  postEmployee(encrypted: string, callback: any) {
    debugger
    this.v= JSON.stringify({
      "EncryptReq": encrypted,
      "Key": this.encryptSecretKey
    })
    this.http.post(`${this.baseURL}/Employee`, this.v, this.httpOptions).subscribe(
      (response) => {
        debugger
this.r= JSON.stringify(response);
        console.log("res"+response)
        callback(response)
      },
      (error) => {
        debugger
        console.log("err"+error)
      }
    )
  }

  updateEmployee(id, employee) {
    this.http.put(`${this.baseURL}/Employee/${id}`, employee, this.httpOptions).subscribe(
      (response) => {
        debugger
        console.log(response)

      },
      (error) => {
        debugger
        console.log(error)
      }
    )
  }

  getAllEmployee(callback: any) {
    this.http.get(`${this.baseURL}/Employee`, this.httpOptions).subscribe(
      (response) => {
        debugger
        console.log(response)
        callback(response)
      },
      (error) => {
        debugger
        console.log(error)
      }
    )
  }


  deleteEmployee(id, callback) {
    debugger
    this.http.delete(`${this.baseURL}/Employee/${id}`, this.httpOptions).subscribe(
      (response) => {
        debugger
        console.log(response)
        callback(response)
      },
      (error) => {
        debugger
        console.log(error)
      }
    )
  }
}








