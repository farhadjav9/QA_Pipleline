pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'Webhook', url: 'https://github.com/farhadjav9/QA_Pipleline']])
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

        stage('QAPipeline') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('QA 2nd Process') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}