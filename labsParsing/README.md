# Скрипт для проверки репозиториев студентов

Скрипт использует библиотеки selenium-webdriver (https://www.selenium.dev/selenium/docs/api/javascript/) и transliteration (https://www.npmjs.com/package/transliteration). Устанавливаются через `npm i`.
Для работы надо задать следующие константы:
* STUDENTSLISTFILENAME = путь к списку студентов (каждый студент в своей строке, скопировал с таблички

Через аргументы командной строки можно настроить размер окна браузера, в котором делается снимок сайта студента. Пример запуска: ```node giter.mjs width=1000 height=1000```.

Демо: 
<img src="https://github.com/KirpaDmitriy/parseJSHomeworks/blob/dev/demo.png">
