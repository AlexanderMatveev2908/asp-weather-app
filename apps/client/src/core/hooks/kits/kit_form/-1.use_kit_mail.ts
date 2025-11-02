import { inject, Injectable } from '@angular/core';
import { RequireMailApiSvc } from '@/features/require_mail/api';
import { UseKitNav } from '@/core/services/use_kit_nav';

@Injectable()
export abstract class UseKitMailFormHk {
  protected readonly requireMailAPi: RequireMailApiSvc = inject(RequireMailApiSvc);
  protected readonly useKitNav: UseKitNav = inject(UseKitNav);
}
