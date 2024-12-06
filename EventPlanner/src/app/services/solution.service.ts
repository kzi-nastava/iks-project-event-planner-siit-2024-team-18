import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SolutionCard } from '../models/solution-card.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private router: Router, private httpClient: HttpClient) {}

  getTopFiveSolutions(city: string): Observable<SolutionCard[]> {
    let params = new HttpParams().set('city', city);
    return this.httpClient.get<SolutionCard[]>(environment.apiHost + '/api/solutions/top-solutions', { params });
  }

//   getAllSolutions(): Observable<SolutionCard[]> {
//     return of(this.allSolutions);
//   }

  openSolutionDetails(solution: SolutionCard): void {
    if (solution.solutionType === "PRODUCT") {
      this.router.navigate(['/product/', solution.id]);
    } else {
      this.router.navigate(['/service/', solution.id]);
    }
  }

  getSolutionById(solutionId: number): Observable<SolutionCard> {
    return this.httpClient.get<SolutionCard>(environment.apiHost + "/api/solutions/" + solutionId)
  }
}
