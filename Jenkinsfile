pipeline {
    agent any

    environment {
        IMAGE_NAME = "qa-pipeline-app"
        CONTAINER_NAME = "qa-pipeline-container"
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

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Remove old container if exists
                bat 'docker rm -f %CONTAINER_NAME% || exit 0'
                // Run new container
                bat 'docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%'
            }
        }

        stage('QAPipeline') {
            steps {
                // Execute tests inside the container
                bat 'docker exec %CONTAINER_NAME% npx playwright test'
            }
        }

        stage('QA 2nd Process') {
            steps {
                bat 'docker exec %CONTAINER_NAME% npx playwright test'
            }
        }
    }

    post {
        always {
            // Collect test reports from container
            bat 'docker cp %CONTAINER_NAME%:/app/playwright-report ./playwright-report || echo "No report found"'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}