export default {
  '*': 'prettier --write --ignore-unknown',
  '*.ts': 'eslint --max-warnings 0 --fix',
};
