import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { SalesProduct } from '../../Model/Salesproduct';
import { MasterService } from '../../service/master.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent {

  btntext = 'Add Product';
  selectedProduct: SalesProduct | null = null;

  constructor(private builder: FormBuilder, public service: MasterService) {
    this.service.productSelected$.pipe(take(1)).subscribe(product => {
      this.selectedProduct = product;
      if (this.selectedProduct && this.selectedProduct.id > 0) {
        this.btntext = 'Update';
        this.productform.patchValue({
          id: this.selectedProduct.id,
          name: this.selectedProduct.name,
          description: this.selectedProduct.description
        });
      }
    });
  }

  productform = this.builder.group({
    id: [0],
    name: [''],
    description: ['']
  });

  AddProduct() {
    const id = typeof this.productform.value.id === 'number' ? this.productform.value.id : 0;
    const name = typeof this.productform.value.name === 'string' ? this.productform.value.name : '';
    const description = typeof this.productform.value.description === 'string' ? this.productform.value.description : '';
    
    const product: SalesProduct = {
      id: id,
      name: name,
      description: description,
    };
    
  
    if (id === 0) {
      // Ajouter un nouveau produit
      this.service.AddProduct(product);
    } else {
      // Mettre à jour un produit existant
      this.service.UpdateProduct(product);
    }
  
    // Réinitialiser le formulaire après l'ajout ou la mise à jour
    this.productform.reset({
      id: 0,
      name: '',
      description: ''
    });
  
    // Réinitialiser le texte du bouton
    this.btntext = 'Add Product';
  }
  

  productchange(element: any) {
    const productname = element.target['options'][element.target['options'].selectedIndex].text;
    this.productform.controls['name'].setValue(productname);
  }

}
