package server.paperwork;

import java.util.regex.Pattern;
import server.decorators.flow.ErrAPI;

public final class Reg {
        public static final String CITY = "^[\\p{L}\\s'\\-]+$";
        public static final String NAME = "^[\\p{L}\\s,`'\\-]*$";
        public static final String TXT = "^[\\p{L}\\d\\s\\-'\\\".,;!?]*$";
        public static final String EMOJI = "^\\s*?(\\p{So})";
        public static final String INT = "^\\d+$";
        public static final String FLOAT = "^(?:\\d+(?:\\.\\d{1,2})?|\\.\\d{1,2})$";
        public static final String UUID = "^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$";

        public Reg() {
                throw new ErrAPI("Keep Reg class as static helper");
        }

        private static boolean checkReg(String arg, String reg) {
                return arg != null && Pattern.matches(reg, arg);
        }

        public static boolean isName(String arg) {
                return checkReg(arg, NAME);
        }

        public static boolean isTxt(String arg) {
                return checkReg(arg, TXT);
        }

        public static boolean isInt(String arg) {
                return checkReg(arg, INT);
        }

        public static boolean isFloat(String arg) {
                return checkReg(arg, FLOAT);
        }

        public static boolean isUUID(String arg) {
                return checkReg(arg, UUID);
        }

        public static boolean isFirstCharEmoji(String arg) {
                Pattern p = Pattern.compile(EMOJI, Pattern.UNICODE_CHARACTER_CLASS);
                return p.matcher(arg).lookingAt();
        }

}
