import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../models/user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  success = false;
  resptxt = '';
  columnDefs = [
        {headerName: 'First Name', field: 'first_name',sortable: true ,filter: true},        
        {headerName: 'Last Name', field: 'last_name',sortable: true },
        {headerName: 'Employee Id', field: 'employee_id',sortable: true}
    ];

  rowData: any;

  constructor(private formBuilder: FormBuilder,private service: DataService) { }

  ngOnInit() {

      this.userForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      empid: ['', Validators.required]
    });

    this.getUsers();

  }

  getUsers(){

    this.service.getUsers().subscribe(data => {
        this.rowData = data            
      });

  }

  createUser() {
    this.submitted = true;
    

    if (this.userForm.invalid) {
        return;
    }

    let user = new User();
    user.first_name = this.userForm.value.fname;
    user.last_name = this.userForm.value.lname;
    user.employee_id = this.userForm.value.empid;
    
    this.service.createUser(user).subscribe((result) => {
        this.success = true; 
        this.getUsers();      
     });    

    

     //this.userForm.reset();

    
  }

}
