pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Execute Tests') {
      steps { sh 'npm test' }
    }
    stage('Generate Report') {
      steps { sh 'npm run allure:generate' }
    }
    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'reports/**, logs/**, screenshots/**, videos/**', allowEmptyArchive: true
      }
    }
  }
}
