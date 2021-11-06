export class Employee {
  id: number;
  Name: string;
  Contact: number;
  Email: string;
  DOJ: string;
  Gender: string;
  City: string;

  constructor(id: number = null,
    Name: string = '', Contact: number = 0, Email: string = '', DOJ: string='', Gender: string='', City: string='',) {
    this.id = id;
    this.Name = Name;
    this.Contact = Contact;
    this.Email = Email;
    this.DOJ = DOJ;
    this.City = City;
    this.Gender = Gender;

  }
}



