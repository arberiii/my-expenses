'use strict';

angular.module('myExpenses.payments', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/payments', {
    templateUrl: 'payments/payments.html',
    controller: 'PaymentsCtrl'
  });
}])
// Payments Controller
.controller('PaymentsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {



var ref = firebase.database().ref().child('/expenses');
// get Expenses that are paid
$scope.expensesPaid = $firebaseArray(ref.orderByChild("paid").equalTo(1));
// get Expenses that are not paid
$scope.expensesNotPaid = $firebaseArray(ref.orderByChild("paid").equalTo(0));


// getting the total Paid expenses
$scope.expensesPaid.$loaded().then(function(data) {
	$scope.totalPaidSum = 0;
   angular.forEach(data, function(value, key) {
   	$scope.totalPaidSum += parseFloat(value.price);
   });});


// getting the total not Paid expenses
$scope.expensesNotPaid.$loaded().then(function(data) {
	$scope.totalnotPaidSum = 0;
   angular.forEach(data, function(value, key) {
   	$scope.totalnotPaidSum += parseFloat(value.price);
     console.log(value.price+" - "+ key);
   });});

// pays an Expense
$scope.payExpense = function(expenseNotPaid){
	var id = expenseNotPaid.$id;
	$scope.totalPaidSum += parseFloat(expenseNotPaid.price);
	$scope.totalnotPaidSum -= parseFloat(expenseNotPaid.price);
	var record = $scope.expensesNotPaid.$getRecord(id);
	record.paid = 1;
	console.log(record);
	$scope.expensesNotPaid.$save(record).then(function(ref){
			console.log('Upadte')
		});
}

// unpays an Expense
$scope.unPayExpense = function(expensePaid){
	var id = expensePaid.$id;
	$scope.totalPaidSum -= parseFloat(expensePaid.price);
	$scope.totalnotPaidSum += parseFloat(expensePaid.price);

	var record = $scope.expensesPaid.$getRecord(id);
	record.paid = 0;
	$scope.expensesPaid.$save(record).then(function(ref){
		console.log("Un Paid");
	});

}




}]);