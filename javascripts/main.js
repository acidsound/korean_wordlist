(function() {
  this.words = new Blaze.Var([]);

  this.apiKey = "eq1poRtCI92CplL2Z56zGVMvDDUUxgqp";

  Template.main.rendered = function() {
    var query;
    query = location.search && location.search.split('?q=')[1];
    if (query) {
      $('input').val(decodeURIComponent(query));
      return $('form').submit();
    }
  };

  Template.main.events({
    'submit': function(e, tpl) {
      var query;
      e.preventDefault();
      query = tpl.find("input").value;
      if (query != null) {
        return $.getJSON("https://api.mongolab.com/api/1/databases/koreandict/collections/words?apiKey=" + apiKey + "&q=" + query, function(result) {
          return words.set(result);
        }).fail(function(error) {
          words.set([]);
          return console.log('fail');
        });
      }
    }
  });

  Template.main.helpers({
    words: function() {
      var word, _i, _len, _ref, _results;
      _ref = words.get();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        _results.push({
          word: word.word,
          raw: word.raw
        });
      }
      return _results;
    }
  });

}).call(this);
