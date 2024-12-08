import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SolutionCard } from '../../models/solution-card.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: SolutionCard;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.product.id);
  }
}