import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { OttomanService } from './services/ottoman.service';

const materials = [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        LayoutModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production,
        }),
        ...materials,
    ],
    providers: [OttomanService],
    bootstrap: [AppComponent],
})
export class AppModule {}
