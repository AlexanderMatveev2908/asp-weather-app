import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-b',
  imports: [],
  templateUrl: './block-b.html',
  styleUrl: './block-b.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockB {}
