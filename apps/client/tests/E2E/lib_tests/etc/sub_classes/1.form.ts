import { expect, Locator, Page } from '@playwright/test';
import { LibRootTests } from './0.root';
import { DataFieldErrT, DataFieldT } from '../types';
import { Nullable } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/err';

export interface FillReturnT {
  field: Locator;
  errField: Locator;
}

export abstract class LibFormTests extends LibRootTests {
  private formID: Nullable<string> = null;

  public setFormID(id: string): void {
    this.formID = id;
  }

  public async getForm(): Promise<Locator> {
    return this.getFormIn(this.page);
  }

  public async getFormIn(loc: Page | Locator): Promise<Locator> {
    if (!this.formID) throw new ErrApp('expected id present');
    return await this.byIdIn(loc, this.formID);
  }

  public async submit(): Promise<void> {
    const form: Locator = await this.getForm();

    const btnID: string = `${this.formID as string}__submit`;
    const btn: Locator = await this.byIdIn(form, btnID);
    await btn.click();
  }

  public async fillWith(form: Locator, data: DataFieldT): Promise<Locator> {
    const field: Locator = await this.byIdIn(form, data.field);
    await field.fill(data.val);

    return field;
  }

  public async fillByNameWith(data: DataFieldT): Promise<Locator> {
    const field: Locator = this.page.locator(`[name="${data.field}"]`);
    await this.exists(field);

    await field.fill(data.val);

    return field;
  }

  public async errWhen(form: Locator, err: DataFieldT): Promise<FillReturnT> {
    const field: Locator = await this.fillWith(form, err);

    const errField: Locator = await this.byIdIn(form, `err__${err.field}`);
    await expect(errField).toHaveCSS('opacity', '1');

    return { field, errField };
  }

  public async errMsgWhen(form: Locator, err: DataFieldErrT): Promise<Locator> {
    const { errField, field } = await this.errWhen(form, err);

    const span: Locator = await this.byCssIn(errField, 'root__msg');
    const txt: Nullable<string> = await span.textContent();
    await expect(txt).toContain(err.err);

    return field;
  }

  public async errFor(form: Locator, errors: DataFieldT[]): Promise<Locator[]> {
    const locators: Locator[] = [];

    for (const err of errors) {
      const { field } = await this.errWhen(form, err);
      locators.push(field);
    }

    return locators;
  }

  public async fillFor(form: Locator, data: DataFieldT[]): Promise<Locator[]> {
    const locators: Locator[] = [];

    for (const f of data) {
      const field: Locator = await this.fillWith(form, f);
      locators.push(field);
    }

    return locators;
  }

  public async isFocused(el: Locator): Promise<void> {
    await expect(el).toBeInViewport();
    await expect(el).toBeFocused();
  }

  public async toggleBox(name: string, val: string): Promise<Locator> {
    const form: Locator = await this.getForm();
    const id: string = `${name}__${val}`;

    const boxBtn: Locator = await this.byIdIn(form, id);

    await boxBtn.click();
    return boxBtn;
  }
}
