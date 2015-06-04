(function() {
    angular.module('wikitree.session.reader.editor').
        directive('editor', [function() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: "/js/angular/session/reader/editor/editor.template.html",
                controller: 'editorController',
                link: function(scope, element, attrs) {

                }
            };
        }]);
})();
