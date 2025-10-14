-- ШАБЛОН СОЗДАНИЯ ПОЛЬЗОВАТЕЛЯ (ИСПРАВЛЕННЫЙ)
-- Скопируйте в SQL Editor и замените значения

DO $$
DECLARE
    pwd_hash TEXT;
    user_check INT;
BEGIN
    -- Хэшируем пароль
    pwd_hash := crypt('ВАШ_ПАРОЛЬ', gen_salt('bf', 10));

    -- Проверяем существование
    SELECT COUNT(*) INTO user_check FROM users WHERE username = 'ВАШ_ЛОГИН';

    IF user_check > 0 THEN
        RAISE NOTICE 'Пользователь "%" уже существует!', 'ВАШ_ЛОГИН';
    ELSE
        -- Создаем пользователя (используем password_hash вместо password)
        INSERT INTO users (username, password_hash, nickname, role, status, created_at)
        VALUES ('ВАШ_ЛОГИН', pwd_hash, 'ВАШЕ_ИМЯ', 'ВАША_РОЛЬ', 'active', NOW());

        RAISE NOTICE '✅ Пользователь "%" создан!', 'ВАШ_ЛОГИН';
        RAISE NOTICE 'Логин: % | Пароль: %', 'ВАШ_ЛОГИН', 'ВАШ_ПАРОЛЬ';
    END IF;
END $$;

-- РОЛИ: root, gs-gibdd, pgs-gibdd, leader-gibdd, gs-guvd, pgs-guvd, leader-guvd, ss-gibdd, ss-guvd, gibdd, guvd, none

-- ПРИМЕР:
/*
DO $$
DECLARE pwd_hash TEXT; user_check INT;
BEGIN
    pwd_hash := crypt('MyPassword123', gen_salt('bf', 10));
    SELECT COUNT(*) INTO user_check FROM users WHERE username = 'danil_fartuna';
    IF user_check > 0 THEN
        RAISE NOTICE 'Пользователь "%" уже существует!', 'danil_fartuna';
    ELSE
        INSERT INTO users (username, password_hash, nickname, role, status, created_at)
        VALUES ('danil_fartuna', pwd_hash, 'Данил Фортуна', 'gibdd', 'active', NOW());
        RAISE NOTICE '✅ Пользователь "%" создан!', 'danil_fartuna';
        RAISE NOTICE 'Логин: % | Пароль: %', 'danil_fartuna', 'MyPassword123';
    END IF;
END $$;
*/
