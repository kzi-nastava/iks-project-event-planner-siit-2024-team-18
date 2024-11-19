import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchChanged = new EventEmitter<string>();
  searchText: string = '';

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.searchChanged.emit(this.searchText);
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchChanged.emit('');
  }
}
