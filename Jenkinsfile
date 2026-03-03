pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.42.1-jammy' // Playwright Docker image
            args '--user root'
        }
    }

    environment {
        NODE_ENV = 'qa'
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
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
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