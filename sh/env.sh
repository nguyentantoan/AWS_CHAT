# #Cấu hình môi trường cho Database MongoDB
#     export DB_CONNECTION=mongodb
#     export DB_HOST=localhost
#     export DB_PORT=27017
#     export DB_NAME=chatDeploy
#     export DB_USERNAME=""
#     export DB_PASSWORD=""

#Cấu hình cho App
    export APP_HOST=ec2-34-211-39-216.us-west-2.compute.amazonaws.com
    export APP_PORT=3000

# Cấu hình SESSION_KEY va SESSION_SECRET
    export SESSION_KEY="express.sid"
    export SESSION_SECRET="mySecret"

# Cấu hình tài khoản email
    export MAIL_USER=congnghemoitest1@gmail.com
    export MAIL_PASSWORD=congnghemoi2021
    export MAIL_HOST=smtp.gmail.com
    export MAIL_PORT=587

# Cấu hình facebook login app
export FB_APP_ID=221991089978179
export FB_APP_SECRET=8500546e684bc405cd9381bf3ca6dd93
export FB_CALLBACK_URL= https://chatdeploycnm.herokuapp.com/auth/facebook/callback

# Cấu hình google login app
export GG_APP_ID=55116632433-b4i6t7n6ferlcga2c7lu46gt8mb8k6ch.apps.googleusercontent.com
export GG_APP_SECRET=_oWJXLLDQwzeTLRuCH7-LI1-
export GG_CALLBACK_URL= https://chatdeploycnm.herokuapp.com/auth/google/callback
