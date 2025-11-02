/* eslint-disable no-magic-numbers */
export class LibCss {
  public static readonly twdGreen600: string = '#16a34a';
  public static readonly twdRed600: string = '#dc2626';

  public static hexToRgb(hex: string): string {
    const binary: number = parseInt(hex.replace('#', ''), 16);

    const r = (binary >> 16) & 0xff;
    const g = (binary >> 8) & 0xff;
    const b = binary & 0xff;

    return `rgb(${r}, ${g}, ${b})`;
  }
}
