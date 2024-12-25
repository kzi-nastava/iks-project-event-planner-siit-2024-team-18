import { Component } from '@angular/core';
import { SolutionCard } from '../../models/solution-card.model';
import { SolutionService } from '../../services/solution.service';

@Component({
  selector: 'app-favourite-solutions',
  templateUrl: './favourite-solutions.component.html',
  styleUrl: './favourite-solutions.component.css'
})
export class FavouriteSolutionsComponent {
  solutions: SolutionCard[] = [];

  constructor(
    private solutionService: SolutionService,
  ) {}

  ngOnInit(): void {
    this.solutionService.getFavouriteSolutions().subscribe((data: SolutionCard[]) => {
      this.solutions = data;
    });
  }
}
