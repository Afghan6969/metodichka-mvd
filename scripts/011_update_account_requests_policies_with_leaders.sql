-- Обновление RLS политик для account_requests (добавлены лидеры)
-- Удаляем старые политики
DROP POLICY IF EXISTS "Leaders can view account requests" ON account_requests;
DROP POLICY IF EXISTS "Leaders can update account requests" ON account_requests;

-- Создаем новые политики с правильными ролями (включая лидеров)
-- Политика: только root, лидеры ПГС, ГС и лидеры могут просматривать запросы
CREATE POLICY "Leaders can view account requests"
ON account_requests
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd')
    AND users.status = 'active'
  )
);

-- Политика: только root, лидеры ПГС, ГС и лидеры могут обновлять запросы
CREATE POLICY "Leaders can update account requests"
ON account_requests
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd')
    AND users.status = 'active'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('root', 'pgs-gibdd', 'pgs-guvd', 'gs-gibdd', 'gs-guvd', 'leader-gibdd', 'leader-guvd')
    AND users.status = 'active'
  )
);
