import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-job-applications',
  imports: [RouterOutlet],
  templateUrl: './layout-job-applications.html',
  styleUrl: './layout-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutJobApplications extends UseRouteMngHk implements OnInit {
  ngOnInit(): void {
    this.pushOutNotLogged('/job-applications');
  }
}
