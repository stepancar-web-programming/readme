require('dotenv').config();
const { Octokit } = require("@octokit/core");

const students = [
    'Acharya Nikesh',
    'Bondar Artem Igorevich',
    'Gindulina Dinara Rafisovna',
    'Golovanova Daria Vladimirovna',
    'Demidova Alina Alexandrovna',
    'Dudov Daniil Grigorievich',
    'Zaitsev Danil Dmitrievich',
    'Ivanov Artem Evgenievich',
    'Klimakova Taisiya Fedorovna',
    'Le Ngoc Thien',
    'Markelova Maria Vladimirovna',
    'Markovich David Markovich',
    'Molikov Ilya Andreevich',
    'Nguyen Thi My Tu',
    'Perov Viktor Valerievich',
    'Plisyuk Elizaveta Olegovna',
    'Samorodov Dmitry Olegovich',
    'Semkiv Alena Olegovna',
    'Sypacheva Anastasia Andreevna',
    'Chin Duc Thang',
    'Shpineva Polina Sergeevna',
    'Shcheglov Konstantin Mikhailovich',
    'Akhmetova Alina Faritovna',
    'Bazavlutsky Nikita Semenovich',
    'wu ming hieu',
    'Guo Zihan',
    'Do Duong Manh',
    'Kartashov Anton Alexandrovich',
    'Kravchenko Alexander Alexandrovich',
    'Loginov Alexander Romanovich',
    'Mezrin Ruslan Konstantinovich',
    'Nguyen Viet Nga',
    'Orekhov Semyon Dmitrievich',
    'Pestova Ksenia Alekseevna',
    'Platonov Artem Andreevich',
    'Safonova Arina Olegovna',
    'Suvorov Denis Vitalievich',
    'Tsvetkov Vyacheslav Andreevich',
    'Vladimir Shilonosov',
    'Kirpa Dmitry',
    'Kucher Maxim',
    'Kotet Ahmed Mahmoud',
]
const prefix = '2022-fall-lab-portfolio-'

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
})

async function create_repo(repo_name) {
    result = await octokit.request('POST /orgs/web-programming course led by stepancar/repos', {
        org: 'ORG',
        name: repo_name,
        description: 'This is your first repository',
        homepage: 'https://github.com',
        'private': false,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        auto_init: true
    })
}

async function main() {
    let len = students.length;
    for (let i =0; i < len; i++) {
        create_repo(prefix + students[i])
        //console.log(students[i])
    }
} 

main()