import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../models/product-service.model';

@Component({
  selector: 'app-product-service-card',
  templateUrl: './product-service-card.component.html',
  styleUrls: ['./product-service-card.component.css']
})
export class ProductServiceCardComponent {
  @Input() productService!: ProductService;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.productService.id);
  }
}