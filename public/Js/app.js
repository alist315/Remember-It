const app = angular.module('RememberItApp', ['ngAnimate']);

app.controller('MainController', ['$http','$scope', function($http, $scope) {
  const controller = this;
  this.memories=[];
  this.indexOfEditFormToShow = null;
  this.foundUser = null;
  this.loggedIn = false;
  this.createMemory = function(){
    $http({
      method: 'POST',
      url:'/memories',
      data:{
        userId: controller.foundUser._id,
        nameOfEvent: this.nameOfEvent,
        date: this.date,
        img: this.img,
        location: this.location,
        description: this.description
      }
    }).then(function(response){
      controller.memories.push(response.data);
      console.log(response);
    }), function(error){
      console.log(error);
    }
  }
  this.getMemories = function(){
      $http({
        method: 'GET',
        url: '/memories',
      }).then(function(response){
        controller.memories = response.data;
      },  function(){
        console.log('error');
      });
    };
    this.deleteMemory = function(memory){
        $http({
            method:'DELETE',
            url: '/memories/' + memory._id
        }).then(
            function(response){
                controller.getMemories();
            },
            function(error){

            }
        );
    }
    this.editMemory = function(memory){
        $http({
            method:'PUT',
            url: '/memories/' + memory._id,
            data: {
              nameOfEvent: this.updatedNameOfEvent,
              date: this.updatedDatedate,
              img: this.updatedImgimg,
              location: this.updatedLocationlocation,
              description: this.updatedDescriptiondescription
            }
        }).then(
            function(response){
                controller.getMemories();
                controller.indexOfEditFormToShow = null;
            },
            function(error){

            }
        );
    }

    this.openLogin = () => {
         this.showLogin = true;
         $scope.ctrl.showLogin = true;
       }
    // __________CLOSE MODAL_________________
       this.closeLogin = () => {
          this.showLogin = false;
          $scope.ctrl.showLogin = false;
        }














// auth controller


  this.test = "hello"
  console.log('running');

  this.createUser = () => {
    console.log("create user is running");
    $http({
            method:'POST',
            url: '/users',
            data: {
                username: this.createUsername,
                password: this.createPassword
            }
        }).then(function(response){
            console.log(response);

        }, function(){
            console.log('error');
        });
  }


  this.logOut = function () {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function (response) {
      controller.loggedIn = false;
      controller.foundUser = null;
      console.log(response);
      // controller.loggedInUsername = null;
    }, function (error){
      console.log(error);
    })
  }

  this.logIn = function(){
      $http({
          method:'POST',
          url: '/sessions',
          data: {
              username: this.loginUsername,
              password: this.loginPassword
          }
      }).then(function(response){
          console.log(response.data.foundUser);
          controller.foundUser = response.data.foundUser;
          controller.loginUsername = null;
          controller.loginPassword = null;
          controller.loggedIn= true;
          // controller.goApp();
      }, function(){
          console.log('error');
      });
  }
  this.getMemories();
}]);
