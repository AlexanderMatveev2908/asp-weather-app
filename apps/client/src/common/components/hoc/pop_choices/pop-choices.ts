import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { BtnShadow } from '../../btns/btn_shadow/btn-shadow';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';
import { SpanEventPropsT } from '../../els/span/etc/types';
import { BtnListenersT, BtnStatePropsT, WithIdT, WithTestIdT } from '@/common/types/etc';
import { v4 } from 'uuid';

export interface BtnPopChoicePropsT
  extends SpanEventPropsT,
    WithIdT,
    WithTestIdT,
    BtnStatePropsT,
    BtnListenersT {}

@Component({
  selector: 'app-pop-choices',
  imports: [BtnShadow, UseSpanDir, UseIDsDir],
  templateUrl: './pop-choices.html',
  styleUrl: './pop-choices.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopChoices {
  private readonly useIDs: UseIDsDir = inject(UseIDsDir);

  public readonly txt: InputSignal<string> = input.required();

  public readonly choiceA: InputSignal<Partial<BtnPopChoicePropsT>> = input.required();
  public readonly choiceB: InputSignal<Partial<BtnPopChoicePropsT>> = input.required();

  public withDefault(choice: 'a' | 'b'): BtnPopChoicePropsT {
    const base: Partial<BtnPopChoicePropsT> = choice === 'a' ? this.choiceA() : this.choiceB();
    const someonePending: boolean = !!(this.choiceA().isPending || this.choiceB().isPending);

    return (
      choice === 'a'
        ? {
            ...base,
            eventT: base.eventT ?? 'ERR',
            label: 'Delete',
            isDisabled: someonePending,
            testId: `${this.useIDs.testId()}__popup__choice_${choice}`,
            id: v4(),
          }
        : {
            ...base,
            eventT: base.eventT ?? 'OK',
            label: 'I change idea',
            isDisabled: someonePending,
            testId: `${this.useIDs.testId()}__popup__choice_${choice}`,
            id: v4(),
          }
    ) as BtnPopChoicePropsT;
  }
}
