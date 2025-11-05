import { Injectable } from '@angular/core';
import { _UseRouterHk } from './sub/1.use_router';
import { _UseNavSecurityHk } from './sub/3.use_security';

@Injectable({
  providedIn: 'root',
})
export class UseNavSvc extends _UseNavSecurityHk {}
