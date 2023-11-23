const octonode = require('octonode');
const linkOrIpPattern = /(?:https?:\/\/\S+)|(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;

async function validateReadme(repo, pullRequestNumber) {
  try {
    const files = await repo.contentsAsync(pullRequestNumber);
    const readmeFile = files.find(file => file.name.toLowerCase() === 'readme.md');
    
    if (!readmeFile) {
      console.error(`README.md в PR #${pullRequestNumber} не найден.`);
      return;
    }

    const readmeContent = await repo.contentsAsync(readmeFile.path, pullRequestNumber);
    const readmeText = Buffer.from(readmeContent.content, 'base64').toString('utf-8');
    
    // Валидация по паттерну
    if (!linkOrIpPattern.test(readmeText)) {
      console.error(`В README.md в PR #${pullRequestNumber} отсутствует ссылка на демо портфолио или IP-адрес.`);
    }

    console.log(`Валидация для README.md в PR #${pullRequestNumber} завершена.`);
  } catch (error) {
    console.error('Произошла ошибка в validateReadme:', error.message);
  }
}

module.exports = validateReadme;
