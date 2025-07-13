import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnChanges {
  @Input() eventId!: number;

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 700,
      easing: 'easeInOutQuad',
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#ebebeb',
        },
        position: 'top',
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ebebeb',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: (context) => ` ${context.parsed.y} attendees`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#ebebeb',
        },
        grid: {
          color: '#ebebeb',
        },
        ticks: {
          color: '#ebebeb',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Attendees',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#ebebeb',
        },
        ticks: {
          stepSize: 1,
          precision: 0,
          color: '#ebebeb',
        },
        grid: {
          color: '#ebebeb',
        },
      },
    },
  };

  constructor(private eventService: EventService) {}

  ngOnChanges(): void {
    if (this.eventId) {
      this.loadAttendanceStats();
    }
  }

  private loadAttendanceStats(): void {
    this.eventService.getAttendanceStats(this.eventId).subscribe((stats) => {
      this.chartData = {
        labels: stats.map((s) => s.date),
        datasets: [
          {
            label: 'Attendees Over Time',
            data: stats.map((s) => s.count),
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.3)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: '#66bb6a',
            pointHoverBackgroundColor: '#388e3c',
            borderWidth: 3,
          },
        ],
      };
    });
  }
}
