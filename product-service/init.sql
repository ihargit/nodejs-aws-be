CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS stocks (
	id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	product_id uuid references products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    count INTEGER DEFAULT 0
);

CREATE OR REPLACE FUNCTION init_stocks()
	RETURNS trigger
	LANGUAGE PLPGSQL
    AS 
	$$
	BEGIN
		INSERT INTO stocks(product_id)
		VALUES(NEW.id);
		RETURN NEW;
	END;
	$$;

DROP TRIGGER IF EXISTS init_stocks ON products;

-- insert row to 'stocks' table after row is inserted to 'products' table
CREATE TRIGGER init_stocks
  AFTER INSERT
  ON products
  FOR EACH ROW
  EXECUTE FUNCTION init_stocks();

-- populate 'products' and (by triggering 'init_stocks' function) 'stocks' tables
INSERT INTO products(title, description, price)
VALUES('Bunny', 'Bunny toy', 1);

INSERT INTO products(title, description, price)
VALUES('Bear', 'Bear toy', 2);

INSERT INTO products(title, description, price)
VALUES('Wolf', 'Wolf toy', 3);

-- set random 'count' to 'stocks' (1 > count < 11)
UPDATE stocks SET count=floor(random() * 10 + 1)::int
