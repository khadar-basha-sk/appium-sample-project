# Installation Guide

## Prerequisites

- Node.js LTS
- Java JDK 17+
- Android Studio and SDK
- Appium 2
- Git

## Setup

1. Install dependencies with `npm install`.
2. Start Appium Server: `npx appium --address 127.0.0.1 --port 4723`.
3. Ensure the target emulator, simulator, or real device is available.
4. Run the framework with `npm test`.

> If the runner reports an Appium session creation failure, verify that the Appium server is running and reachable at the configured host and port.
