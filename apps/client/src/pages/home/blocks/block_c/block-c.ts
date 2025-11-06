import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-c',
  imports: [],
  templateUrl: './block-c.html',
  styleUrl: './block-c.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockC {}
