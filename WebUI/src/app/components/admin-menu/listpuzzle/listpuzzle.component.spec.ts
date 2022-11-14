import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpuzzleComponent } from './listpuzzle.component';

describe('ListpuzzleComponent', () => {
  let component: ListpuzzleComponent;
  let fixture: ComponentFixture<ListpuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpuzzleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
