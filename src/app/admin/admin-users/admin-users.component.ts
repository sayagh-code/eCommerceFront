import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit{
  fullCustomers! : Array<Customer>;
  customers! : Array<Customer>;
  page : number = 0;
  size : number = 6;
  totalPages : number = 0;
  searchFormGroup! : FormGroup;
  currentAction : string = "All";

  public constructor(private customerService: CustomerService, private fb : FormBuilder){}

  ngOnInit(): void {
    this.searchFormGroup= this.fb.group({
      keyword : this.fb.control(null)
    })
    this.handleGetAllCustomers();
  }

  handleGetAllCustomers(){
    this.customerService.getAllCustomers().subscribe({
      next: (data) =>{
        let index = this.page*this.size;
        this.customers=[...data._embedded.visitors];
        this.fullCustomers=[...data._embedded.visitors];
        this.totalPages = ~~(this.customers.length/this.size);
        if(this.customers.length % this.size != 0)
          this.totalPages++;
        this.customers=this.customers.slice(index,index+this.size);
      }
    });
  }

  handleDeleteCustomer(c: Customer) {
    let conf=confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (data)=>{
        let index = this.customers.indexOf(c);
        this.customers.splice(index, 1);
      }
    });
  }

  handleSearchCustomers() {
    this.currentAction="search";
    this.page=0;
    let keyword = this.searchFormGroup.value.keyword;
    if(keyword)
      this.customerService.searchCustomers(keyword,this.fullCustomers).subscribe({
        next: (data) => {
          let index = this.page*this.size;
          this.totalPages = ~~(data.length/this.size);
          if(data.length % this.size != 0)
            this.totalPages++;
          this.customers=data.slice(index,index+this.size);
        }
      })
    else
      this.handleGetAllCustomers();
  }

  gotoPage(i : number) {
    this.page=i;
    if(this.currentAction==="All")
      this.handleGetAllCustomers();
    else
      this.handleSearchCustomers();
  }
}
