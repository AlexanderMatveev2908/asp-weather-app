import { Header } from '@/layout/header/header';
import { Sidebar } from '@/layout/sidebar/sidebar';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { UseAppDir } from './etc/directives/use_app/use_app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast, WakeUp],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseAppDir implements AfterViewInit {
  ngAfterViewInit(): void {
    this.useDOM(() => {
      void null;
    });
  }
}
