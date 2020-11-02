import { ComponentFixture, TestBed} from '@angular/core/testing';
import {MainToolbarComponent} from './main-toolbar.component';
import {FormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SubToolbarComponent } from '../sub-toolbar/sub-toolbar.component';
import { ToolbarButtonVisibilityService } from '../toolbar-button-visibility.service';
import {reducers} from '../../store/reducers/reducers';

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;
  let nativeElement;

  beforeEach(() => {
    return TestBed.configureTestingModule({
      declarations: [
        MainToolbarComponent,
        SearchBarComponent,
        SubToolbarComponent
      ],
      imports: [FormsModule, StoreModule.forFeature('media-viewer', reducers), StoreModule.forRoot({})],
      providers: [ ToolbarButtonVisibilityService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
