(function($) {
    function buildSuggestion(title, artist, code)
    {
        title = title || '';
        artist = artist || '';
        code = code || '';
        return '<li class="collection-item suggestion">'
            + '<span class="title">' + title + '</span>'
            + '<p>' + artist + '</p>'
            + '<p>' + code + '</p>'
            + '</li>';
    }

    function populateSuggestions(query, count)
    {
        var container = $('#suggestions');
        var xhr = $.get('/songs/suggest',
            {'query': query, 'count': count});
        xhr.done(function(data) {
            container.empty();
            data.content.forEach(function(e) {
                container.append(buildSuggestion(e.title, e.artist, e.code));
            });
        });
    }

  	$(function(){


        $('#search').bind('keyup', function(event)
        {
            populateSuggestions(this.value, 10);
        });

        $('#search-form').bind('submit', function(event)
        {
            event.preventDefault();

            var target = $(event.target);
            var input = target.find('input');

            populateSuggestions(input.val(), 50);
            input.blur();
            target.find('label').removeClass('active');
        });
  	});
})(jQuery);
