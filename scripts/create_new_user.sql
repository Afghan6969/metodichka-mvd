-- Создание нового пользователя в таблице users
-- Замените значения в кавычках на нужные

INSERT INTO users (
    username,
    password,
    nickname,
    role,
    status,
    created_at
) VALUES (
    'new_username',     -- Логин пользователя (должен быть уникальным)
    'hashed_password',  -- Хэшированный пароль (используйте bcrypt или другой хэш)
    'Новое Имя',       -- Отображаемое имя пользователя
    'none',            -- Роль: root, gs-gibdd, pgs-gibdd, leader-gibdd, gs-guvd, pgs-guvd, leader-guvd, ss-gibdd, ss-guvd, gibdd, guvd, none
    'active',          -- Статус: active или deactivated
    NOW()              -- Текущая дата и время
);

-- Пример создания пользователя root (если его нет)
-- Убедитесь что пароль захэширован правильно
INSERT INTO users (username, password, nickname, role, status, created_at)
SELECT 'root', '$2b$10$example.hashed.password', 'Владелец', 'root', 'active', NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'root');

-- Пример создания обычного пользователя
INSERT INTO users (username, password, nickname, role, status, created_at)
VALUES (
    'testuser',
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- пароль: "password"
    'Тестовый Пользователь',
    'gibdd',
    'active',
    NOW()
);
