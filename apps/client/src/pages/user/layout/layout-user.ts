import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-user',
  imports: [RouterOutlet],
  templateUrl: './layout-user.html',
  styleUrl: './layout-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutUser extends UseRouteMngHk implements OnInit {
  ngOnInit(): void {
    this.pushOutNotLogged('/user');
  }
}
