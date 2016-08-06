(function($) {
    function buildSuggestion(title, artist, code) {
        title = title || '';
        artist = artist || '';
        code = code || '';
        return '<li class="collection-item suggestion">'
            + '<span class="title">' + title + '</span>'
            + '<p>' + artist + '</p>'
            + '<p>' + code + '</p>'
            + '</li>';
    }

  	$(function(){

        $('#search').bind('keyup', function(event) {
            var query = this.value;

            var xhr = $.get('http://192.168.2.9:8080/songs/suggest', {'query': query});
            xhr.done(function(data) {
                var sug = $('#suggestions');
                sug.empty();
                data.content.forEach(function(e) {
                    sug.append(buildSuggestion(e.title, e.artist, e.code));

                });
            });

        });

        $('#search-form').bind('submit', function(event) {
            event.preventDefault();
            $(event.target).find('input').blur();
            $(event.target).find('label').removeClass('active');
        });

  	});
})(jQuery);
