import { Injectable, inject } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  
  storage = inject(Storage);

  constructor() { }

  async uploadImage(file: File, imageName: string){
    const storageRef = ref(this.storage, `products/${imageName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  async deleteImage(imageName: string){
    const storageRef = ref(this.storage, `${imageName}`);
    await deleteObject(storageRef);
  }
}
