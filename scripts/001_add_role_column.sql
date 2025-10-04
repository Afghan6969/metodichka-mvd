-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'none';

-- Update existing users to have 'none' role if they don't have one
UPDATE users SET role = 'none' WHERE role IS NULL;

-- Using DO block instead of ON CONFLICT to avoid constraint issues
DO $$
BEGIN
  -- Check if root user exists
  IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'root') THEN
    -- Create root user if it doesn't exist
    INSERT INTO users (username, password, nickname, role, created_at)
    VALUES ('root', 'root', 'Владелец', 'root', NOW());
  ELSE
    -- Update existing root user to have root role
    UPDATE users SET role = 'root', nickname = 'Владелец' WHERE username = 'root';
  END IF;
END $$;

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
