import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // anyLoader()
      }
    },
    ),
    catchError((error: HttpErrorResponse) => {
      // any errorComponent
        alert(error.message) 
      return throwError(error);
    })
    
    )
    ;
  }


}
