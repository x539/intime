import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic }    from '@angular/platform-browser-dynamic';

import { TimeTrackModule } from './app/timetrack.module';
import { environment } from './environments/environment';


if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TimeTrackModule);