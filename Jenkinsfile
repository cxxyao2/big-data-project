pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/cxxyao2/big-data-project.git'
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                dir('frontend') {
                    sh 'npm run test'
                }
            }
        }
        
        stage('Start Backend') {
            steps {
                dir('backend') {
                    sh 'npm start &'
                }
            }
        }
        
        stage('Run Playwright Tests') {
            steps {
                dir('frontend') {
                    sh 'npx playwright test'
                }
            }
        }
    }
    
    post {
        always {
            dir('frontend') {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }
}