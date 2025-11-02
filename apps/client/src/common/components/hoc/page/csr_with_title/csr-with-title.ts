import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';

@Component({
  selector: 'app-csr-with-title',
  imports: [PageWrapper],
  templateUrl: './csr-with-title.html',
  styleUrl: './csr-with-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrWithTitle {
  public readonly title: InputSignal<string> = input.required();
  public readonly isPending: InputSignal<boolean> = input(false);
}
