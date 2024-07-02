const octonode = require('octonode');
const fs = require('fs/promises');
const validatePR = require('.checks/validatePR');
const validateReadme = require('.checks/validateReadme');
const validatePackagejson = require('.checks/validatePackagejson');

const OAUTHKEY = process.env.OAUTHKEY;
const PATHSTUDENTS = 'scripts/src/autoInviteStudents/students.json'; //Предполагается разместить в корне репозитория 'students.json'

const SOURCE_BRANCH = "из нужной ветки";
const TARGET_BRANCH = "в нужную ветку";
const ORGANIZATIONNAME = "CoolOrgName";
const REPONAME = "CoolRepoNameOfCoolOrgName";


async function validateLab() {
    try {
        const client = octonode.client(OAUTHKEY);
        const org = client.org(ORGANIZATIONNAME);
        const repo = org.repo(REPONAME);

        const openPullRequests = await repo.prsAsync({ state: 'open' });

        const data = await fs.readFile(PATHSTUDENTS, 'utf-8');
        const students = JSON.parse(data);

        for (const pr of openPullRequests) {
            const pullRequestNumber = pr.number;
	    const creatorLogin = pr.user.login;

	    const isCreatorInStudentList = students.some(student => student.nickname === creatorLogin);

	    if (isCreatorInStudentList) {
	        // Валидация ПР
		await validatePR(repo, pullRequestNumber, 'TARGET_BRANCH', 'SOURCE_BRANCH');

		// Валидация README.md
		await validateReadme(repo, pullRequestNumber);

        // Валидация Package.json
        await validatePackagejson(repo, pullRequestNumber)
		// Другие валидации
	    } else {
		console.error(`Создатель PR не найден в списке студентов.`);
	    }
	}

    console.log('Все PR проверены.');


  } catch (error) {
      console.error('Произошла ошибка в validateLab:', error.message);
  }
}

validateLab();
