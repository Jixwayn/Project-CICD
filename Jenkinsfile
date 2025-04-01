pipeline {
    agent any

    environment {
        // กำหนดตัวแปรสำหรับใช้ใน pipeline
        NODE_ENV = 'production'
        NETLIFY_SITE_ID = d4d67053-1817-4830-b805-029a778857b3 // กรอก Site ID จาก Netlify
        NETLIFY_AUTH_TOKEN = credentials('nfp_oWagAZ8FQNh3PzbjfjKx5LmmRMRDcEnP5d90')  // Netlify Token ที่เก็บไว้ใน Jenkins Credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                // ดึงโค้ดจาก Git repository
                git 'https://github.com/nattaponkum/learn-jenkins-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // ติดตั้ง dependencies ด้วย npm
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // รันการทดสอบ (ถ้ามี)
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build Project') {
            steps {
                // สร้างโปรเจค (ถ้ามีการคอมไพล์หรือ build)
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Netlify') {
            steps {
                script {
                    // ใช้คำสั่ง Netlify CLI สำหรับการ deploy ขึ้น Netlify
                    sh 'npm install -g netlify-cli'  // ติดตั้ง Netlify CLI
                    sh 'netlify deploy --prod --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN'  // Deploy ไปยัง Netlify
                }
            }
        }
    }

    post {
        success {
            // แจ้งเตือนเมื่อ deploy สำเร็จ
            echo 'Deployment to Netlify completed successfully.'
        }

        failure {
            // แจ้งเตือนเมื่อเกิดข้อผิดพลาด
            echo 'Deployment failed.'
        }
    }
}
