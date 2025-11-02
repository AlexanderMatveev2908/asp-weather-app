import { LibPrs } from '@/core/lib/data_structure/prs';
import { describe, expect, it } from 'vitest';

describe('parse from camel case to snake case', () => {
  it('0. should return snake case', () => {
    const devTxt: string = 'myDevVariableCamelCase';
    const expected: string = 'my_dev_variable_camel_case';

    expect(LibPrs.toSnake(devTxt)).toBe(expected);
  });

  it('1. should handle spaces', () => {
    const devTxt: string = 'my Dev Label Title Case';
    const expected: string = 'my_dev_label_title_case';

    expect(LibPrs.toSnake(devTxt)).toBe(expected);
  });

  it('1. should handle first letter uppercase', () => {
    const devTxt: string = 'My Dev';
    const expected: string = 'my_dev';

    expect(LibPrs.toSnake(devTxt)).toBe(expected);
  });
});
