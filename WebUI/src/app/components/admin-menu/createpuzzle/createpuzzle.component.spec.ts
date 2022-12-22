import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepuzzleComponent } from './createpuzzle.component';

describe('CreatepuzzleComponent', () => {
  let component: CreatepuzzleComponent;
  let fixture: ComponentFixture<CreatepuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatepuzzleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
