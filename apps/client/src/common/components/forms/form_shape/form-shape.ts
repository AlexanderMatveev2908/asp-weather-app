import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  input,
  InputSignal,
  TemplateRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormSubmit } from '../form_submit/form-submit';
import { RefTemplateT } from '@/common/types/etc';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-form-shape',
  imports: [ReactiveFormsModule, NgTemplateOutlet, FormSubmit, UseIDsDir],
  templateUrl: './form-shape.html',
  styleUrl: './form-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormShape {
  public readonly useShapeDir: UseFormShapeDir = inject(UseFormShapeDir);
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  @ContentChild('footer', { read: TemplateRef }) footer: RefTemplateT;
  public readonly useFullPage: InputSignal<boolean> = input.required();
}
