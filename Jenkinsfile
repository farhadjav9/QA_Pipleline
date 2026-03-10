pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        BROWSERSTACK_USERNAME = credentials('browserstack-username')
        BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key')
        BROWSERSTACK_BUILD_NAME = "Jenkins-Build-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[
                        url: 'https://github.com/farhadjav9/QA_Pipleline.git'
                    ]]
                )
            }
        }

        stage('Check Node') {
            steps {
                script {
                    bat 'node -v'
                    bat 'npm -v'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm ci'
                    bat 'npx playwright install'
                }
            }
        }

        stage('Run Playwright on BrowserStack') {
            steps {
                script {
                    bat 'npx playwright test'
                }
            }
        }

        stage('QA 2nd Process') {
            steps {
                script {
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            node { // Ensure FilePath context for archiving artifacts
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }
}