import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductManagerService } from '../../services/product-manager.service';
import { Comment } from '../../models/comment.model';
import { ServiceManagerService } from '../../services/service-manager.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  solutionId!: number;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductManagerService,
    private serviceService: ServiceManagerService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.fetchProductComments(id);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  fetchProductComments(solutionId: number): void {
    this.productService.getComments(solutionId).subscribe({
      next: (data: Comment[]) => {
        this.comments = data;
      },
      error: () => {
        this.fetchServiceComments(solutionId);
      },
    });
  }

  fetchServiceComments(solutionId: number): void {
    this.serviceService.getComments(solutionId).subscribe({
      next: (data: Comment[]) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Failed to fetch comments:', err);
        this.router.navigate(['']);
      },
    });
  }
}
