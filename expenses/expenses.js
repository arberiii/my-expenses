'use strict';

angular.module('myExpenses.expenses', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/expenses', {
    templateUrl: 'expenses/expenses.html',
    controller: 'ExpensesCtrl'
  });
}])
// Expenses Controller
.controller('ExpensesCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

	// get Expenses
	var ref = firebase.database().ref().child('/expenses');
	$scope.expenses = $firebaseArray(ref);

	// Shows add form
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
		$scope.editFormShow = false;
		$scope.msg = '';
	}

	$scope.showEditForm = function(expense){
		$scope.editFormShow = true;
		$scope.addFormShow = false;
		$scope.msg = '';

		
		$scope.id = expense.$id;
		$scope.name = expense.name;
		$scope.price = expense.price;


		
	}

	// Hides the forms
	$scope.hide = function(){
		$scope.addFormShow = false;
	}

	//Adds the expenses to firebase
	$scope.addFormSubmit = function(){
		// Assign values to variables
		if($scope.name){var name = $scope.name;} else {var name = null; }
		if($scope.price){var price = $scope.price;} 
		else {
			$scope.msg = "Write a proper number for price"; 
			return; 
		}
		var paid = 0;
		var today = new Date();
		var month = today.getMonth();
		var year = today.getFullYear();
	
		//Build Object
		$scope.expenses.$add({
			name: name,
			price: price,
			month: month,
			year: year,
			paid: paid
		}).then(function(ref){
			var id = ref.key;
			console.log('Added Expenses with id '+id);

			//Clean the form
			clearFields();

			//Hide the form
			$scope.addFormShow = false;

			//Sending a message
			$scope.msg = "Expenses added";
		})
	}

	$scope.editFormSubmit = function(){

		 console.log('Upadatin the expense');
		// //Get ID
		var id = $scope.id;
		//Get REcord
		var record = $scope.expenses.$getRecord(id);

		//Assign values
		if($scope.name){record.name = $scope.name;}else{ record.name = null;}
		if($scope.price){record.price = $scope.price;} else {
			$scope.msg = "Write a proper number for price";
			return;
		}
		

		//Save expense
		$scope.expenses.$save(record).then(function(ref){
			console.log('Upadte')
		});
		clearFields();

		//Hide the form
		$scope.editFormShow = false;
		$scope.msg = "Expense updated";
	}

	$scope.removeExpense = function(expense){
		$scope.expenses.$remove(expense);
		$msg="Expenses deleted"
	}

	function clearFields(){
		$scope.name="";
		$scope.price="";
	}

}]);