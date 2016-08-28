import { bootstrap }    from '@angular/platform-browser-dynamic';
import { LocalStorageService, LocalStorageSubscriber } from 'angular2-localstorage/LocalStorageEmitter';

import { AppComponent } from './app.component';

var appPromise = bootstrap(AppComponent, [LocalStorageService]);

LocalStorageSubscriber(appPromise);
