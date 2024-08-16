const app = angular.module('templateApp', ['ideUI', 'ideView']);
app.controller('templateController', ['$scope', '$http', 'ViewParameters', function ($scope, $http, ViewParameters) {
    const params = ViewParameters.get();

    const printDeliveryNoteUrl = "/services/ts/codbex-hestia-randddesign/codbex-inventory-print/DeliveryNote/api/DeliveryNoteService.ts/" + params.id;

    $http.get(printDeliveryNoteUrl)
        .then(function (response) {
            $scope.DeliveryNote = response.data.deliveryNote;
            $scope.DeliveryNoteItems = response.data.deliveryNoteItems;
            $scope.Store = response.data.store;
            $scope.Company = response.data.company;
            $scope.Customer = response.data.customer;
            $scope.Employee = response.data.employee;
        });
}]);
