const octonode = require('octonode');

async function validatePR(repo, pullRequestNumber, targetBranch, sourceBranch) {
  try {
    const pullRequest = await repo.pr(pullRequestNumber);

    if (!pullRequest) {
      console.error(`ПР #${pullRequestNumber} не найден.`);
      return;
    }

    const baseBranch = pullRequest.base.ref;
    const headBranch = pullRequest.head.ref;
    if (baseBranch !== targetBranch || headBranch !== sourceBranch) {
      console.error(`ПР #${pullRequestNumber} должен быть из ветки ${sourceBranch} в ветку ${targetBranch}.`);
    }

    console.log(`Валидация для ПР #${pullRequestNumber} завершена.`);
  } catch (error) {
    console.error('Произошла ошибка в validatePR:', error.message);
  }
}

module.exports = validatePR;
