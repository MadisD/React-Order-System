INSERT INTO clients (security_nr,first_name, last_name, phone_nr, country, address) VALUES
(31209114578, 'Casey','Gerry', 8122468, 'Estonia', 'Home1'),
(31209114579, 'Aquila','Casey', 8796565, 'Estonia', 'Home2'),
(31209114580, 'Kirabo','Jess', 5932695, 'Russia', 'Home3'),
(31209114581, 'Dana','Sidney', 1872917, 'Germany', 'Home4'),
(31209114582, 'Farah','Bala', 9009669, 'Poland', 'Home5'),
(31209114580, 'Dubaku','Shui', 9619918, 'United States', 'Home6');

INSERT INTO products (name, barcode, price, description, release_date) VALUES
  ('product1', 1000, 50.99, 'superb product', CURRENT_TIMESTAMP()),
  ('product2', 1111, 100, 'okay product', CURRENT_TIMESTAMP()),
  ('product3', 2222, 99.00, 'product', CURRENT_TIMESTAMP()),
  ('product4', 3333, 78.99, 'superb', CURRENT_TIMESTAMP()),
  ('product5', 5555, 30.5, '', CURRENT_TIMESTAMP()),
  ('product6', 6666, 200, 'out now', CURRENT_TIMESTAMP()),
  ('product7', 7777, 44.44, 'cheap', CURRENT_TIMESTAMP()),
  ('product8', 8888, 90.80, 'super price', CURRENT_TIMESTAMP());

INSERT INTO orders (product_price, transaction_date, client_id, product_id) values (111, CURRENT_TIMESTAMP(), 1, 1);