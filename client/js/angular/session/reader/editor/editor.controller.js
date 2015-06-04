(function() {
    angular.module('wikitree.session.reader.editor').
        controller('editorController', [
            '$scope',
            'Resizer',
            'Loading',
            'Sessions',
            'Articles',
            'Searches',
            'Categories',
            function($scope, Resizer, Loading, Sessions, Articles, Searches, Categories) {

                $scope.name = '';
                $scope.content = '<p>Add note content...</p>';

            }
        ]);
})();
