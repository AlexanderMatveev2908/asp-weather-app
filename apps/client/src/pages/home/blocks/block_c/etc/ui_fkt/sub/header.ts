import { SvgFillEnigma } from '@/common/components/svgs/fill/enigma/enigma';
import { OrNone } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { RootUiFkt } from '@/core/ui_fkt/root';
import { CurrWeatherT } from '@/features/weather/etc/types';
import { Type } from '@angular/core';

export interface PayloadHeaderBlockC {
  Svg: Type<SvgFillEnigma>;
  twdCss: string;
  label: string;
  time: string;
  id: string;
}

export class HeaderWeatherUiFktBlockC extends RootUiFkt {
  private static timeUsStyle(arg: OrNone<number>): string {
    if (!arg) return '0:0 AM';

    return Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(LibPrs.timestampAsMillis(arg)));
  }

  private static payloadSunrise(
    arg: OrNone<number>
  ): Pick<PayloadHeaderBlockC, 'label' | 'twdCss' | 'time'> {
    return {
      label: 'Sunrise',
      twdCss: 'text-yellow__prm',
      time: this.timeUsStyle(arg),
    };
  }

  private static payloadSunset(
    arg: OrNone<number>
  ): Pick<PayloadHeaderBlockC, 'label' | 'twdCss' | 'time'> {
    return {
      label: 'Sunset',
      twdCss: 'text-orange__prm',
      time: this.timeUsStyle(arg),
    };
  }

  public static main(arg: OrNone<CurrWeatherT>): PayloadHeaderBlockC[] {
    const list: Omit<PayloadHeaderBlockC, 'id'>[] = Array.from(
      { length: 2 },
      (_: undefined, idx: number) => ({
        ...(!idx ? this.payloadSunrise(arg?.sunrise) : this.payloadSunset(arg?.sunset)),
        Svg: SvgFillEnigma,
      })
    );

    return this.listWithIDs(list);
  }
}
