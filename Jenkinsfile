pipeline {
    agent any

    tools {
        nodejs 'NodeJS'   // must match Jenkins Node config name
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('QAPipeline') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('QA 2nd Process') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}