import { LinksUiFkt } from '@/core/ui_fkt/links';
import { describe, it, expect } from 'vitest';

describe('path match', () => {
  it('0. should match simple equality', () => {
    expect(LinksUiFkt.isCurrPath('/abc', '/abc')).toBe(true);
  });

  it('1. should match with a trailing slash in path & query in href', () => {
    expect(LinksUiFkt.isCurrPath('/abc/', '/abc?x=123')).toBe(true);
  });

  it('2. should match with query in path & trailing slash in href', () => {
    expect(LinksUiFkt.isCurrPath('/abc?x=123', '/abc//')).toBe(true);
  });

  it('3. should fail simple inequality', () => {
    expect(LinksUiFkt.isCurrPath('/abc', '/zxy')).toBe(false);
  });

  it('4. should fail sub paths', () => {
    expect(LinksUiFkt.isCurrPath('/abc', '/abc/subpath')).toBe(false);
  });
});
