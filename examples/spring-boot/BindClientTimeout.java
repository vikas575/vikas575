//JAVA 17+
//DEPS org.springframework.boot:spring-boot:3.5.16

import java.time.Duration;
import java.util.Map;

import org.springframework.boot.context.properties.bind.BindException;
import org.springframework.boot.context.properties.bind.Binder;
import org.springframework.boot.context.properties.source.MapConfigurationPropertySource;

/**
 * Run with: jbang BindClientTimeout.java
 * Try the same property in application.properties: payments.client.timeout=750ms
 */
public class BindClientTimeout {
    private static final String KEY = "payments.client.timeout";
    private static final Duration DEFAULT_TIMEOUT = Duration.ofSeconds(2);

    static Duration readTimeout(Map<String, String> properties) {
        var source = new MapConfigurationPropertySource(properties);
        return new Binder(source).bind(KEY, Duration.class).orElse(DEFAULT_TIMEOUT);
    }

    public static void main(String[] args) {
        expect(Duration.ofMillis(750), readTimeout(Map.of(KEY, "750ms")));
        expect(Duration.ofSeconds(3), readTimeout(Map.of(KEY, "3s")));
        expect(DEFAULT_TIMEOUT, readTimeout(Map.of()));

        // The fallback applies only when the property is absent. A typo should surface.
        try {
            readTimeout(Map.of(KEY, "3fortnights"));
            throw new AssertionError("Expected invalid duration to fail binding");
        } catch (BindException expected) {
            System.out.println("Passed: milliseconds, seconds, missing property and invalid unit.");
        }
    }

    private static void expect(Duration expected, Duration actual) {
        if (!expected.equals(actual)) {
            throw new AssertionError("Expected " + expected + ", got " + actual);
        }
    }
}
