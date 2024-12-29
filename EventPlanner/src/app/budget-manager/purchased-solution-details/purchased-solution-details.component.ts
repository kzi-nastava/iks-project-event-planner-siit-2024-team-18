import { Component, OnInit } from '@angular/core';
import { SolutionCard } from '../../models/solution-card.model';
import { SolutionService } from '../../services/solution.service';
import { EventService } from './../../services/event.service';
import { Event } from '../../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchased-solution-details',
  templateUrl: './purchased-solution-details.component.html',
  styleUrls: ['./purchased-solution-details.component.css']
})
export class PurchasedSolutionDetailsComponent implements OnInit {
  constructor(
    private solutionService: SolutionService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loadAll();
  }
  solutions: SolutionCard[] = [];
  event: Event | null = null;

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.route.params.subscribe((params) => {
      const eventId = +params['id'];
      this.eventService.getEventById(eventId).subscribe({
        next: (event) => {
          this.event = event;

          this.solutionService.getSolutions(eventId).subscribe({
            next: (data: SolutionCard[]) => {
              this.solutions = data;
            },
            error: (err) => {
              console.error('Error fetching solutions:', err);
              this.snackBar.open('Error fetching solutions.', 'OK', {
                duration: 3000,
              });
            },
          });
        },
        error: (err) => {
          console.error('Error fetching event:', err);
          this.snackBar.open('Error fetching event.', 'OK', {
            duration: 3000,
          });
        }
      });
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