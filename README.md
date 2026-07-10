# Enterprise Mobile Automation Framework

> Production-Ready Mobile Automation Framework built with **Appium 2**, **WebdriverIO**, **JavaScript (ES2023)**, and **Mocha** following enterprise best practices.

![Node](https://img.shields.io/badge/Node.js-LTS-green)
![Appium](https://img.shields.io/badge/Appium-2.x-blue)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9.x-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-yellow)
![License](https://img.shields.io/badge/License-MIT-success)

---

# Overview

This framework is designed for enterprise mobile automation projects.

It supports:

- Android Native Apps
- Android APK Testing
- iOS Native Apps
- Hybrid Apps
- Mobile Web
- Real Devices
- Android Emulator
- iOS Simulator
- Parallel Execution
- CI/CD
- Allure Reporting
- Structured Logging
- Retry Strategy
- Page Object Model
- Data Driven Testing

The framework is fully modular, scalable, reusable, and production-ready.

---

# Technology Stack

| Technology | Version |
|------------|----------|
| Node.js | LTS |
| JavaScript | ES2023 |
| Appium | 2.x |
| WebdriverIO | Latest |
| Mocha | Latest |
| expect-webdriverio | Latest |
| Allure Reporter | Latest |
| Winston Logger | Latest |
| dotenv | Latest |
| ESLint | Latest |
| Prettier | Latest |
| Husky | Latest |
| lint-staged | Latest |

---

# Supported Platforms

## Android

✔ Native Apps

✔ APK Installation

✔ Existing Installed Apps

✔ Deep Links

✔ Emulator

✔ Real Device

---

## iOS

✔ Native Apps

✔ IPA Installation

✔ Bundle ID Launch

✔ Simulator

✔ Real Device

---

## Mobile Web

✔ Chrome

✔ Safari

✔ Responsive Testing

---

# Sample Applications

Framework supports switching between applications using configuration.

Examples:

- Facebook APK
- ApiDemos
- Sauce Demo
- Sample Hybrid App
- Mobile Browser

Simply update the environment configuration.

---

# Folder Structure

```

MobileAutomationFramework/
│
├── apps/
│   ├── android/
│   │   ├── facebook.apk
│   │   ├── ApiDemos.apk
│   │   └── Sample.apk
│   │
│   └── ios/
│       ├── Sample.ipa
│       └── Demo.ipa
│
├── config/
│   ├── environments/
│   ├── capabilities/
│   ├── devices/
│   ├── appium/
│   ├── wdio/
│   └── constants/
│
├── drivers/
│   ├── DriverFactory.js
│   ├── AndroidDriver.js
│   ├── IOSDriver.js
│   └── CapabilityBuilder.js
│
├── pages/
│
├── screens/
│
├── components/
│
├── specs/
│   ├── android/
│   ├── ios/
│   └── common/
│
├── fixtures/
│   ├── json/
│   ├── csv/
│   └── excel/
│
├── utils/
│   ├── WaitUtils.js
│   ├── SwipeUtils.js
│   ├── ScrollUtils.js
│   ├── GestureUtils.js
│   ├── TapUtils.js
│   ├── LongPressUtils.js
│   ├── ScreenshotUtils.js
│   ├── KeyboardUtils.js
│   ├── ClipboardUtils.js
│   ├── ADBUtils.js
│   ├── DateUtils.js
│   ├── RandomUtils.js
│   ├── FileUtils.js
│   └── Logger.js
│
├── helpers/
│
├── services/
│
├── constants/
│
├── reports/
│
├── logs/
│
├── screenshots/
│
├── videos/
│
├── docs/
│
├── scripts/
│
├── .github/
│
├── package.json
│
└── README.md

```

---

# Framework Architecture

The framework follows:

- SOLID Principles
- DRY
- KISS
- Clean Architecture
- Page Object Model
- Reusable Components
- Utility Driven Design

---

# Configuration

Environment files

```

.env.local

.env.dev

.env.qa

.env.stage

.env.production

```

Example

```

PLATFORM=android

DEVICE=emulator

APP=facebook

AUTOMATION=UIAutomator2

APPIUM_PORT=4723

DEVICE_NAME=Pixel 4

PLATFORM_VERSION=14

APP_PATH=apps/android/facebook.apk

```

No hardcoded values are allowed.

---

# Driver Management

Framework includes

- Driver Factory
- Android Driver
- iOS Driver
- Dynamic Capability Builder
- Device Auto Detection
- Multiple Device Execution

---

# Utilities

The framework includes reusable utilities.

- WaitUtils
- ScrollUtils
- SwipeUtils
- GestureUtils
- TapUtils
- LongPressUtils
- ScreenshotUtils
- ClipboardUtils
- KeyboardUtils
- RandomUtils
- FileUtils
- Logger
- ADBUtils

---

# Base Classes

Implemented

- BasePage
- BaseScreen
- BaseTest
- DriverManager
- ElementHelper
- AssertionHelper

---

# Data Driven Testing

Supports

## JSON

```

fixtures/json/login.json

```

## CSV

```

fixtures/csv/users.csv

```

## Excel

```

fixtures/excel/users.xlsx

```

---

# Reporting

Allure Report includes

- Screenshots
- Device Information
- App Version
- Platform Version
- Execution Time
- Environment
- Logs
- Attachments
- Failure Details
- Stack Trace
- Video Recording (Optional)

Generate Report

```

npm run allure:generate

```

Open Report

```

npm run allure:open

```

---

# Logging

Framework generates

Execution Logs

```

logs/execution.log

```

Error Logs

```

logs/error.log

```

Device Logs

```

logs/device.log

```

Appium Logs

```

logs/appium.log

```

---

# Screenshot Strategy

Automatically capture

- Before Failure
- After Failure
- Important Workflow Steps

Screenshots stored in

```

screenshots/

```

---

# Video Recording

Optional.

Videos stored inside

```

videos/

```

---

# Retry Strategy

Retry only

- Driver initialization failure
- Device disconnected
- Appium timeout
- Infrastructure issues

Never retry

- Assertion failures
- Validation failures
- Functional defects

---

# Parallel Execution

Supports

- Multiple Android Devices
- Multiple iOS Simulators
- Android + iOS Together

Worker count is configurable.

---

# Test Hooks

Implemented hooks

- beforeSession
- beforeSuite
- beforeTest
- beforeCommand
- afterCommand
- afterTest
- afterSuite
- afterSession

---

# Test Suites

Example suites

```

Login

Logout

Forms

Alerts

Clipboard

Scroll

Swipe

Drag & Drop

Settings

Navigation

Camera

WebView

Deep Links

Performance Smoke

Regression

Sanity

```

---

# APK Management

Place APK files inside

```

apps/android/

```

Example

```

apps/android/facebook.apk

```

Switch application using

```

APP=facebook

```

Framework automatically loads

```

apps/android/facebook.apk

```

---

# Facebook APK Testing

Supported scenarios

- Login
- Logout
- Navigation
- Search
- Notifications
- Profile
- Messenger Launch
- Deep Links
- Background
- Foreground
- Device Rotation
- Permissions
- Clipboard
- Network Toggle
- Push Notification Validation

---

# Running Tests

Install

```

npm install

```

Run Android

```

npm run android

```

Run iOS

```

npm run ios

```

Run Emulator

```

npm run emulator

```

Run Real Device

```

npm run real-device

```

Run Smoke

```

npm run smoke

```

Run Regression

```

npm run regression

```

Run Parallel

```

npm run parallel

```

Run All Tests

```

npm test

```

---

# Linting

Run ESLint

```

npm run lint

```

Fix

```

npm run lint:fix

```

---

# Formatting

Check

```

npm run format

```

Fix

```

npm run format:fix

```

---

# CI/CD

GitHub Actions

Features

- Install Dependencies
- Lint
- Run Tests
- Generate Allure
- Upload Artifacts

Jenkins Pipeline

Stages

- Checkout
- Install
- Lint
- Execute Tests
- Generate Report
- Archive Artifacts
- Publish Allure

---

# Documentation

The repository includes

- Installation Guide
- Framework Architecture
- Folder Structure
- Configuration Guide
- Device Configuration
- Appium Setup
- Android SDK Setup
- iOS Setup
- Reporting Guide
- Troubleshooting
- Contributing Guide
- Release Guide

---

# Code Standards

Every module follows

- SOLID Principles
- DRY
- KISS
- Meaningful Naming
- Small Reusable Methods
- No Duplicate Code
- Documentation Comments

---

# Error Handling

Centralized error handling captures

- Screenshot
- Stack Trace
- Device Information
- Capabilities
- Appium Logs
- Allure Attachment
- Execution Logs

---

# Prerequisites

Install

- Node.js LTS
- Java JDK 17+
- Android Studio
- Android SDK
- Appium 2
- Appium Inspector
- ADB
- Git

Optional

- Xcode
- CocoaPods

---

# Project Quality Goals

✔ Production Ready

✔ Enterprise Ready

✔ Reusable

✔ Modular

✔ Cross Platform

✔ CI/CD Ready

✔ Scalable

✔ Parallel Execution

✔ Data Driven

✔ Rich Reporting

✔ Comprehensive Logging

✔ Zero Placeholder Code

✔ GitHub Release Ready

---

# Future Enhancements

- BrowserStack Integration
- LambdaTest Integration
- Firebase Test Lab
- AI-Based Visual Testing
- OCR Validation
- Accessibility Testing
- Performance Monitoring
- Self-Healing Locators

---

# Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

All code must pass:

- ESLint
- Prettier
- Unit Checks
- Automation Tests

---

# License

MIT License

---

# Repository Status

**Production Ready**

This framework is designed to support enterprise-scale mobile automation projects with Appium 2 and WebdriverIO. It is suitable for Android APK testing (including applications like Facebook), iOS applications, hybrid apps, and mobile web testing, following industry-standard architecture, reporting, logging, and CI/CD practices.