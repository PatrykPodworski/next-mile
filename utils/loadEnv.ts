const { loadEnvConfig } = require("@next/env");

const loadEnv = async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

module.exports = loadEnv;
