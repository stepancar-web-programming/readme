# Скрипт для автоматической предпроверки PR студентов

Скрипт использует библиотеку octonode (https://github.com/pksunkara/octonode). 
Устанавливается через `npm i`.

Для работы также требуется список студентов `students.json`, включённый в `autoInviteStudents` или дополнительная конфигурация и создания альтернативного списка. Основная задача списка - проверка принадлежит создатель PR к числу студентов.

Валидации разделены, как независимые части кода и подразумевают возможность добавления новых или интеграцию с существующими.

* [validateReadme.js](https://github.com/stepancar-web-programming/readme/blob/33b330fb468ea32a6a1443f5768c1923ec88e2f9/scripts/src/autoPreCheck/checks/validateReadme.js) - валидация README проверяет наличие ссылки на демо портфолио
* [validatePR.js](https://github.com/stepancar-web-programming/readme/blob/33b330fb468ea32a6a1443f5768c1923ec88e2f9/scripts/src/autoPreCheck/checks/validatePR.js) - валидация PR проверяет корректно ли создан PR из нужной ветки в нужную, создан ли он вообще
* [validatePackage_json.js](https://github.com/stepancar-web-programming/readme/blob/63f3683de77a60e93da0cd8b12693dc27086a889/scripts/src/autoPreCheck/checks/validatePackage_json.js)- валидация package.json проверяет наличие ссылки на демо портфолио

Для работы надо задать следующие константы:
* В переменных окружений OAUTHKEY = токен Гитхаба;
* PATHSTUDENTS = путь к списку студентов; Стоит совместить с уже существующими скриптами, возможно вызывать последовательно. Нет причин дублировать списки.
* REPOOWNER = владелец репозитория;
* REPONAME = название репозитория;


* SOURCE_BRANCH = "из нужной ветки";
* TARGET_BRANCH = "в нужную ветку";
