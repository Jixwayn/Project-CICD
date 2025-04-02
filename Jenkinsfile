pipeline {
    agent any

    environment {
        NODEJS_VERSION = '18'  // ใช้ Node.js เวอร์ชัน 18
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Jixwayn/Project-CICD.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodejs = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Install Netlify CLI') {
            steps {
                sh 'npm install -g netlify-cli'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                withCredentials([
                    string(credentialsId: 'NETLIFY_AUTH_TOKEN', variable: 'NETLIFY_AUTH_TOKEN')
                ]) {
                    sh '''
                    netlify deploy --prod --auth=$NETLIFY_AUTH_TOKEN --site=ใส่_SITE_ID_ที่ได้จาก_Netlify
                    '''
                }
            }
        }

        stage('Post Deploy Check') {
            steps {
                sh 'curl -I https://todolistspublic.netlify.app'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
