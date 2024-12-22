import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolutionCard } from '../../models/solution-card.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() service!: SolutionCard;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.service.id);
  }
}
