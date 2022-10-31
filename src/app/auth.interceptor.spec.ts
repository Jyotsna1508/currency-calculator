import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthInterceptor]
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });
  it('should be created', () => {
    let interceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('should add an Authorization header', fakeAsync(() => { 
    const httpTestingController = TestBed.inject(HttpTestingController);
    const http = TestBed.inject(HttpClient);
    http.get('my-api-url')
          .subscribe((response)=>{
            expect(response).toBeTruthy();
          });
    tick();         
    const httpRequest = httpTestingController.expectOne('my-api-url');
    expect(httpRequest.request.headers.has('apikey'));
    httpTestingController.verify();
  }));
});
