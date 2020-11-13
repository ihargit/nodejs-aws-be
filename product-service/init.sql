CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price INTEGER CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS stocks (
	id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
	product_id uuid references products(id) ON DELETE CASCADE ON UPDATE cascade UNIQUE,
    count INTEGER CHECK (count >= 0) DEFAULT 0
);

with rows as (
	insert into products(title, description, price)
values('Bear', 'Bear toy', 1) returning *
)
insert into stocks(count, product_id)
values(2, (select id from rows))
returning
	(select id from rows),
	(select title from rows),
	(select description from rows),
	(select price from rows),
	count;