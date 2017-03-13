function mainCtrl($scope,$http){
  $scope.aryList = [];
  $scope.objSignUp = {};
  $scope.objSignUp.firstname = "";
  $scope.objSignUp.lastname = "";
  // get lis of employes
  $scope.getList = function(){
    $http({
      method:"GET",
      url:"http://192.168.10.108:5678/details"
    }).then(function successCallback(response) {
      console.log(response);
      $scope.aryList = response.data;
    }, function errorCallback(response) {
      console.log(response,"error");
    });
  };
  $scope.regs = function(){
    if($scope.objSignUp.firstname == "" || $scope.objSignUp.lastname == ""){
       alert("Please fill the fields");
    }else{
         $http({
        method:"POST",
        url:"http://192.168.10.108:5678/reg",
        data : $scope.objSignUp
      }).then(function successCallback(response) {
        console.log(response,"post");
        $scope.objSignUp = {};
  //       $scope.aryList = response.data;
      }, function errorCallback(response) {
        console.log(response,"error");
      });
    }

  };

};
mainCtrl.$inject = ['$scope','$http'];
regApp.controller('mainCtrl',mainCtrl);
