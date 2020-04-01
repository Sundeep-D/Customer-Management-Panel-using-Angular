import { Component, OnInit } from '@angular/core';

import {CustomerService} from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService : CustomerService) { }

  customerArray=[];
  searchText: string="";
  nameFound:boolean;
  emailFound:boolean;
  mobileFound:boolean;
  locationFound:boolean;

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      list => 
      {
        this.customerArray = list.map(item => {
          return{
            $key :item.key,
            ...item.payload.val()
          };
        })
      }
    );
    // console.log(this.customerArray[0]);

    // alert(this.customerArray);
  }

  populateForm(customer)
  {
    this.customerService.form.setValue(customer);
  }

  onDelete($key)
  {
    if(confirm('Are you sure to delete this record?')){
      this.customerService.deleteCustomer($key);
    }
  }

  filterCondition(customer)
  {
  

      return  customer.fullname.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1 || customer.email.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1 || customer.mobile.indexOf(this.searchText)!=-1;
    
     
  }

}
