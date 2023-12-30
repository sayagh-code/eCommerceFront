import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB10D3cUqI6Bu9wBcMKPxCi_ON3nuIPjMk",
  authDomain: "e-commerce-dac87.firebaseapp.com",
  projectId: "e-commerce-dac87",
  storageBucket: "e-commerce-dac87.appspot.com",
  messagingSenderId: "13574669027",
  appId: "1:13574669027:web:f804ed94a9e8e2c628bbd6",
  measurementId: "G-94854MNRTX"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(), 
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideStorage(()=>getStorage())
    ])]
};
