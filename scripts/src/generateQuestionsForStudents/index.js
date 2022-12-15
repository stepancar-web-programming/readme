import { jsPDF } from "jspdf"
import { cyrillicFont } from './cyrillicFont.mjs';
import { firstGroup, secondGroup } from './questions.mjs';

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

function getQuestionsWithPoints(number, questions) {
    return questions.filter(q => q.points === number);
}

// const questionsForStudents = students.map((studentName) => ({
//     studentName,
//     title: 'Рубежная работа №1 20.10.2022',
//     questions: [
//         ...getRandomQuestions(3, getQuestionsWithPoints(2, firstGroup)),
//         ...getRandomQuestions(1, getQuestionsWithPoints(1, firstGroup)),
//         ...getRandomQuestions(1, getQuestionsWithPoints(3, firstGroup)),
//     ]
// }));

const questionsForStudents = students.map((studentName) => ({
    studentName,
    title: 'Рубежная работа №2 15.12.2022',
    questions: [
        ...getRandomQuestions(2, getQuestionsWithPoints(3, secondGroup)),
        ...getRandomQuestions(1, getQuestionsWithPoints(4, secondGroup)),
    ]
}));


const pdfDocument = new jsPDF()

pdfDocument.addFileToVFS('Cyrillic.ttf', cyrillicFont);
pdfDocument.addFont('Cyrillic.ttf', 'Cyrillic', 'normal');
pdfDocument.setFont('Cyrillic');
pdfDocument.setFontSize(12);

questionsForStudents.forEach(item => {
    const text = `${item.title} \n
    ${item.studentName} \n
    Вопросы: \n${item.questions.map((q, i) => `${i + 1}) ${q.text}`).join('\n')}`
 
    pdfDocument.text(text, 10, 10)
    pdfDocument.addPage()
});

pdfDocument.save('rubesh.pdf')

