import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

/**
 * Convert a local business date to bounds for a timestamp query.
 * Bind the bounds in SQL as: paid_at >= ? AND paid_at < ?
 * Run with Java 17 or later: java BusinessDayWindow.java
 */
public record BusinessDayWindow(Instant startInclusive, Instant endExclusive) {
    public static BusinessDayWindow forDate(LocalDate date, ZoneId zone) {
        Instant start = date.atStartOfDay(zone).toInstant();
        Instant end = date.plusDays(1).atStartOfDay(zone).toInstant();
        return new BusinessDayWindow(start, end);
    }

    public boolean contains(Instant timestamp) {
        return !timestamp.isBefore(startInclusive) && timestamp.isBefore(endExclusive);
    }

    public static void main(String[] args) {
        BusinessDayWindow pune = forDate(LocalDate.of(2026, 11, 25), ZoneId.of("Asia/Kolkata"));
        Instant start = Instant.parse("2026-11-24T18:30:00Z");
        Instant nextMidnight = Instant.parse("2026-11-25T18:30:00Z");
        if (pune.contains(start.minusNanos(1)) || !pune.contains(start)
                || !pune.contains(nextMidnight.minusNanos(1)) || pune.contains(nextMidnight)) {
            throw new AssertionError("A payment at midnight belongs to the new business day");
        }

        ZoneId newYork = ZoneId.of("America/New_York");
        BusinessDayWindow spring = forDate(LocalDate.of(2026, 3, 8), newYork);
        BusinessDayWindow autumn = forDate(LocalDate.of(2026, 11, 1), newYork);
        if (!Duration.between(spring.startInclusive(), spring.endExclusive()).equals(Duration.ofHours(23))
                || !Duration.between(autumn.startInclusive(), autumn.endExclusive()).equals(Duration.ofHours(25))) {
            throw new AssertionError("Use the next local midnight across a daylight-saving change");
        }
        System.out.println("Passed midnight boundaries and both daylight-saving transitions.");
    }
}
