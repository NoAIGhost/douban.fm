// 
// javascript: (function (j) { var s = document.createElement('script'); s.type = 'text/javascript'; s.src = j; document.getElementsByTagName('head')[0].appendChild(s); })('http:/' + '/github.com/solo7net/douban.fm/raw/master/douban.js');

//document.getElementsByTagName('head')[0].appendChild(s); )('https:/' + '/github.com/solo7net/douban.fm/raw/master/douban.js');
(function () {
    if (window.location.href.replace(/^http.*:\/\//,'') != 'douban.fm/mine/?type=liked#!type=liked') {
        alert('please visit https://douban.fm/mine/?type=liked#!type=liked');
        window.location.href = 'https://douban.fm/mine/?type=liked#!type=liked';
        return;
    }
    
    var count = $('#record_viewer .header .info .total').text().replace(/\D+/g, '');
    console.log("总数: %s",count);
    var tpage = parseInt((count / 15), 10) + 1;
    console.log("总页数: %s",tpage);
    var a = [];
    var page = 1;
    var n = 0;

    for (page = 1; page <= tpage; page++) {
        n = (page - 1) * 15;
        var url = "/j/play_record?ck=" + get_cookie("ck") + "&spbid=" + encodeURIComponent(window.SP + get_cookie("bid")) + "&type=liked&start=" + n;
        //console.log("n: %s", n);
        //console.log("url: %o", url);
        display('please wait .. (' + n + '/' + tpage + ')');
        $.ajax({
            type: "GET",
            url: url,
            async: false,
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.songs.length; i++) {
                    var b = data.songs[i].artist + '     ' + data.songs[i].title;
                    if (b!='') {
                        a.push(b);
                    }
                }
            }
        });
    }

    display('please wait ...');

    var b = [];
    for (var i = 0; i < a.length; i++) {

        var exist = false;
        for (var j = 0; j < b.length; j++) {
            if (b[j] == a[i]) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            b[b.length] = a[i];
        }
    }

    display(b.join("<br/>"));

    function display(s) {
        document.getElementsByTagName('body')[0].innerHTML = s;
    }
})();
