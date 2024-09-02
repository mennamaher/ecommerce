import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorsInterceptor } from './shared/interceptors/errors.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { spinnerInterceptor } from './shared/interceptors/spinner.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';



function HttpLoader(http:HttpClient)
{
  return new TranslateHttpLoader(http , './assets/i18n/' , '.json' )
}

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideToastr(),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(HttpClientModule, RouterModule, BrowserAnimationsModule, ToastrModule, NgxSpinnerModule,

      TranslateModule.forRoot({
        loader :{
          provide : TranslateLoader ,
          useFactory : HttpLoader,
          deps : [HttpClient]
        }
      })

      
      ),
    provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorsInterceptor, spinnerInterceptor]))
    ]
};
