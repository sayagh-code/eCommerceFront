import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageStorageService } from '../../services/image-storage.service';
import { Observable, from } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit{

  fullProducts! : Array<Product>;
  products! : Array<Product>;
  page : number = 0;
  size : number = 3;
  totalPages : number = 0;
  searchFormGroup! : FormGroup;
  currentAction : string = "All";
  link! : any;

  public constructor(
    private productService: ProductService, 
    private fb : FormBuilder, 
    private imageService: ImageStorageService
  ){}

  ngOnInit(): void {
    this.searchFormGroup= this.fb.group({
      keyword : this.fb.control(null)
    })
    this.handleGetAllProducts();
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) =>{
        let index = this.page*this.size;
        this.products=[...data._embedded.products];
        this.fullProducts=[...data._embedded.products];
        this.totalPages = ~~(this.products.length/this.size);
        if(this.products.length % this.size != 0)
          this.totalPages++;
        this.products=this.products.slice(index,index+this.size);
      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf=confirm("Are you sure?");
    if(!conf) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data)=>{
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
        this.imageService.deleteImage(p.image);
      }
    });
  }

  handleSearchProducts() {
    this.currentAction="search";
    this.page=0;
    let keyword = this.searchFormGroup.value.keyword;
    if(keyword)
      this.productService.searchProducts(keyword,this.fullProducts).subscribe({
        next: (data) => {
          let index = this.page*this.size;
          this.totalPages = ~~(data.length/this.size);
          if(data.length % this.size != 0)
            this.totalPages++;
          this.products=data.slice(index,index+this.size);
        }
      })
    else
      this.handleGetAllProducts();
  }

  gotoPage(i : number) {
    this.page=i;
    if(this.currentAction==="All")
      this.handleGetAllProducts();
    else
      this.handleSearchProducts();
  }
}