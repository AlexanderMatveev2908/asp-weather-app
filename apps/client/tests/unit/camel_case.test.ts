import { LibPrs } from '@/core/lib/data_structure/prs';
import { describe, expect, it } from 'vitest';

describe('parse from camel case to simple txt', () => {
  it('0. should return all lowercases', () => {
    const devTxt: string = 'myDevVariableCamelCase';
    const expected: string = 'my dev variable camel case';

    expect(LibPrs.txtOfCamelCase(devTxt, { titleCase: false })).toBe(expected);
  });

  it('1. should return all title case', () => {
    const devTxt: string = 'myDevVariableCamelCase';
    const expected: string = 'My Dev Variable Camel Case';

    expect(LibPrs.txtOfCamelCase(devTxt, { titleCase: true })).toBe(expected);
  });
});
