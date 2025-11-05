import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtxHk implements AfterViewInit {
  ngAfterViewInit(): void {
    void null;
  }
}
