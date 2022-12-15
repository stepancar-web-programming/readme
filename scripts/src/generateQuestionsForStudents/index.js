import { jsPDF } from "jspdf"
import { cyrillicFont } from './cyrillicFont.mjs';


const simpleQuestions = `как создать переменную в javascript? отличия let const var.
что такое IIFE в javascript. Привести пример использования
что такое DOM?
как найти DOM element в javascript
как подключить javascript на страницу. Приведите пример как минимум 2х разных способов.
Напишите несколько примеров различных типов css селекторов. (от 3х)
как можно добавить обработчик события элементу?
для чего нужно ключевое слово debugger.
для чего нужен console.log
для чего нужны метод stopPropagation? привести пример
для чего нужен метод preventDefault? привести пример
что такое http? назначение, из чего состоит httpRequest и httpResponse
как можно передать данные на сервер с помощью http. приведите несколько примеров
опишите разные типы статус кодов в http и их назначение
что такое uri? опишите схему uri
приведите пример кода выполнения http запроса из javascript и обработки ответа
что такое npm и для чего он нужен?
что такое semVer? приведите примеры разных описаний версий и что они значат
расскажите о разнице dependencies, devDependencies, optionalDependencies с примерами
для чего нужен файл package.json? опишите его примерную структуру
что такое nodejs, его назначение, преимущества, недостатки?`.split('\n')

const otherQuestions = `что такое longpolling, как он работает?
что такое websocket как он работает?`.split('\n')

const students = `Ачарья Никеш
Бондарь Артем Игоревич
Гиндуллина Динара Рафисовна
Голованова Дарья Владимировна
Демидова Алина Александровна
Дудов Даниил Григорьевич
Зайцев Данил Дмитриевич
Иванов Артем Евгеньевич
Климакова Таисия Федоровна
Ле Нгок Тхиен
Маркелова Мария Владимировна
Маркович Давид Маркович
Моликов Илья Андреевич
Нгуен Тхи Ми Ту
Перов Виктор Валерьевич
Плисюк Елизавета Олеговна
Самородов Дмитрий Олегович
Семкив Алёна Олеговна
Сыпачева Анастасия Андреевна
Чинь Дык Тханг
Шпинева Полина Сергеевна
Щеглов Константин Михайлович
Ахметова Алина Фаритовна
Базавлуцкий Никита Семенович
Ву Минь Хиеу
Го Цзыхань
До Зыонг Мань
Карташов Антон Александрович
Кравченко Александр Александрович
Логинов Александр Романович
Мезрин Руслан Константинович
Нгуен Вьет Нга
Орехов Семен Дмитриевич
Пестова Ксения Алексеевна
Платонов Артем Андреевич
Сафонова Арина Олеговна
Суворов Денис Витальевич
Цветков Вячеслав Андреевич
Шилоносов Владимир Романович
Кирпа Дмитрий
Кучер Максим
Котет Ахмед Махмуд`.split('\n')

function getRandomQuestions(number, questions) {
    const randomQuestions = new Set()

    while (randomQuestions.size < number) {
        randomQuestions.add(questions[Math.floor(Math.random() * questions.length)])
    }

    return [...randomQuestions]
}

const res = students.map((studentName) => ({
    studentName,
    questions: [...getRandomQuestions(4, simpleQuestions), ...getRandomQuestions(1, otherQuestions)]
}));

const pdfDocument = new jsPDF()

pdfDocument.addFileToVFS('Cyrillic.ttf', cyrillicFont);
pdfDocument.addFont('Cyrillic.ttf', 'Cyrillic', 'normal');
pdfDocument.setFont('Cyrillic')
pdfDocument.setFontSize(12)

res.forEach(item => {
    const text = `Рубежная работа №1 20.10.2022 \n
    ${item.studentName} \n
    Вопросы: \n${item.questions.map((q, i) => `${i + 1}) ${q}`).join('\n')}`
 
    pdfDocument.text(text, 10, 10)
    pdfDocument.addPage()
})

pdfDocument.save('rubesh.pdf')

