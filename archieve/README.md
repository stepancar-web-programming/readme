## лекция 08-09
На первой лекции мы познакомились, обсудили что такое клиент-серверная архитектура,
освежили знания о том что такое браузер, поговорили о том как javascript взаимодействует с элементами на странице.



Посмотрели:
* как обращаться к элементам на странице из javascript
* как устанавливать аттрибуты элементов
* как устанавливать обработчики событий
* как писать в консоль
* ключевое слово "debugger"

Как пример, мы использовали простую задачу:
Реализовать калькулятор поддерживающий 2 поля ввода и операцию сложить, вывести результат в отдельный элемент.

Ремарка, код приведенный на лекции не является продакшн рэди,
в нем используются устаревшие конктрукции, антипаттерны.
Рассматривайте его как ознакомительный.


Что можно смотреть:
https://www.youtube.com/c/ITKAMASUTRA/playlists
https://cs50.harvard.edu/web/2020/


Что нужно сделать:
Написать калькулятор с одним инпутом и 4 операции, вывод в тот же инпут.
На семинаре мы посмотрим на код и подумаем как его улучшить

Потыкать chrome web tools. Нужно разобраться какие есть вкладки, для чего нужны. На лекции немного показывал

Объединиться в группы, подумать о проекте который будет разрабатывать группа

## практика 18-09

Поделились на команды по проектам 3-5 человек
Обсудили технические требования к проекту:

### Server: nodejs
* предоставляет rest интерфейс для получения, сохранения, обновления сущности
* в качестве хранения данных можно использовать любую базу данных или файл
* server должен иметь как минимум один endpoint для загрузки файла и выгрузки

Будет плюсом: websocket использование protobuf, thrift протоколов, собственная авторизация, интеграция с внешними API

### Client: javascript/typescript
* можно использовать любой популярный framework angular, react, vue
* как statemanagement можно использовать любой фреймворк: redux, mobx, effector
* для css можно использовать любые технологии less, sass, css-modules etc.
* cборка проекта: рекомендуется использовать webpack
* проект должен иметь:линтинг js/css кода по стандартам airbnv или lint-standard или другим
* юнит тесты на jest покрытие 80%
* e2e тесты на cypress покрытие 50%
* необходимо использовать внешние библиотеки компонентов
* необходимо подключение любой аналитики в проект: Гугл аналитика

Будет плюсом: интеграция с внешними API, наличие скриншот тестов, наличие кастомных анимаций в интерфейсе, настроенный pipeline прогона тестов на GitHub

Делали ревью калькуляторов. Общие проблемы:
1) let, const, var
2) переменные доступны глобально
3) использование eval
4) использовали snake_case
5) копипаста обработчиков событий

## лекция 02-10

[Презентация](./02-10/presentation.pdf)

Логинов Иван читал лекцию про сети
Рекомендуется так же https://www.youtube.com/watch?v=rLUzYeLdM0k как овервью технологий о которых говорилось на лекции
На практической части мы успели поговорить подробнее об http на примере сервиса https://jsonplaceholder.typicode.com/
Мы использовали https://www.postman.com/ для совершения запросов
Смотрели на https://ru.wikipedia.org/wiki/WebSocket на примере telegram

## лекция 09-10

Денис Липин рассказывал про дизайн

Следить за трендами, искать UI референсы, вдохновляться


https://www.behance.net/ - самая популярная диз соц сеть/репозиторий для портфолио. Полноценные кейсы. 50/50 реальных работ и дизайна ради красивой картинки
https://dribbble.com/ - 99% фейковых работ, не полноценные кейсы а только шоты те 1 экран
https://www.awwwards.com/ - мировой рейтинг уникальных сайтов, все работы реальные, можно покликать, посмотреть код итд.
https://muz.li/ - плагин для хрома, на поисковой странице будут топовые работы, актуально если много времени на просмотр ссылок выше тратить не готовы, но тем не менее хотите хоть чутка быть в курсе трендов


Дизайн-системы

https://adele.uxpin.com/ - сборник целой кучи открытых дизайн систем, будет актуально если задумаетесь над поведением какого-нибудь не самого распространенного компонента. Например какой-нибудь хитрый мультиселект совмещенный с поиском или тост.

https://material.io/design - ДС гугла, если долго копать нет времени, там можно найти ответы почти на все вопросы связанные с поведением компонентов и их UI. Очень авторитетная, не ошибетесь, если подсмотрите решения там.

Еще пара авторитетных дизайн-систем

https://www.carbondesignsystem.com/ - от IBM
https://guides.kontur.ru/ - Контур
https://www.microsoft.com/design/fluent/#/windows - майкрософт 


Figma

Гайд по интерфейсу фигмы (плейлист из 3х уроков по 20мин) 

Если подача не зайдет, можно любой гайд на ютубе смотреть по запросам “Фигма для начинающих” или подобных, они все примерно одинаковые

Отедльный урок по автолейауту

Мини статья про сетку в фигме

Как пользоваться сеткой дизайнеру



Супер простые для восприятия книги:

* Роберт Фитцпатрик, “Спроси маму”. Про касдев, какие вопросы и кому задавать, чтобы понять, что твой продукт нужен пользователю.

* Стив Круг, “Не заставляйте меня думать”. Простая книга для начинающего дизайнера.

Ильяхов, “Пиши, сокращай” Все что автор говорит про текст так же актуально и для интерфейсов.

НЕ рекомендую начинать знакомится с дизайном по академическим книгам. Про теорию цвета, формы, типографику. Да, дизайнер должен это знать, но все эти книги невероятно скучные, отобьют желание. Можно ограничится статейками на эти темы


## лекция 11-10 взамен лекции 25-09

package.json:
   dependencies/ devDependencies
   scripts
Подробнее тут
https://docs.npmjs.com/cli/v7/configuring-npm/package-json
Секцию про зависимости нужно подробно изучить

Говорили про пакетные менеджеры
https://www.npmjs.com/package/npm
https://www.npmjs.com/package/yarn
(забавно что пакетные менеджеры тоже являются пакетами)
Однажды я искал архиватор чтобы разархивировать файл и скачал архиватор который был внутри архива.

Запускали проекты ребят.
Поработали с nodejs на примере реализации автоматического апдейта странички при изменении исходников.
[Про nodejs слушать тут](https://www.youtube.com/watch?v=ztspvPYybIY)
Использовали на клиенте fetch чтобы отправить http запрос
Тут упомянули что есть такая штука как https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise
Использовали подход https://learn.javascript.ru/long-polling
на nodejs использовали fs для чтения файлов и слежения за изменениями
модуль http использовали чтобы зарегистрировать сервер
[Код лежит тут](https://github.com/stepancar-web-programming/auto-page-reload)


## практика 16.10

Проводили ретро.
создали приложение с помощью https://ru.reactjs.org/docs/create-a-new-react-app.html
Отобразили список тортиков
[Пример разворачивания проекта](https://www.youtube.com/watch?v=Dsgegf15ccA)

## лекция 23.10

[Презентация](./23-10/presentation.pdf)

Разговаривали о UI библиотеках
Императивное/Декларативное программирование
Шаблоны
Примеры шаблонов разных библиотек на примере knockoutjs, angularjs, angular, react
Задачи ui библиотек
Внутринние оптимизации UI библиотек
dirty checking
monkey patching
Компонентный подход
Работа с UI библиотекой на примере react

## практика 30.10

Говорили о тестировании

Был план - обсуждать только инструменты но выяснелось что ребята никогда не видели unit тесты, поэтому пришлось кратко рассказать.

1) ручное тестирование
2) примеры unit тестирования c jest
3) мок функция
4) пример e2e тестирования с помощью cypress


## практик 13.11
Рубежный контроль

## лекция 20.11

Разговаривали о statemanagement в web приложениях
Обсуждали как хранить данные которые нужно переиспользовать данные в нескольких компонентах.
Обсуждали поток данных на примере flux


## 4.12 Ребята показывали проекты
