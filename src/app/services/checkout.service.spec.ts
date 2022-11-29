import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CheckoutDto, CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CheckoutService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud checkout', () => {
    const dto: CheckoutDto = {
      user_id: "404ce4d0-b9ff-4034-b0c7-c7695a83c123"
    };
    service.checkout(dto).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(dto);
    });

    const req = controller.expectOne(service.checkoutUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dto);
  });
});
