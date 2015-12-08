angular.module('ductia').controller('bookCtrl', function($scope, bookFactory, $routeParams) {
  $scope.Books = [];
  $scope.Book = {
    title: 'Book not Found'
  };
  if (!!$routeParams.isbn) {

    var model = new falcor.Model({source: new falcor.HttpDataSource('/falcor_router.json') });

    // model.
    //   get(
    //     'books["' + $routeParams.isbn + '"].["title", "isbn13","publicationDate"]',
    //     'books["' + $routeParams.isbn + '"].["piecesInBook"][1..10].["title", "composer"]'
    //   ).
    //   then(function(response) {
    //     alert(JSON.stringify(response,null,3));
    //   });


      model.
        get(
        // 'bookCoverageByExamDesc["examBoards"]["abrsm"].["instruments"]["flute"]["books"][1..3]["total"]',
        // 'bookCoverageByExamDesc["examBoards"]["abrsm"].["instruments"]["flute"]["books"][1..3]["title"]["title", "publicationDate"]',
        // 'bookCoverageByExamDesc["examBoards"]["abrsm"].["instruments"]["flute"]["books"][1..3]["grades"][1..5]'
        'booksByCoverage'
        ).
        then(function(response) {
          alert(JSON.stringify(response,null,3));
        });

    $scope.Book = bookFactory.get({isbn: $routeParams.isbn});
  } else {
    $scope.Books = bookFactory.query();
  }
});
