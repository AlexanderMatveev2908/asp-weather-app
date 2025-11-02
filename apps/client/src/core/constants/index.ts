export class ConstantsApp {
  // ! when checking if a user is logged or not on a certain page
  // ! there may be cases where it is already pushed out or logging in
  // ! so u do not want to repeat a certain event but give it margin of action
  // eslint-disable-next-line no-magic-numbers
  public static readonly TIMER_RESET_WINDOW: number = 2 * 1000;
}
