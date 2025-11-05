import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseGeoMngSvc } from '@/features/weather/etc/services/use_geo_mng';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtxHk implements OnInit {
  private readonly useGeoMng: UseGeoMngSvc = inject(UseGeoMngSvc);

  ngOnInit(): void {
    this.useGeoMng.main();
  }
}
