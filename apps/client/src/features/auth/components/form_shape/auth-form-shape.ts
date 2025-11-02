import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthSpanLinks } from '../span_links/auth-span-links';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-auth-form-shape',
  imports: [FormShape, AuthSpanLinks, UseFormShapeDir, UseIDsDir],
  templateUrl: './auth-form-shape.html',
  styleUrl: './auth-form-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormShape {
  public readonly useFormShapeDir: UseFormShapeDir = inject(UseFormShapeDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);
}
