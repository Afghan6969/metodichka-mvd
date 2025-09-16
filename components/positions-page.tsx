export function PositionsPage() {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Должности ГИБДД</h1>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-6">Руководящий состав:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Начальник ГИБДД</span>
                <span className="text-gray-700">[Нач ГИБДД] (Генерал)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Первый заместитель начальника ГИБДД</span>
                <span className="text-gray-700">[Пр Зам Нач] (Полковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель начальника, Начальник отдела кадров</span>
                <span className="text-gray-700">[Зам Нач От Кдр] (Полковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель начальника, по работе с личным составом</span>
                <span className="text-gray-700">[Зам Нач Рб ЛС] (Полковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель начальника ГИБДД, по вооружению</span>
                <span className="text-gray-700">[Зам Нач Врж] (Полковник)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-orange-600 mb-6">Старший состав:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Начальник Специализированного Батальона</span>
                <span className="text-gray-700">[Нач СБ] (Подполковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Начальник Отдельного Батальона</span>
                <span className="text-gray-700">[Нач ОБ] (Подполковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Начальник Учебного Батальона</span>
                <span className="text-gray-700">[Нач УБ] (Подполковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Начальник Мотобатальона</span>
                <span className="text-gray-700">[Нач МБ] (Подполковник)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель Начальника Специализированного Батальона</span>
                <span className="text-gray-700">[Зам Нач СБ] (Майор)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель Начальника Отдельного Батальона</span>
                <span className="text-gray-700">[Зам Нач ОБ] (Майор)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель Начальника Учебного Батальона</span>
                <span className="text-gray-700">[Зам Нач УБ] (Майор)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Заместитель Начальника Мотобатальона</span>
                <span className="text-gray-700">[Зам Нач МБ] (Майор)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">Специализированный Батальон:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Инспектор СБ</span>
                <span className="text-gray-700">[СБ] (Прапорщик и выше)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Отдельный Батальон:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Инспектор ОБ</span>
                <span className="text-gray-700">[ОБ] (Старшина и выше)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-purple-600 mb-6">Учебный Батальон:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Курсант УБ</span>
                <span className="text-gray-700">[УБ] (Рядовой и выше)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Мотобатальон:</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">Инспектор МБ</span>
                <span className="text-gray-700">[МБ] (Старший Лейтенант и выше)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Бинды для ГИБДД</h2>

            <div className="space-y-8">
              {/* Приветствие коллег */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-700 mb-4">🤝 Приветствие коллег</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400">
                    bind [клавиша] say Звание, ГИБДД по городу "Город", "Фамилия Имя.
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">Капитан, ГИБДД по городу "Лос-Сантос", "Иванов Иван."</p>
                  </div>
                </div>
              </div>

              {/* Предъявление удостоверения */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-700 mb-4">🆔 Предъявление служебного удостоверения</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400">
                    bind [клавиша] say Гражданин, предоставьте документ удостоверяющий вашу личность.
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      Гражданин, предоставьте документ удостоверяющий вашу личность.
                    </p>
                  </div>
                </div>
              </div>

              {/* Изучение документов */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-700 mb-4">📋 Изучение документов</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] me изучает документы</div>
                    <div>bind [клавиша] do Личность гражданина установлена.</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">* Капитан Иванов изучает документы</p>
                    <p className="text-purple-700 italic">* Личность гражданина установлена.</p>
                  </div>
                </div>
              </div>

              {/* Проверка через фото и КПК */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-700 mb-4">📱 Проверка через фото и КПК</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do Мини-фотоаппарат и КПК в кармане.</div>
                    <div>bind [клавиша] me достав фотоаппарат и КПК, сфотографировал человека</div>
                    <div>
                      bind [клавиша] up me открыл базу граждан на КПК, сверил сделанную фотографию с данными базы
                    </div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">* Мини-фотоаппарат и КПК в кармане.</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, достав фотоаппарат и КПК, сфотографировал человека
                    </p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов открыл базу граждан на КПК, сверил сделанную фотографию с данными базы
                    </p>
                  </div>
                </div>
              </div>

              {/* Задержание и наручники */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-700 mb-4">🔒 Задержание и наручники</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>
                      bind [клавиша] me отстегнув ремень безопасности, высадил задержанного и надел на него наручники
                    </div>
                    <div>bind [клавиша] chatbox cuff</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, отстегнув ремень безопасности, высадил задержанного и надел на него наручники
                    </p>
                    <p className="text-purple-700 italic">[Система]: Игрок был закован в наручники</p>
                  </div>
                </div>
              </div>

              {/* Протокол задержания */}
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-6 border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-700 mb-4">📝 Протокол задержания</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do В руке сотрудника папка с протоколами и ручкой.</div>
                    <div>bind [клавиша] me вытащил из папки бланк с ручкой и оформил протокол задержания</div>
                    <div>bind [клавиша] me протянул протокол и ручку задержанному</div>
                    <div>bind [клавиша] say подпись поставьте</div>
                    <div>bind [клавиша] n /me поставил подпись</div>
                    <div>bind [клавиша] me оторвал копию протокола и передал её гражданину</div>
                    <div>bind [клавиша] do Конвоир взял протокол задержания и увел задержанного в КПЗ.</div>
                    <div>bind [клавиша] chatbox arrest</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">* В руке сотрудника папка с протоколами и ручкой.</p>
                    <p className="text-purple-700 italic">Капитан Иванов говорит: подпись поставьте</p>
                    <p className="text-purple-700 italic">[Система]: Игрок был арестован</p>
                  </div>
                </div>
              </div>

              {/* Лишение водительского удостоверения */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-700 mb-4">🚫 Лишение водительского удостоверения</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do На поясе закреплён тактический планшет.</div>
                    <div>
                      bind [клавиша] me сняв тактический планшет с пояса, аннулировал водительское удостоверение
                    </div>
                    <div>bind [клавиша] chatbox takecarlic</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">* На поясе закреплён тактический планшет.</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, сняв тактический планшет с пояса, аннулировал водительское удостоверение
                    </p>
                    <p className="text-purple-700 italic">[Система]: Водительские права изъяты</p>
                  </div>
                </div>
              </div>

              {/* Проверка транспортных номеров */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-6 border-l-4 border-teal-500">
                <h3 className="text-xl font-bold text-teal-700 mb-4">🔍 Проверка транспортных номеров</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do На поясе закреплён тактический планшет.</div>
                    <div>bind [клавиша] me сняв тактический планшет с пояса, проверил номера по базе данных</div>
                    <div>bind [клавиша] chatbox findcar</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, сняв тактический планшет с пояса, проверил номера по базе данных
                    </p>
                    <p className="text-purple-700 italic">[Система]: Поиск автомобиля в базе данных...</p>
                  </div>
                </div>
              </div>

              {/* Розыск */}
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-6 border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-pink-700 mb-4">🚨 Розыск</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Список граждан в розыске:</h4>
                    <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                      <div>bind [клавиша] do На поясе закреплён тактический планшет.</div>
                      <div>
                        bind [клавиша] me сняв тактический планшет с пояса, открыл базу данных федерального розыска
                      </div>
                      <div>bind [клавиша] wanted</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Список автомобилей в розыске:</h4>
                    <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                      <div>bind [клавиша] do На поясе закреплён тактический планшет.</div>
                      <div>
                        bind [клавиша] me сняв тактический планшет с пояса, открыл базу данных автомобилей в розыске
                      </div>
                      <div>bind [клавиша] wcar</div>
                    </div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">[Система]: Список разыскиваемых лиц загружен</p>
                    <p className="text-purple-700 italic">[Система]: Список разыскиваемых автомобилей загружен</p>
                  </div>
                </div>
              </div>

              {/* Мегафон и требования */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border-l-4 border-gray-500">
                <h3 className="text-xl font-bold text-gray-700 mb-4">📢 Мегафон и требования</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do Мегафон закреплён на поясе.</div>
                    <div>bind [клавиша] me сняв мегафон с пояса, крикнул в него</div>
                    <div>bind [клавиша] m Останавливаемся! В противном случае будут применены силовые меры!</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">* Капитан Иванов, сняв мегафон с пояса, крикнул в него</p>
                    <p className="text-purple-700 italic">
                      [МЕГАФОН] Капитан Иванов: Останавливаемся! В противном случае будут применены силовые меры!
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                    <p className="text-amber-800 text-sm">
                      <strong>Примечание:</strong> Перед применением меры наказания сотрудник должен быть уверен, что
                      выдвинутое требование было верно воспринято именно тем лицом, к которому оно адресовывалось.
                    </p>
                  </div>
                </div>
              </div>

              {/* Проверка тонировки */}
              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-6 border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-700 mb-4">🔬 Проверка тонировки</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do Тауметр в кармане.</div>
                    <div>bind [клавиша] me достав тауметр из кармана, сделал замер светопропускаемости стекла</div>
                    <div className="text-yellow-400"># Если тонировка более 31%:</div>
                    <div>bind [клавиша] do Прибор показал, что уровень тонировки выше допустимого по ГОСТу.</div>
                    <div className="text-yellow-400"># Если тонировка в норме:</div>
                    <div>bind [клавиша] do Прибор показал, что светопропускаемость в норме.</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, достав тауметр из кармана, сделал замер светопропускаемости стекла
                    </p>
                    <p className="text-purple-700 italic">
                      * Прибор показал, что уровень тонировки выше допустимого по ГОСТу.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                    <p className="text-blue-800 text-sm">
                      <strong>Проверка:</strong> Уровень тонировки проверяется через клавишу "TAB"
                    </p>
                  </div>
                </div>
              </div>

              {/* Штраф */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-6 border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold text-emerald-700 mb-4">💰 Выписывание штрафа</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do КПК находится в кармане.</div>
                    <div>bind [клавиша] me достав КПК из кармана, включил его и открыл базу данных</div>
                    <div>bind [клавиша] up me введя данные гражданина, нажал на кнопку "Выписать штраф"</div>
                    <div>bind [клавиша] do На экране надпись "Штраф успешно выписан".</div>
                    <div>bind [клавиша] chatbox tsu</div>
                    <div>
                      bind [клавиша] me выслал СМС на номер телефона гражданина, копию протокола с подробной информацией
                    </div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, достав КПК из кармана, включил его и открыл базу данных
                    </p>
                    <p className="text-purple-700 italic">* На экране надпись "Штраф успешно выписан".</p>
                    <p className="text-purple-700 italic">[Система]: Штраф выписан игроку</p>
                  </div>
                </div>
              </div>

              {/* Разбитие стекла */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="text-xl font-bold text-red-700 mb-4">🔨 Разбитие стекла и извлечение</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do Дубинка на поясе.</div>
                    <div>bind [клавиша] me сняв дубинку с пояса ударил ею по стеклу и разбил его</div>
                    <div>bind [клавиша] up do Окно разбито.</div>
                    <div>bind [клавиша] me просунув руку в салон открыл центральный замок автомобиля</div>
                    <div>
                      bind [клавиша] me отстегнул ремень безопасности и вытащил преступника из автомобиля надев на него
                      наручники
                    </div>
                    <div>bind [клавиша] chatbox cuff</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов, сняв дубинку с пояса ударил ею по стеклу и разбил его
                    </p>
                    <p className="text-purple-700 italic">* Окно разбито.</p>
                    <p className="text-purple-700 italic">[Система]: Игрок был закован в наручники</p>
                  </div>
                </div>
              </div>

              {/* Оформление ДТП */}
              <div className="bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg p-6 border-l-4 border-violet-500">
                <h3 className="text-xl font-bold text-violet-700 mb-4">🚗 Оформление ДТП</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400 space-y-1">
                    <div>bind [клавиша] do На торпеде находится бланк с рулеткой.</div>
                    <div>bind [клавиша] me взяв бланк осмотра места ДТП и зарисовал схему ДТП</div>
                    <div>bind [клавиша] up do Бланк осмотра места ДТП с зафиксированной схемой ДТП в руках.</div>
                    <div>bind [клавиша] me сделал на схеме пометки и положил бланк на торпеду</div>
                    <div>bind [клавиша] me взяв на торпеде рулетку и сделал замеры</div>
                    <div>bind [клавиша] me нанес на схему значения, измеренные рулеткой, сделал выводы</div>
                    <div>bind [клавиша] me закончив заполнять схему ДТП, положил её на торпелу</div>
                  </div>
                  <div className="bg-purple-100 border border-purple-300 p-3 rounded">
                    <p className="text-purple-800 font-semibold mb-1">Пример в игре:</p>
                    <p className="text-purple-700 italic">
                      * Капитан Иванов взяв бланк осмотра места ДТП и зарисовал схему ДТП
                    </p>
                    <p className="text-purple-700 italic">
                      * Бланк осмотра места ДТП с зафиксированной схемой ДТП в руках.
                    </p>
                  </div>
                </div>
              </div>

              {/* Дополнительные команды */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 border-l-4 border-slate-500">
                <h3 className="text-xl font-bold text-slate-700 mb-4">⚡ Дополнительные команды</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-600 mb-2">Проверка штрафов:</h4>
                    <div className="bg-gray-800 p-2 rounded font-mono text-xs text-green-400">
                      bind [клавиша] chatbox skan
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 mb-2">Передача данных по нарушителю:</h4>
                    <div className="bg-gray-800 p-2 rounded font-mono text-xs text-green-400">
                      bind [клавиша] chatbox su
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 mb-2">Причина остановки №1:</h4>
                    <div className="bg-gray-800 p-2 rounded font-mono text-xs text-green-400">
                      bind [клавиша] say Остановлены за нарушение законодательства.
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-600 mb-2">Причина остановки №2:</h4>
                    <div className="bg-gray-800 p-2 rounded font-mono text-xs text-green-400">
                      bind [клавиша] say Остановлены по подозрению на нарушение законодательства.
                    </div>
                  </div>
                </div>
              </div>

              {/* Важные примечания */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-yellow-800 mb-4">⚠️ Важные примечания по использованию биндов:</h4>
                <ul className="space-y-2 text-yellow-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <strong>Клавиши "up":</strong> Клавиши где присутствуют "up", нужно зажимать на 1-2 секунды, после
                      того как отпустите - сработает отыгровка "up".
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <strong>Интервал:</strong> Интервал между биндами - не менее двух секунд.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <strong>Посадка задержанного:</strong> При активном конвоировании (/arr), либо же после отыгровки
                      сесть в автомобиль и прописать /putpl id
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>
                      <strong>Замена клавиш:</strong> Вместо [клавиша] подставьте нужную вам клавишу (например: F1, F2,
                      NUM1, и т.д.)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Разработано{" "}
            <a
              href="https://vk.com/id503251431"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Poseidon_Wagner
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
