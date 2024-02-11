import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesProduct } from '../Model/Salesproduct';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private productlistSubject = new BehaviorSubject<SalesProduct[]>([]);
  productlist$ = this.productlistSubject.asObservable();

  private productSelectedSubject = new BehaviorSubject<SalesProduct | null>(null);
  productSelected$ = this.productSelectedSubject.asObservable();

  private apiUrl = 'http://localhost:5238/api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  get productlistValue(): SalesProduct[] {
    return this.productlistSubject.value;
  }

  fetchProducts(): void {
    this.http.get<SalesProduct[]>(`${this.apiUrl}/products`)
      .subscribe(products => {
        this.productlistSubject.next(products);
      });
  }

  AddProduct(_product: SalesProduct): void {
    this.http.post<SalesProduct>(`${this.apiUrl}/products`, _product)
      .subscribe(newProduct => {
        this.productlistSubject.next([...this.productlistValue, newProduct]);
      });
  }

  UpdateProduct(_product: SalesProduct): void {
    this.http.put<SalesProduct>(`${this.apiUrl}/products/${_product.id}`, _product)
      .subscribe(() => {
        const updatedProducts = this.productlistValue.map(item => (item.id === _product.id ? _product : item));
        this.productlistSubject.next(updatedProducts);
      });
  }

  RemoveProduct(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/products/${id}`)
      .subscribe(() => {
        const updatedProducts = this.productlistValue.filter(item => item.id !== id);
        this.productlistSubject.next(updatedProducts);
      });
  }

  GetProductbyCode(id: number): void {
    this.http.get<SalesProduct>(`${this.apiUrl}/products/${id}`)
      .subscribe(product => {
        this.productSelectedSubject.next(product ?? null);
      });
  }
}


































// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { SalesProduct } from '../Model/Salesproduct';

// @Injectable({
//   providedIn: 'root'
// })
// export class MasterService {

//   private productlistSubject = new BehaviorSubject<SalesProduct[]>([]);
//   productlist$ = this.productlistSubject.asObservable();


//   private productSelectedSubject = new BehaviorSubject<SalesProduct | null>(null);
//   productSelected$ = this.productSelectedSubject.asObservable();

//   constructor() { }

//   get productlistValue(): SalesProduct[] {
//     return this.productlistSubject.value;
//   }



//   AddProduct(_product: SalesProduct) {
//     const currentProducts = this.productlistValue;
//     const maxId = currentProducts.length > 0 ? Math.max(...currentProducts.map(product => product.id)) : 0;
//     _product.id = maxId + 1; // Assurez-vous que l'identifiant est unique en l'incrémentant
//     this.productlistSubject.next([...currentProducts, _product]);
//   }

//   UpdateProduct(_product: SalesProduct) {
//     const updatedProducts = this.productlistValue.map(item => (item.id === _product.id ? _product : item));
//     this.productlistSubject.next(updatedProducts);
//   }



//   RemoveProduct(id: number) {
//     const updatedProducts = this.productlistValue.filter(item => item.id !== id);
//     this.productlistSubject.next(updatedProducts);
//   }
  

//   GetProductbyCode(id: number) {
//     const product = this.productlistValue.find(item => item.id === id);
//     this.productSelectedSubject.next(product ?? null);
//   }
  

  
// }
 

// //   AddProduct(_product: SalesProduct) {
// //     const currentProducts = this.productlistValue;
// //     this.productlistSubject.next([...currentProducts, _product]);
// //   }
