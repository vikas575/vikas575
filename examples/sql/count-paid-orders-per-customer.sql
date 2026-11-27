-- Count paid orders for every customer, including customers with zero paid orders.
-- Run this read-only example in SQLite or PostgreSQL.
WITH customers (customer_id, name) AS (
    VALUES (1, 'Asha'), (2, 'Bilal'), (3, 'Chitra')
),
orders (order_id, customer_id, status) AS (
    VALUES
        (101, 1, 'paid'),
        (102, 1, 'pending'),
        (103, 1, 'paid'),
        (104, 2, 'pending')
)
SELECT
    c.customer_id,
    c.name,
    COUNT(o.order_id) AS paid_orders
FROM customers AS c
LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id
    AND o.status = 'paid'
GROUP BY c.customer_id, c.name
ORDER BY c.customer_id;

-- Expected counts: Asha 2, Bilal 0, Chitra 0.
-- Filtering in ON keeps Bilal (only pending orders) and Chitra (no orders).
-- For an unmatched customer, o.order_id is NULL, so COUNT(o.order_id) returns 0.
