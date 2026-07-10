#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const suite = args[0] || 'all';
const options = parseOptions(args.slice(1));
const cliArgs = [];
if (suite !== 'all') {
  cliArgs.push('--suite', suite);
}

const projectRoot = path.resolve(__dirname, '..');
const appiumHost = process.env.APPIUM_HOST || '127.0.0.1';
const appiumPort = Number.parseInt(process.env.APPIUM_PORT || '4723', 10);
const sdkRoot = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || 'C:\\Users\\Public.DESKTOP-C0DL3EM\\AppData\\Local\\Android\\Sdk';
const environment = fs.existsSync(path.join(projectRoot, `.env.${suite}`)) ? suite : 'local';
const platform = (options.platform || process.env.PLATFORM || '').toLowerCase();
const appType = (options.appType || process.env.APP_TYPE || '').toLowerCase();
const shouldUseAppium = platform !== 'web' && appType !== 'desktop-web';
const appiumBinary = process.platform === 'win32'
  ? path.join(projectRoot, 'node_modules', '.bin', 'appium.cmd')
  : path.join(projectRoot, 'node_modules', '.bin', 'appium');

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

function getAppiumEnvironment() {
  const platformTools = path.join(sdkRoot, 'platform-tools');
  const emulatorTools = path.join(sdkRoot, 'emulator');
  const javaHome = resolveJavaHome();
  const javaTools = javaHome ? path.join(javaHome, 'bin') : '';
  const existingPath = process.env.PATH || '';
  const nextPathSegments = [javaTools, platformTools, emulatorTools, existingPath].filter(Boolean);

  const env = {
    ...process.env,
    APP_TYPE: options.appType || process.env.APP_TYPE,
    BROWSER_NAME: options.browser || process.env.BROWSER_NAME,
    PLATFORM: options.platform || process.env.PLATFORM,
    ANDROID_HOME: sdkRoot,
    ANDROID_SDK_ROOT: sdkRoot,
    JAVA_HOME: javaHome,
    ENV: environment,
    PATH: nextPathSegments.join(path.delimiter),
  };

  for (const key of Object.keys(env)) {
    if (env[key] === undefined) {
      delete env[key];
    }
  }

  return env;
}

function parseOptions(optionArgs) {
  const parsed = {};
  for (let index = 0; index < optionArgs.length; index += 1) {
    const arg = optionArgs[index];
    if (!arg.startsWith('--')) {
      continue;
    }

    const key = arg.slice(2);
    const value = optionArgs[index + 1];
    if (value && !value.startsWith('--')) {
      parsed[key] = value;
      index += 1;
    } else {
      parsed[key] = 'true';
    }
  }

  return parsed;
}

function waitForAppiumServer() {
  return new Promise((resolve) => {
    const request = http.get(
      {
        host: appiumHost,
        port: appiumPort,
        path: '/status',
        timeout: 1000,
      },
      (response) => {
        response.resume();
        resolve(response.statusCode === 200);
      }
    );

    request.on('error', () => resolve(false));
    request.on('timeout', () => {
      request.destroy();
      resolve(false);
    });
  });
}

function startAppiumServer() {
  const appiumCommand = fs.existsSync(appiumBinary) ? appiumBinary : 'appium';
  const child = spawn(
    appiumCommand,
    ['--address', appiumHost, '--port', String(appiumPort), '--log', path.join(projectRoot, 'appium.log')],
    {
      cwd: projectRoot,
      stdio: 'ignore',
      env: getAppiumEnvironment(),
      shell: process.platform === 'win32',
      detached: false,
    }
  );

  child.on('error', (error) => {
    console.error('Unable to start the Appium server:', error.message);
  });

  return child;
}

(async function main() {
  let appiumProcess;

  try {
    if (shouldUseAppium) {
      const alreadyRunning = await waitForAppiumServer();
      if (!alreadyRunning) {
        appiumProcess = startAppiumServer();
        let retries = 0;
        while (retries < 20) {
          const ready = await waitForAppiumServer();
          if (ready) {
            break;
          }
          retries += 1;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const child = spawn(command, ['wdio', ...cliArgs], {
      stdio: 'inherit',
      shell: true,
      cwd: projectRoot,
      env: getAppiumEnvironment(),
    });

    child.on('error', (error) => {
      console.error('Unable to start the WebdriverIO runner:', error.message);
      process.exit(1);
    });

    child.on('exit', (code) => {
      if (appiumProcess && !appiumProcess.killed) {
        appiumProcess.kill('SIGTERM');
      }
      process.exit(code ?? 1);
    });
  } catch (error) {
    console.error('Test runner failed:', error.message);
    if (appiumProcess && !appiumProcess.killed) {
      appiumProcess.kill('SIGTERM');
    }
    process.exit(1);
  }
})();
