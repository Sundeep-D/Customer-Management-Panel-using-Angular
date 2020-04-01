import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../shared/customer.service'


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public customerService: CustomerService) { }

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls=this.customerService.form.controls;

  ngOnInit(): void {
  }

  onSubmit()
  {
   
      this.submitted=true;
      if(this.customerService.form.valid)
      {

        this.submitted=false;
        if(this.customerService.form.get('$key').value == null)   //for insert
        {
          this.customerService.insertCustomer(this.customerService.form.value);
          this.showSuccessMessage=true;
          setTimeout(()=> this.showSuccessMessage=false,3000);
          this.customerService.form.reset();
        }else
        {

    
          this.customerService.updateCustomer(this.customerService.form.value);
          this.showSuccessMessage=true;
          setTimeout(()=> this.showSuccessMessage=false,3000);
          this.customerService.form.reset();
        }
    

      }
    

  }

}
