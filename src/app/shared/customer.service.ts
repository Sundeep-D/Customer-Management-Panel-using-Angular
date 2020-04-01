import { Injectable } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 

  constructor(private firebase: AngularFireDatabase) { }

  customerList:AngularFireList<any>;

    form=new FormGroup({

      $key: new FormControl(null),
      fullname: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      mobile: new FormControl('',[Validators.required,Validators.minLength(10)]),
      location: new FormControl('',Validators.required)
    });

    getCustomers()
    {
      this.customerList=this.firebase.list('customers');
      return this.customerList.snapshotChanges();
    }

    insertCustomer(customer)
    {
      this.customerList.push(
        {
          fullname: customer.fullname,
          email: customer.email,
          mobile: customer.mobile,
          location: customer.location
        }
      );
    }

    updateCustomer(customer)
    {
      this.customerList.update(customer.$key,
        {
          fullname: customer.fullname,
          email: customer.email,
          mobile: customer.mobile,
          location: customer.location
        });
    }

    deleteCustomer($key: string) {
      this.customerList.remove($key);
    }
  
}
