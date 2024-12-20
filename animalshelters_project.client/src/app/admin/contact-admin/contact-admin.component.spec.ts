import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdminComponent } from './contact-admin.component';

describe('ContactAdminComponent', () => { // Updated name
  let component: ContactAdminComponent;
  let fixture: ComponentFixture<ContactAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContactAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
