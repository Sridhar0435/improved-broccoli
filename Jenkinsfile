
String envByTagName() {
	 String tagName =  "${env.TAG_NAME}";
	 
	 String[] str = tagName.split('-');
	 for (String values: str) {
		 println(values);
		 
		 if (str[0] == 'dev' || str[0] == 'sit' || str[0] == 'uat' || str[0] == 'pre'|| str[0] == 'cpt'|| str[0] == 'prd') {
			return str[0].toString();
		 }
	 }	 
	 return 'dev';
}

void sendMail(String SUBJECT,String RECEIPIENTS,String MESSAGE){
	
	/*emailext body: "$MESSAGE",
			subject: "${SUBJECT}",
			to: "${RECEIPIENTS}";*/

	sh "mailx -s \"${SUBJECT}\" ${RECEIPIENTS} <<< \"${MESSAGE}\" ";
	
}

void sendMailAttach(String SUBJECT,String RECEIPIENTS, String MESSAGE,String ATTACHMENTS){
	
    /*emailext body: "$MESSAGE",
			subject: "${SUBJECT}",
			to: "${RECEIPIENTS}",
			attachmentsPattern: "${ATTACHMENTS}",
			attachLog: true; */
			
	sh "mailx -s \"${SUBJECT}\" -a \"${ATTACHMENTS}\" ${RECEIPIENTS} <<< \"${MESSAGE}\" ";
			
}

void sendNotify(){
	String body = "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}";
	String subject= "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}";
	String to= "${params.TOMAIL}";
	//sending mail after completion
	try {
		sendMail(subject,to,body);
	} catch (error) {
		echo "Mail Notify failed";
	}	
}

def healthCheck() {
	def url= "${params.ENDPOINT}";
	def response = httpRequest url;
	echo "URL: "+ url +"---Status: "+ response.status;
	return response;
}

pipeline {
	agent {
		node {
			label 'docker-slave-cluster'
		}
	}
	
	environment {
		BBCREDENTIALS = credentials('BBCREDENTIALS');
		JENKINS_CREDENTIALS = credentials('jenkadm');
	}

	// Set log rotation, timeout and timestamps in the console
	options {
		buildDiscarder(logRotator(numToKeepStr: '5'));
		timestamps();
		timeout(time: 10, unit: 'MINUTES');
		copyArtifactPermission(env.JOB_NAME);
	}
	
	parameters {
		booleanParam(name: 'TAG_DEPLOY', defaultValue: false,description: 'Deployment from Tag!');
		choice( name: 'DEPLOY_ENV', choices: ['DEV','SIT','PRE','PRD'], description: 'Environment to Deploy from Branch!');
		booleanParam(name: 'FTEST_USE', defaultValue: false,description: 'Functional test enable?');
		string(name: 'CDN_S3_BUCKET_NAME', defaultValue: "mdev.hcw.commercial.hcw.mgrkbglzlm",description: 'S3 Origin Bucket Name?');
		string(name: 'CLoudfront_Distribution_ID', defaultValue: 'E3B8KTERJEDXQX',description: 'CloudFront ID?');
		string(name: 'AWS_CRED', defaultValue: 'commercial-aws-admin',description: 'AWS Cred to use?');	
		string(name: 'TOMAIL', defaultValue: 'devops-support@morrisonsplc.co.uk',description: 'Default Recipient');
	}
	
	stages {
		stage('Build') {
			steps {
				script {
					echo "Build Started for ${params.DEPLOY_ENV}";
					sh 'npm cache clean --force';
					sh 'npm install';
					sh 'npm config set registry=https://registry.npmjs.org/';
					sh "npm run build:${params.DEPLOY_ENV.toLowerCase()}";

					sh "zip -r app.zip ./build";
					//archiving the app
					archiveArtifacts artifacts: 'app.zip', excludes: null, fingerprint: true, onlyIfSuccessful: true;
				}
			}
		}
		
		stage('Deploy') {
			options {
				skipDefaultCheckout true;
			}
			steps {
				withCredentials([
					[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: "${params.AWS_CRED}"]
				]) {
					script {
						echo "Code Deploy"
					
			            echo "FrontEnd Artifacts deploy to S3 Bucket Origin"
                        
                        sh "aws s3 rm s3://${params.CDN_S3_BUCKET_NAME} --recursive"
					  	echo 'Files on SIT removed'
					    sh "aws s3 cp build/ s3://${params.CDN_S3_BUCKET_NAME} --cache-control 'max-age=300' --recursive"
					    sh "aws cloudfront create-invalidation --distribution-id ${params.CLoudfront_Distribution_ID} --region us-east-1 --paths '/*'"
				        //sh "aws cloudfront list-distributions"
						echo " Build Artifacts deployed to ${params.DEPLOY_ENV} Origin Bucket"			
                    }
			    }
		    }
		}

		stage('QA Phase : Functional') {
			agent {
				node {
					label 'docker-slave-cluster'
				}
			}
			options {
				skipDefaultCheckout true;
			}
			when {
				expression { return params.FTEST_USE;	}
			}
			steps {
				script {
					//echo "Sanity Test: URL test";
					try {
					//	healthCheck();
                    echo "Enable Healthcheck once endpoint defined";
					} catch (err) {
						echo "Sanity failed";
					}
				}
			}
		}
	}
	post {
		always {
						
			sendNotify(); /* Send Mail Notification */
			
			cleanWs(); /* Clean up our workspace */
			
		}
	}
}