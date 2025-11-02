export interface RecTwdClsDropT {
  root: string;
  arrow: string;
  wrapContent: string;
}

export class DropStaticTwdCss {
  public static byState(isOpen: boolean): RecTwdClsDropT {
    return {
      root: isOpen ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-300',
      arrow: isOpen ? 'rotate-180' : 'rotate-0',
      wrapContent: isOpen
        ? 'opacity-1 translate-y-0 mt-6'
        : 'opacity-0 translate-y-[-15px] pointer-events-none mt-0',
    };
  }
}
