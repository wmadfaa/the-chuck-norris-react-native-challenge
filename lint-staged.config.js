const config = {
  '.*{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '.*{md,json,js,ts,tsx}': ['prettier --write'],
};

module.exports = config;
