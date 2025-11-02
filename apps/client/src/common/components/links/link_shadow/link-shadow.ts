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
import { Span } from '../../els/span/span';
import { UseIDsDir } from '@/core/directives/use_ids';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { UseSpanDir } from '@/core/directives/use_span';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, Span],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShadow {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);

  // ? personal props
  public readonly paddingProps: InputSignal<string> = input('10px 15px');
  public readonly path: InputSignal<string> = input.required();
  public readonly download: InputSignal<Nullable<string>> = input<Nullable<string>>(null);

  // ? derived
  public readonly isExternal: Signal<boolean> = computed(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.path())
  );

  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.useSpanDir.spanProps().eventT)
  );
}
