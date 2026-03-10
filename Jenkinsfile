pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        // BrowserStack credentials stored in Jenkins
        BROWSERSTACK_CREDENTIALS = credentials('browserstack')
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
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright on BrowserStack') {
            steps {
                // Run tests directly on Jenkins agent and connect to BrowserStack
                bat """
                npx playwright test \
                    --project=bs-chrome \
                    --user %BROWSERSTACK_CREDENTIALS_USR% \
                    --key %BROWSERSTACK_CREDENTIALS_PSW% \
                    --build-name %BROWSERSTACK_BUILD_NAME%
                """
            }
        }

        stage('QA 2nd Process') {
            steps {
                bat """
                npx playwright test \
                    --project=bs-firefox \
                    --user %BROWSERSTACK_CREDENTIALS_USR% \
                    --key %BROWSERSTACK_CREDENTIALS_PSW% \
                    --build-name %BROWSERSTACK_BUILD_NAME%
                """
            }
        }
    }

    post {
        always {
            // Archive Playwright reports
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}