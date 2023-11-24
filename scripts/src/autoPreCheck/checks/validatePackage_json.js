const octonode = require('octonode');
const linkOrIpPattern = /(?:https?:\/\/\S+)|(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
async function validatePackagejson(repo, pullRequestNumber) {
    try {

        const files = await repo.contentsAsync(pullRequestNumber);

        const packageFile = files.find(file => file.name.toLowerCase() === 'package.json');

        if (packageFile) {
            // Получение содержимого package.json
            const packageContent = await repo.contentsAsync(packageFile.path, pullRequestNumber);
            const packageText = Buffer.from(packageContent.content, 'base64').toString('utf-8');
            const packageJson = JSON.parse(packageText);

            // Проверка наличия ссылки на демо
            if (!packageJson.repository.url || !linkOrIpPattern.test(packageJson.repository.url)) {
                console.error(`Ссылка на демо в package.json в PR #${pullRequestNumber} отсутствует или невалидна.`);
            }
        } else {
            console.error(`package.json в PR #${pullRequestNumber} не найден.`);
        }

        console.log(`Валидация для package.json в PR #${pullRequestNumber} завершена.`);
    } catch (error) {
        console.error('Произошла ошибка в validatePackagejson:', error.message);
    }
}

module.exports = validatePackagejson();
