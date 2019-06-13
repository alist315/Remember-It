const app = angular.module('RememberIt', ['ngAnimate']);
app.controller('mainController', ['$http', function($http) {
  const controller = this;
  this.memories=[];
  this.indexOfEditFormToShow = null;
  this.createMemory = function(){
    $http({
      method: 'POST',
      url:'/memories',
      data:{
        nameOfEvent: this.nameOfEvent,
        date: this.date,
        img: this.img,
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
              nameOfEvent: this.nameOfEvent,
              date: this.date,
              img: this.img,
              description: this.description
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


    this.getMemories();
  }]);











// auth controller
  app.controller('AuthController', ['$http', function ($http){
  const controller = this;
    this.goApp = function(){
      $http({
          method:'GET',
          url: '/footballs'
      }).then(function(response){
          controller.loggedInUsername = response.data.username;
          console.log(response);
          console.log(controller.loggedInUsername);
      }, function(){
          console.log('error');
      });
  }

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
            // controller.createUsername = null;
            // controller.createPassword = null;
        }, function(){
            console.log('error');
        });
  }


  this.logOut = function () {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function (response) {
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
          console.log(response);
          controller.loginUsername = null;
          controller.loginPassword = null;
          // controller.goApp();
      }, function(){
          console.log('error');
      });
  }
}]);
