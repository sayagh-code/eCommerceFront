import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { ImageStorageService } from '../../services/image-storage.service';

@Component({
  selector: 'app-create-products',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,],
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent implements OnInit{

  categories! : Category[];
  product! : Product;
  image! : File;
  userFormGroup! : FormGroup;
  storage = inject(Storage);

  constructor(
    private fb : FormBuilder,
    private categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private imageService: ImageStorageService){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data)=>{
        this.categories=data._embedded.categories.filter((cat: Category)=>cat.nameCat!="All");
      }
    });
    this.userFormGroup = this.fb.group({
      name : this.fb.control(""),
      description : this.fb.control(""),
      price : this.fb.control(""),
      quantity : this.fb.control(""),
      category: this.fb.control(""),
      image : this.fb.control(null),
    });
    this.product = {} as Product;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.image=file;
    }
  }

  handleCreateProduct(){
    this.categoryService.getCategoryById(this.userFormGroup.value.category).subscribe({
      next: (category)=>{
        this.product.id=UUID.UUID();
        this.product.name=this.userFormGroup.value.name;
        this.product.description=this.userFormGroup.value.description;
        this.product.price=this.userFormGroup.value.price;
        this.product.quantity=this.userFormGroup.value.quantity;
        this.product.category={id: category.id, nameCat: category.nameCat};
        let composedName=this.product.id+this.image.name;
        this.imageService.uploadImage(this.image, composedName).then((value)=>{
          this.product.image = value!;
          this.productService.addProduct(this.product).subscribe({
            next: (data)=>{
              this.router.navigateByUrl("/admin/products");
            }
          });
        });
      }
    });
  }
}