import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../../../services/solution.service';
import { SolutionCard } from '../../../models/solution-card.model';

@Component({
  selector: 'app-top-five-products-services',
  templateUrl: './top-five-products-services.component.html',
  styleUrls: ['./top-five-products-services.component.css'],
})
export class TopFiveProductsServicesComponent implements OnInit {
  solutions: SolutionCard[] = [];
  currentIndex: number = 0;
  swiperOffset: number = 0;

  constructor(private solutionService: SolutionService) {}

  ngOnInit(): void {
    this.fetchTopSolutions();
  }

  fetchTopSolutions(): void {
    const cityName = 'Paris';
    this.solutionService.getTopFiveSolutions(cityName).subscribe((data) => {
      this.solutions = data;
    });
  }

  prevItem(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.solutions.length - 1;
    }
    this.updateSwiperPosition();
  }

  nextItem(): void {
    if (this.currentIndex < this.solutions.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSwiperPosition();
  }

  goToItem(index: number): void {
    this.currentIndex = index;
    this.updateSwiperPosition();
  }

  private updateSwiperPosition(): void {
    this.swiperOffset = -this.currentIndex * 100;
  }

  openDetails(solution: SolutionCard): void {
    this.solutionService.openSolutionDetails(solution);
  }
}
