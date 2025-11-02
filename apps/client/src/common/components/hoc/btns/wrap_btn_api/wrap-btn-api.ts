import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';

@Component({
  selector: 'app-wrap-btn-api',
  imports: [SpinBtn, UseMetaEventDir],
  templateUrl: './wrap-btn-api.html',
  styleUrl: './wrap-btn-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapBtnApi {
  public readonly useWrapApiDir: UseWrapApiDir = inject(UseWrapApiDir);
}
