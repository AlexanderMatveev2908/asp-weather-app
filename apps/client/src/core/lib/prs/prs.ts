export class LibPrs {
  public static firstCharUpper(arg: string): string {
    return arg[0].toUpperCase() + arg.slice(1).toLowerCase();
  }

  public static titleCase(arg: string): string {
    return arg
      .split(/\s+/)
      .map((w: string) => this.firstCharUpper(w))
      .join(' ');
  }

  public static txtOfCamelCase(arg: string, { titleCase }: { titleCase: boolean }): string {
    const splitted: string[] = arg.replace(/([A-Z])/g, ' $1').split(' ');
    const formatted: string[] = splitted.map((w: string) =>
      titleCase ? this.firstCharUpper(w) : w.toLowerCase()
    );

    return formatted.join(' ');
  }

  public static toSnake(arg: string): string {
    const replaced: string = arg
      .replace(/\s+/g, '')
      // ! sometimes i pass as argument strange stuff
      .replace(/\//g, '_')
      .replace(/(?<!^)([A-Z])/g, '_$1')
      .replace(/_{3,}/g, '__');

    return replaced.toLowerCase();
  }
}
