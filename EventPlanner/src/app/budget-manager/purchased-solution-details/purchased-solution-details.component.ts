import { Component, OnInit } from '@angular/core';
import { SolutionCard } from '../../models/solution-card.model';
import { SolutionService } from '../../services/solution.service';
import { EventService } from './../../services/event.service';
import { Event } from '../../models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchased-solution-details',
  templateUrl: './purchased-solution-details.component.html',
  styleUrls: ['./purchased-solution-details.component.css']
})
export class PurchasedSolutionDetailsComponent implements OnInit {
  constructor(
    private solutionService: SolutionService,
    private eventService: EventService,
    private router: Router,
  ) {
    this.loadAll();
  }
  solutions: SolutionCard[] = [];
  event: Event | null = null;

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.solutionService.getSolutions(1).subscribe({
      next: (data: SolutionCard[]) => {
        this.solutions = data;
      },
      error: (err) => {
        console.error('Error fetching solutions:', err);
      },
    });

    this.eventService.getEventById(1).subscribe({
      next: (data: Event) => {
        this.event = data;
      },
      error: (err) => {
        console.error('Error fetching event:', err);
      },
    });
  }

  details(solutionId: any) {
    this.solutionService.isProduct(solutionId).subscribe({
      next: (value) => {
          if (value) {
            this.router.navigate(['/product', solutionId]);
          } else {
            this.router.navigate(['/service', solutionId]);
          }
      },
      error(err) {
        console.error('Error:', err);
      },
    })
  }
}