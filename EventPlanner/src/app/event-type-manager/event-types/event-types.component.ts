import { Component, OnInit } from '@angular/core';
import { EventType } from '../../models/event-type.model';
import { EventTypeService } from '../../services/event-type.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteFormComponent } from '../../shared/delete-form/delete-form.component';

@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrl: './event-types.component.css'
})
export class EventTypesComponent implements OnInit {
  eventTypes: EventType[] = [];

  constructor(
    private eventTypeService: EventTypeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.eventTypeService.getAll().subscribe((data: EventType[]) => {
      this.eventTypes = data;
    });
  }

  edit(event: MouseEvent, id: number): void {
    event.stopPropagation();
    this.router.navigate(['/event-types/edit', id]);
  }

  deactivate(event: MouseEvent, id: number): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteFormComponent, {
      width: '27em',
      data: { message: 'Are you sure you want to deactivate this event type?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventTypeService.delete(id);
      }
    });
  }
}
