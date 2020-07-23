import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers/reducers';
import { IcpToolbarComponent } from './icp-toolbar.component';
import { ToolbarEventService } from '../toolbar-event.service';
import { BehaviorSubject } from 'rxjs';

describe('IcpToolbarComponent', () => {
  let component: IcpToolbarComponent;
  let fixture: ComponentFixture<IcpToolbarComponent>;
  let toolbarEvents: ToolbarEventService;
  const toolbarEventsMock = {
    icp: {
      becomePresenter: () => {},
      stopPresenting: () => {},
      leaveSession: () => {},
      toggleIcpParticipantsList: () => {},
      icpParticipantsListVisible: new BehaviorSubject(false)
    }
  };

  beforeEach(() => {
    return TestBed.configureTestingModule({
      declarations: [IcpToolbarComponent],
      imports: [
        StoreModule.forFeature('media-viewer', reducers),
        StoreModule.forRoot({})
      ],
      providers: [{ provide: ToolbarEventService, useValue: toolbarEventsMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcpToolbarComponent);
    component = fixture.componentInstance;
    toolbarEvents = TestBed.get(ToolbarEventService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should present', () => {
    spyOn(toolbarEvents.icp, 'becomePresenter')

    component.present();

    expect(toolbarEvents.icp.becomePresenter).toHaveBeenCalled();
  });

  it('should stopPresenting', () => {
    spyOn(toolbarEvents.icp, 'stopPresenting');

    component.stopPresenting();

    expect(toolbarEvents.icp.stopPresenting).toHaveBeenCalled();
  });

  it('should leaveSession', () => {
    spyOn(toolbarEvents.icp, 'leaveSession');

    component.leaveIcpSession();

    expect(toolbarEvents.icp.leaveSession).toHaveBeenCalled();
  });

  it('should show participants', () => {
    spyOn(toolbarEvents.icp, 'toggleIcpParticipantsList');

    component.showParticipantsList();

    expect(toolbarEvents.icp.toggleIcpParticipantsList).toHaveBeenCalledWith(true);
  });
});