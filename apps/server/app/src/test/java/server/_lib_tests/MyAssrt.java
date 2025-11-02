package server._lib_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.stream.Stream;

import server.lib.data_structure.ShapeCheck;

public class MyAssrt {

    public static void base(ResT res, int status, String msg) {
        assertEquals(status, res.getStatus());

        if (Stream.of(msg, res.getMsg()).allMatch(ShapeCheck::isStr))
            assertTrue(res.getMsg().toLowerCase().contains(msg.toLowerCase()));

    }

    public static void base(ResT res, int status) {
        base(res, status, null);
    }

}
