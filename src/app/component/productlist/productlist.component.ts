import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent {
  constructor(public service:MasterService){

  }
  functionremove(id:any){
    this.service.RemoveProduct(id);
  }

  functionedit(id:any){
    this.service.GetProductbyCode(id);
  }
 }