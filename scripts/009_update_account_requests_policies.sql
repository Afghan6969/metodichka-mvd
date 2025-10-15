-- Обновление RLS политик для account_requests
-- Удаляем старые политики
DROP POLICY IF EXISTS "Leaders can view account requests" ON account_requests;
DROP POLICY IF EXISTS "Leaders can update account requests" ON account_requests;

-- Создаем новые политики с правильными ролями (включая лидеров и СС)
-- Политика: только root, лидеры ПГС, ГС, лидеры и СС могут просматривать запросы
CREATE POLICY "Leaders can view account requests"
ON account_requests
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('super-admin', 'root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd', 'ss-gibdd', 'ss-guvd')
    AND users.status = 'active'
  )
);

-- Политика: только root, лидеры ПГС, ГС, лидеры и СС могут обновлять запросы
CREATE POLICY "Leaders can update account requests"
ON account_requests
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('super-admin', 'root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd', 'ss-gibdd', 'ss-guvd')
    AND users.status = 'active'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('super-admin', 'root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd', 'ss-gibdd', 'ss-guvd')
    AND users.status = 'active'
  )
);
