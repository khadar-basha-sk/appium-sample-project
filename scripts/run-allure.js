#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

function resolveJavaHome() {
  const javaExecutable = process.platform === 'win32' ? 'java.exe' : 'java';
  const configuredJavaHome = process.env.JAVA_HOME;
  if (configuredJavaHome && fs.existsSync(path.join(configuredJavaHome, 'bin', javaExecutable))) {
    return configuredJavaHome;
  }

  const androidStudioJavaHome = 'C:\\Program Files\\Android\\Android Studio\\jbr';
  if (process.platform === 'win32' && fs.existsSync(path.join(androidStudioJavaHome, 'bin', javaExecutable))) {
    return androidStudioJavaHome;
  }

  return configuredJavaHome;
}

function resolveAllureCommand() {
  return path.join(projectRoot, 'node_modules', 'allure-commandline', 'dist');
}

const javaHome = resolveJavaHome();
const javaPath = javaHome ? path.join(javaHome, 'bin') : '';
const allureCommand = resolveAllureCommand();
const env = {
  ...process.env,
  JAVA_HOME: javaHome,
  PATH: [javaPath, process.env.PATH].filter(Boolean).join(path.delimiter),
};

if (!fs.existsSync(allureCommand)) {
  console.error('Allure CLI is not installed. Run npm install first.');
  process.exit(1);
}

if (!javaHome) {
  console.error('Java is required to run Allure, but JAVA_HOME could not be resolved.');
  process.exit(1);
}

const javaExecutable = process.platform === 'win32' ? 'java.exe' : 'java';
const command = path.join(javaHome, 'bin', javaExecutable);
const commandArgs = [
  '-classpath',
  [path.join(allureCommand, 'lib', '*'), path.join(allureCommand, 'lib', 'config')].join(path.delimiter),
  'io.qameta.allure.CommandLine',
  ...args,
];

const child = spawn(command, commandArgs, {
  cwd: projectRoot,
  env,
  shell: false,
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error('Unable to start Allure:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
