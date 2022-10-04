const studentList = {
    "0": "Acharya Nikesh",
    "1": "Bondar Artem Igorevich",
    "2": "Gindullina Dinara Rafisovna",
    "3": "Golovanova Darya Vladimirovna",
    "4": "Demidova Alina Aleksandrovna",
    "5": "Dudov Daniil Grigorevich",
    "6": "Zaicev Danil Dmitrievich",
    "7": "Ivanov Artem Evgenevich",
    "8": "Klimakova Taisiya Fedorovna",
    "9": "Le Ngok Thien",
    "10": "Markelova Mariya Vladimirovna",
    "11": "Markovich David Markovich",
    "12": "Molikov Ilya Andreevich",
    "13": "Nguen Thi Mi Tu",
    "14": "Perov Viktor Valerevich",
    "15": "Plisuk Elizaveta Olegovna",
    "16": "Samorodov Dmitrii Olegovich",
    "17": "Semkiv Alena Olegovna",
    "18": "Sypacheva Anastasiya Andreevna",
    "19": "CHin Dyk Thang",
    "20": "SHpineva Polina Sergeevna",
    "21": "SHCHeglov Konstantin Mihailovich",
    "22": "Ahmetova Alina Faritovna",
    "23": "Bazavluckii Nikita Semenovich",
    "24": "Vu Min Hieu",
    "25": "Go Czyhan",
    "26": "Do Zyong Man",
    "27": "Kartashov Anton Aleksandrovich",
    "28": "Kravchenko Aleksandr Aleksandrovich",
    "29": "Loginov Aleksandr Romanovich",
    "30": "Mezrin Ruslan Konstantinovich",
    "31": "Nguen Vet Nga",
    "32": "Orehov Semen Dmitrievich",
    "33": "Pestova Kseniya Alekseevna",
    "34": "Platonov Artem Andreevich",
    "35": "Safonova Arina Olegovna",
    "36": "Suvorov Denis Vitalevich",
    "37": "Cvetkov Vyacheslav Andreevich",
    "38": "SHilonosov Vladimir Romanovich",
    "40": "Kirpa Dmitrii",
    "41": "Kucher Maksim",
    "42": "Kotet Ahmed Mahmud ",
    "length": 42
}
sessionStorage.setItem("0", String(studentList.length))
for (var i = 1; i <= studentList.length; i++) {
    sessionStorage.setItem(String(i), studentList[i])
}


var repositoryName = document.getElementsByName('repository[name]')
var repositoryVisibility = document.getElementsByName('repository[visibility]')
var button = document.getElementsByClassName('btn-primary btn')
const str = '2022-fall-lab-portfolio-' + sessionStorage.getItem(String(i))
repositoryName[0].value = str
repositoryVisibility[0].checked = true
button[0].disabled = false
button[0].submit
window.history.go(-1)
