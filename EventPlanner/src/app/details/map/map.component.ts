import { Component, OnInit, AfterViewInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  private map: any;

  @Input() latitude!: number;
  @Input() longitude!: number;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && this.latitude && this.longitude) {
      import('leaflet').then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
        });

        this.initMap(L);
        this.addMarker(L);
      });
    }
  }

  private initMap(L: any): void {
    const baseMapUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    this.map = L.map('map', {
      zoomControl: true,
      attributionControl: true,
    }).setView([this.latitude, this.longitude], 13);

    L.tileLayer(baseMapUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(this.map);
  }

  private addMarker(L: any): void {
    const marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
    marker.bindPopup('<b>Event Location</b>').openPopup();
  }
}
