// var https://learn.javascript.ru/var
var firstInput = document.querySelectorAll('input')[0]
// https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll
var secondInput = document.querySelectorAll('input')[1]
// https://developer.mozilla.org/ru/docs/Web/API/Document/querySelector
var result = document.querySelector('#result')
var button = document.querySelector('button')


// устанавливаем обработчик события change
firstInput.onchange = (e) => {
   debugger;
   // складываем строки и выводим в консоль
   console.log(firstInput.value + secondInput.value);
   // складываем числа и выводим в innerText элемента результата
   result.innerText = parseInt(firstInput.value) + parseInt(secondInput.value);
}

// устанавливаем обработчик события click
button.onclick = (e) => {
    // предотвращаем отправку формы
    // https://developer.mozilla.org/ru/docs/Web/API/Event/preventDefault
    e.preventDefault();
    result.innerText = parseInt(firstInput.value) + parseInt(secondInput.value);
}
