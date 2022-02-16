CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE homes (
  property_id TEXT PRIMARY KEY,
  status_code TEXT NOT NULL
);

CREATE TABLE users_homes (
  id SERIAL,
  user_username VARCHAR(25) NOT NULL,
  home_property_id TEXT NOT NULL,
  FOREIGN KEY (user_username) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (home_property_id) REFERENCES homes(property_id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);