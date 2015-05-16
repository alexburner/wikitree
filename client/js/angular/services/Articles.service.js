(function() {
    angular.module('wikitree').

        factory('Articles', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {

            /**
             * Private
             */

            var byTitle = {};
            var byUnsafeTitle = {};

            function Article(args) {
                this.title = args.title;
                this.content = args.content;
                this.categories = args.categories;
            }

            function getFromAPI(title) {

                console.log('Gettng article from API...', title);

                var timestamp = Date.now();
                return $q(function (resolve, reject) {
                    $rootScope.$emit('articles:loadstart', timestamp);
                    $http.jsonp('https://en.wikipedia.org/w/api.php', {
                        params: {
                            action: 'parse',
                            prop: 'text|categorieshtml|displaytitle',
                            redirects: 'true',
                            page: title,
                            format: 'json',
                            callback: 'JSON_CALLBACK'
                        }
                    }).
                        success(function (data) {
                            $rootScope.$emit('articles:loadend', timestamp);
                            if (data && data.parse && data.parse.title) {
                                resolve(data.parse);
                            } else {
                                reject(null);
                            }
                        }).
                        error(function () {
                            $rootScope.$emit('articles:loadend', timestamp);
                            reject(null);
                        });
                });
            }

            /**
             * Public
             */

            var Articles = {};

            Articles.getByTitle = function (title) {
                return $q(function (resolve, reject) {
                    if (byTitle[title]) {
                        resolve(byTitle[title]);
                    } else {
                        getFromAPI(title).
                            then(function (parse) {
                                if (parse) {
                                    var article = new Article({
                                        title: parse.title,
                                        content: parse.text['*'],
                                        categories: parse.categorieshtml['*']
                                    });
                                    byTitle[article.title] = article;
                                    resolve(article);
                                } else {
                                    // sucks
                                    console.error('Article not found', title);
                                    reject(null);
                                }
                            }).
                            catch(function () {
                                // sucks
                                console.error('Article API error', title, arguments);
                                reject(null);
                            });
                    }
                });
            };

            Articles.getByUnsafeTitle = function (unsafeTitle) {
                return $q(function (resolve, reject) {
                    if (byUnsafeTitle[unsafeTitle]) {
                        resolve(byUnsafeTitle[unsafeTitle]);
                    } else {
                        getFromAPI(unsafeTitle).
                            then(function (parse) {
                                if (parse) {
                                    var article = new Article({
                                        title: parse.title,
                                        content: parse.text['*'],
                                        categories: parse.categorieshtml['*']
                                    });
                                    byUnsafeTitle[unsafeTitle] = article;
                                    byTitle[article.title] = article;
                                    resolve(article);
                                } else {
                                    // sucks
                                    console.error('Article not found!', unsafeTitle);
                                    reject(null);
                                }
                            }).
                            catch(function () {
                                // sucks
                                console.error('Article API error', unsafeTitle, arguments);
                                reject(null);
                            });
                    }
                });
            };

            return Articles;

        }]);

})();