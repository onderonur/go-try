module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.ts': 'eslint src --max-warnings 0 --fix',
};
