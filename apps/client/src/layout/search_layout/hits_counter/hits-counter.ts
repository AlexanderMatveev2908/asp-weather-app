import { SvgFillParty } from '@/common/components/svgs/fill/party/party';
import { Nullable } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
  Type,
} from '@angular/core';

@Component({
  selector: 'app-hits-counter',
  imports: [NgComponentOutlet],
  templateUrl: './hits-counter.html',
  styleUrl: './hits-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HitsCounter {
  public readonly nHits: InputSignal<Nullable<number>> = input.required();

  // ? static assets
  public readonly partySvg: Type<unknown> = SvgFillParty;

  // ? derived
  public readonly label: Signal<string> = computed(
    () => `${this.nHits() ?? 0} Hit${this.nHits() !== 1 ? 's' : ''}`
  );
}
