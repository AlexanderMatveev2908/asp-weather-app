/* eslint-disable no-magic-numbers */
// ? https://www.asciitable.com/

export class Ascii {
  private static fromUnicode(startIdx: number, endIdx: number): string[] {
    const lengthRange: number = endIdx - startIdx;

    return Array.from({ length: lengthRange }, (_: undefined, i: number) =>
      String.fromCharCode(startIdx + i)
    );
  }

  // ? unicode uppercase range => 65 - 91
  private static readonly upper: string[] = this.fromUnicode(65, 91);
  // ? unicode lowercase range => 97 - 123
  private static readonly lower: string[] = this.fromUnicode(97, 123);
  private static readonly nums: string[] = Array.from(
    { length: 10 },
    (__dirname: undefined, i: number) => i + ''
  );
  private static readonly symbols: string[] = [
    ...this.fromUnicode(33, 47),
    ...this.fromUnicode(58, 64),
    ...this.fromUnicode(91, 96),
    ...this.fromUnicode(123, 126),
  ];

  public static ascii(): [string[], string[], string[], string[]] {
    return [this.lower, this.upper, this.nums, this.symbols];
  }
}
