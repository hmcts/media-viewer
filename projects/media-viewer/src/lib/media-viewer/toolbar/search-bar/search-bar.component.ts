import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchOperation, SearchResultsCount } from '../../events/viewer-operations';

@Component({
  selector: 'mv-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['../../styles/main.scss']
})
export class SearchBarComponent {

  @Input() searchBarHidden: Subject<boolean>;
  @Input() searchEvents: Subject<SearchOperation>;
  @ViewChild('findInput') findInput: ElementRef<HTMLInputElement>;

  highlightAll = true;
  matchCase = false;
  wholeWord = false;
  resultsText = '';
  searchText = '';
  haveResults = false;

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown(e: KeyboardEvent): void {
    if (e.code === 'F3' || (e.ctrlKey && e.code === 'KeyF')) {
      e.preventDefault();

      this.searchBarHidden.next(false);
      setTimeout(() => this.findInput.nativeElement.focus(), 200);
    }
  }

  searchNext() {
    this.searchEvents.next(new SearchOperation(
      this.searchText,
      this.highlightAll,
      this.matchCase,
      this.wholeWord,
      false,
      false
    ));
  }

  searchPrev() {
    this.searchEvents.next(new SearchOperation(
      this.searchText,
      this.highlightAll,
      this.matchCase,
      this.wholeWord,
      true,
      false
    ));
  }

  search() {
    this.searchEvents.next(new SearchOperation(
      this.searchText,
      this.highlightAll,
      this.matchCase,
      this.wholeWord,
      false,
      true
    ));
  }

  @Input()
  set searchResultsCount(results: SearchResultsCount | null) {
    if (results) {
      this.haveResults = results.total > 0;
      this.resultsText = this.haveResults
        ? `${results.current} of ${results.total} matches`
        : 'Phrase not found';
    }
  }

  public onInputKeyPress(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.searchBarHidden.next(true);
    }
  }
}
