
CREATE TABLE IF NOT EXISTS students(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INTEGER CHECK (age > 0),
      created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO students (first_name, last_name, email, age) VALUES ('John', 'Doe', 'john.doe@example.com', 20)
ON CONFLICT (email) DO NOTHING;

INSERT INTO students (first_name, last_name, email, age) VALUES ('Jane', 'Smith', 'jane.smith@example.com', 22)
ON CONFLICT (email) DO NOTHING;

INSERT INTO students (first_name, last_name, email, age) VALUES ('Alice', 'Johnson', 'alice.johnson@example.com', 25)
ON CONFLICT (email) DO NOTHING;