const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `token YOUR_GITHUB_TOKEN` });
const org = 'stepancar-web-programming'; // Название вашей организации на GitHub

await octokit.request(`GET /orgs/${org}/repos`) // Получение списка репозиториев организации
.then(response => {
    const repos = response.data.filter(repo => repo.name.startsWith('2023'));
    repos.forEach(repo => {
        checkPullRequests(repo);
    });
})
    .catch(error => {
        console.error('Ошибка при запросе', error);
    })
function checkPullRequests(repo){
    octokit.request(`GET /repos/${org}/{repo}/pulls`,{
        repo:repo.name
})
.then(response => {
    const pullRequests = response.data;
    pullRequests.forEach(pr => {
        validatePullRequest(pr);
    });
})
        .catch(error => {
            console.error(`Ошибка при получении ПР для репозитория ${repo.name}:`, error);
        });
}
function validatePullRequest(pr) {
    // Проверка веток
    if (pr.head.ref !== 'dev' || pr.base.ref !== 'main') {
        console.log(`ПР #${pr.number} не соответствует требованиям по веткам.`);
        return;
    }

    // Проверка наличия ссылки на демо в описании
    if (!pr.body.includes('DEMO_LINK')) {
        console.log(`В ПР #${pr.number} отсутствует ссылка на демо.`);
        return;
    }

    console.log(`ПР #${pr.number} прошел валидацию.`);
}
