-- ВНИМАНИЕ: Этот скрипт удалит таблицу bug_reports и все данные в ней!
-- Используйте только если нужно пересоздать таблицу

-- Удаляем таблицу
DROP TABLE IF EXISTS bug_reports CASCADE;

-- Создаем заново с правильными foreign keys
CREATE TABLE bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('bug', 'suggestion')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  admin_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  closed_by UUID REFERENCES users(id)
);

-- Create index for faster queries
CREATE INDEX idx_bug_reports_user_id ON bug_reports(user_id);
CREATE INDEX idx_bug_reports_status ON bug_reports(status);
CREATE INDEX idx_bug_reports_type ON bug_reports(type);
CREATE INDEX idx_bug_reports_created_at ON bug_reports(created_at DESC);

-- Enable RLS
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own reports
CREATE POLICY "Users can view own bug reports"
  ON bug_reports
  FOR SELECT
  USING (user_id = (SELECT id FROM users WHERE id = auth.uid()));

-- Policy: Users can create bug reports
CREATE POLICY "Users can create bug reports"
  ON bug_reports
  FOR INSERT
  WITH CHECK (user_id = (SELECT id FROM users WHERE id = auth.uid()));

-- Policy: Super admins and leadership can view all reports
CREATE POLICY "Leadership can view all bug reports"
  ON bug_reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('super-admin', 'root', 'gs-gibdd', 'gs-guvd', 'pgs-gibdd', 'pgs-guvd')
    )
  );

-- Policy: Super admins can update all reports
CREATE POLICY "Super admins can update bug reports"
  ON bug_reports
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'super-admin'
    )
  );

-- Policy: Super admins can delete reports
CREATE POLICY "Super admins can delete bug reports"
  ON bug_reports
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'super-admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_bug_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_bug_reports_updated_at
  BEFORE UPDATE ON bug_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_bug_reports_updated_at();
