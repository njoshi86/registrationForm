(function(){
    //We are defining our registration app
    var registrationApp = angular.module("registration", []);

    //This service is responsible to assign Strings to place holders, buttons, and labels.
    //We can modify this service to accept language and assign string based on language selected.
    //This method will enable us to do internationalization without much code refactoring.
    registrationApp.service("idsLang", [function idsLang(){
        this.assignText = function($scope){
            $scope.registerStr = "Register";
            $scope.message = "Join Our Community Now!";
            $scope.userNameLabel = "Enter User Name";
            $scope.userNamePlaceholder = "User Name";
            $scope.emailLabel = "Enter Email Address";
            $scope.emailPlaceholder = "Email";
            $scope.passwordLabel1 = "Enter Password";
            $scope.passwordPlaceholder1 = "Password";
            $scope.passwordLabel2 = "Enter Password Again";
            $scope.passwordPlaceholder2 = "Password Again";
            $scope.registerLabel = "Registeration Button";
            $scope.registerBtnStr = "REGISTER NOW";
        }
    }]);

    //This is a helper service. It is tasked to validate form for various inputs.
    //This service also helps us with registration.
    registrationApp.service("formValidation", [function formValidation(){

        //In order to validate the form lets do following:
        //1. Validate that username, email, and both passwords are provided
        //2. Above mentioned inputs are not just white spaces
        //3. Email is valid
        //4. Password maches with the confirm password input field
        //We will return "disabled" string to disable Register button if form is not valid.
        //We will return emty string "" to enable Register Button once we validate the form.
        this.isFormValid = function(userName, email, userPassword1, userPassword2){
            if(!userName || !email || !userPassword1 || !userPassword2){
                return "disabled";
            }else if(userName.replace(/ /g,"") == "" || email.replace(/ /g,"") == "" || userPassword1.replace(/ /g,"") == "" || userPassword2.replace(/ /g,"") == ""){
                return "disabled";
            }else if(userPassword1 !== userPassword2){
                return "disabled";
            }else if(regForm.email.$valid){
                return "disabled";
            }else{
                return "";
            }
        }

        //This method will register the user.
        //We can use localStorage to store user name and display it when user tries to login once again.
        this.register = function(userName){
            if(typeof Storage !== "undefined"){
                //Do something with username when user tries to login once again
                localStorage.userName = userName;
            }
        }
    }]);

    //This is the main controller of our app.
    //1. It will deligate String assignment for place holders, buttons, and labels to idsLang service
    //2. It makes formvalidation and registration methods of formValidation service to our view.
    registrationApp.controller("mainController", ["$scope","idsLang", "formValidation", function($scope, idsLang, formValidation){
        idsLang.assignText($scope);
        $scope.isFormValid = formValidation.isFormValid;
        $scope.register = formValidation.register;
    }]);
})();