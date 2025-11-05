import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
