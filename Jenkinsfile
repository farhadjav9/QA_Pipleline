pipeline {
    agent {
        docker {
            // Official Playwright Docker image with browsers pre-installed
            image 'mcr.microsoft.com/playwright:v1.58.2-noble'
            args '--shm-size=2g' // shared memory for Chromium
        }
    }

    environment {
        NODE_ENV = 'test'
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
                sh 'npm install'               // install dependencies
                sh 'npx playwright install'    // install browsers
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run all tests in parallel with config (workers, browsers)
                sh 'npx playwright test'
            }
        }

        stage('Run QA 2nd Process') {
            steps {
                // Optional: run specific tests again or in serial if needed
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive HTML reports for review
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        // failure {
        //     // Optional: email notifications if tests fail
        //     mail to: 'team@example.com',
        //          subject: "Playwright Tests Failed: ${env.JOB_NAME}",
        //          body: "Check Jenkins build: ${env.BUILD_URL}"
        // }
    }
}