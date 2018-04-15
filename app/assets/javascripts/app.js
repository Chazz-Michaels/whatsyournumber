
var app = angular.module('homePage', ['ui.router']);


app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });

  $urlRouterProvider.otherwise('home');

}]);



app.controller("mainController", function($scope) {
  $scope.header = "What's Your Number?";
  $scope.description = "A quick way to figure out the correct macronutrients you need to achieve your fitness goals."
  $scope.weight, $scope.feet, $scope.inches, $scope.gender,
    $scope.goal, $scope.age, $scope.weeklyHoursOfExercise;



  $scope.toAdvanced = function () {
    document.getElementById('displayGoalNormal').style.display = "none";
    document.getElementById('displayGoalAdvanced').style.display = "block";
    document.getElementById('advanced').style.display = "none";
  }
  $scope.toNormal = function () {
    document.getElementById('displayGoalNormal').style.display = "block";
    document.getElementById('advanced').style.display = "block";
    document.getElementById('displayGoalAdvanced').style.display = "none";
  }


  $scope.getBMR = function () {
  //per the Harris–Benedict equation:
  //BMR Male = 66 + ( 6.2 × weight in pounds ) + ( 12.7 × height in inches ) –
  //( 6.76 × age in years )
  //BMR Female = 655.1 + ( 4.35 × weight in pounds ) +
  //( 4.7 × height in inches ) - ( 4.7 × age in years )
    $scope.heightTotalInches = ($scope.inches + ($scope.feet*12));
    if($scope.gender == "Female"){
      $scope.yourBMR = (655.1 + (4.35 * $scope.weight) + (4.7 * $scope.heightTotalInches)-
      (4.7 * $scope.age));
    }else if($scope.gender == "Male"){
      $scope.yourBMR = (66 + (6.2 * $scope.weight) + (12.7 * $scope.heightTotalInches) -
      (6.76 * $scope.age));
    }
  }

  $scope.getGoal = function () {
  //Goal calories: cut fast = (bmr-400), cut normal = (bmr-200),
  //               bulk fast = (bmr+400), bulk normal = (bmr+200)
    if($scope.goal == "Cut Fast"){
      $scope.goalCalories = ($scope.yourBMR - 500);
      $scope.percentFats = 30;
      $scope.percentCarbs = 25;
      $scope.percentProtein = 45;
    }
    if($scope.goal == "Cut Normal"){
      $scope.goalCalories = ($scope.yourBMR - 350);
      $scope.percentFats = 30;
      $scope.percentCarbs = 25;
      $scope.percentProtein = 45;
    }
    if($scope.goal == "Cut Slow"){
      $scope.goalCalories = ($scope.yourBMR - 200);
      $scope.percentFats = 30;
      $scope.percentCarbs = 30;
      $scope.percentProtein = 40;
    }
    if($scope.goal == "Maintain"){
      $scope.goalCalories = $scope.yourBMR;
      $scope.percentFats = 30;
      $scope.percentCarbs = 30;
      $scope.percentProtein = 40;
    }
    if($scope.goal == "Bulk Slow"){
      $scope.goalCalories = ($scope.yourBMR + 200);
      $scope.percentFats = 30;
      $scope.percentCarbs = 35;
      $scope.percentProtein = 35;
    }
    if($scope.goal == "Bulk Normal"){
      $scope.goalCalories = ($scope.yourBMR + 500);
      $scope.percentFats = 30;
      $scope.percentCarbs = 40;
      $scope.percentProtein = 30;
    }
    if($scope.goal == "Bulk Fast"){
      $scope.goalCalories = ($scope.yourBMR + 800);
      $scope.percentFats = 30;
      $scope.percentCarbs = 40;
      $scope.percentProtein = 30;
    }
    //For advanced checkbox, receive goal calories by checking calorie aim/adjustments
    if($scope.goal == "Calorie Deficit"){
      $scope.goalCalories = ($scope.yourBMR - $scope.adjCalories);
    }
    if($scope.goal == "Calorie Surplus"){
      $scope.goalCalories = ($scope.yourBMR + $scope.adjCalories);
    }

  }

  $scope.getDailyBreakdown = function () {
    if($scope.percentFats == undefined || $scope.desiredFats != undefined){
      $scope.percentProtein = $scope.desiredProtein;
      $scope.percentCarbs = $scope.desiredCarbs;
      $scope.percentFats = $scope.desiredFats;
    }
    $scope.dailyProtein = (($scope.goalCalories * ($scope.percentProtein/100))/4);
    $scope.dailyCarbs = (($scope.goalCalories * ($scope.percentCarbs/100))/4);
    $scope.dailyFats = (($scope.goalCalories * ($scope.percentFats/100))/9);
  }


  $scope.cleanItUp = function () {
    $scope.yourBMR = $scope.yourBMR.toFixed();
    $scope.goalCalories = $scope.goalCalories.toFixed();
    $scope.dailyProtein = $scope.dailyProtein.toFixed();
    $scope.dailyCarbs = $scope.dailyCarbs.toFixed();
    $scope.dailyFats = $scope.dailyFats.toFixed();
  }

  $scope.doTheMath = function () {
    $scope.getBMR();
    $scope.getGoal();
    if($scope.goalCalories < 1200){
      $scope.goalCalories = 1200;
    }
    $scope.getDailyBreakdown();
    $scope.cleanItUp();
  }


});
