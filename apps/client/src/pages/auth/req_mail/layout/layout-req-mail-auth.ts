import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-req-mail-auth',
  imports: [RouterOutlet],
  templateUrl: './layout-req-mail-auth.html',
  styleUrl: './layout-req-mail-auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutReqMailAuth {}
