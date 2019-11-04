import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  private cache = new Map<string, any>();

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    //Set Header
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: { "Content-Type": "application/json" }
      });
    }

    //Request URL Replace
    request = request.clone({
      url: request.url.replace("http://", "https://")
    });

    //return next.handle(request);


    //Cache Handler
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      console.log("Cached response");
      return of(cachedResponse);
    }

    //Response and Error Handler
    this.loaderService.showLoader();
    return next.handle(request).pipe(retry(3),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
          this.loaderService.hideLoader();
        }
      }), catchError((error: HttpErrorResponse) => {
        this.loaderService.hideLoader();
        return throwError(error);
      })
    );
  }
}
