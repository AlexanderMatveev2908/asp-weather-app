import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-verify',
  imports: [RouterOutlet],
  templateUrl: './layout-verify.html',
  styleUrl: './layout-verify.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutVerify {}
