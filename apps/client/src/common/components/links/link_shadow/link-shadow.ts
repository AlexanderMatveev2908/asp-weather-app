import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { Nullable } from '@/common/types/etc';
import { UseSpanDir } from '@/core/directives/use_span';
import { Span } from '../../els/span/span';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, Span, UseSpanDir],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShadow {
  // ? directives
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);
  public readonly useMetaDir: UseMetaEventDir = inject(UseMetaEventDir);

  // ? personal props
  public readonly paddingProps: InputSignal<string> = input('10px 15px');
  public readonly path: InputSignal<string> = input.required();
  public readonly download: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  // ? derived
  public readonly isExternal: Signal<boolean> = computed(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.path())
  );
}
