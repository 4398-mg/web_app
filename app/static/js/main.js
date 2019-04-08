var profileID = null;
var profileEmail = null;
var loggedIn = false;

function onSignIn(googleUser) {
    $('.g-signin2').hide();
    $('.signout').show();

    var profile = googleUser.getBasicProfile();
    profileID = googleUser.getAuthResponse().id_token;;
    profileEmail = profile.getEmail();
    console.log('ID: ' + profileID); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    $('#greeting')[0].innerText = 'Hey there, ' + profile.getName().split(' ')[0] + '!';

    let paramsObj = {
        "profileID": profileID,
        "profileEmail": profileEmail
    };

    loggedIn = true;

    request('POST', api_url + '/history', { json: paramsObj }).done((res) => {
        console.log('Get History:');
        if (res.statusCode != 200) {
            return;
        }
        let historyObj = JSON.parse(res.getBody()).history;

        for (var i = 0; i < historyObj.length; i++) {
            let respObj = historyObj[i];
            console.log(respObj);
            let htmlHistoryObj = `
                <li class="history-entry">
                    <div>
                        ${respObj.song_name}
                        <a href="${respObj.location}" class="download-song"
                           download="">
                            <i class="fa fa-download"></i>
                        </a>
                        <a href="#" class="delete-song" value="${respObj.song_id}">
                            <i class="fa fa-trash"></i>
                        </a>
                        <span class="song-ts">
                            Generated on
                            ${moment(respObj.timestamp).format('MMMM Do YYYY, [at] h:mm a')}
                        </span>
                        
                    </div>
                    <div>
                        <audio controls>
                            <source src="${respObj.location}" type="audio/mpeg">
                            Could not find Audio Resource.
                        </audio>
                    </div>
                </li>`;

            $('#empty-history').hide();
            $('.history-contents').prepend(htmlHistoryObj);
        }

        console.log(historyObj);
    });
}

$(document).ready(function () {

    // Hide indicator that scripts aren't loading
    $("#js-off-warning").hide();
    // Hide warning that cookies aren't enabled
    if (navigator.cookiesEnabled) {
        $("#cookies-off-warning").hide();
    }

    $('.cycle-up').on('click', function (event) {

        var current = null;
        for (var i = 0; i < this.nextElementSibling.children.length; i++) {
            if (this.nextElementSibling.children[i].className !== "hide-value") {
                this.nextElementSibling.children[i].className = "hide-value";
                if (i === 0) {
                    this.nextElementSibling.children[this.nextElementSibling.children.length - 1].className = "";
                } else {
                    console.log(i + 1)
                    this.nextElementSibling.children[(i - 1)].className = "";
                }
                break;
            }
        }
        event.preventDefault();
    });

    $('.cycle-down').on('click', function (event) {


        console.log($(this.previousElementSibling));
        var current = null;
        for (var i = 0; i < this.previousElementSibling.children.length; i++) {
            if (this.previousElementSibling.children[i].className !== "hide-value") {
                this.previousElementSibling.children[i].className = "hide-value";
                if (i === this.previousElementSibling.children.length - 1) {
                    this.previousElementSibling.children[0].className = "";
                } else {
                    console.log(i + 1)
                    this.previousElementSibling.children[(i + 1)].className = "";
                }
                break;
            }
        }
        event.preventDefault();
    });

    $(document.body).on('click', '.delete-song', function (event) {
        console.log("delete this song");
        console.dir(this);

        event.preventDefault();
    });

    $('#gen').on('submit', function (event) {

        $('#loading-div').show();

        let genre = this.children[0].children[2].innerText;
        let tempo = this.children[1].children[2].innerText;
        let duration = this.children[2].children[2].innerText;

        let paramsObj = {
            "genre": genre,
            "tempo": tempo,
            "duration": duration,
            "profileID": profileID,
            "profileEmail": profileEmail
        }
        console.log(api_url);
        request('POST', api_url + '/generate_song', { json: paramsObj }).done((res) => {
            $('#loading-div').hide();

            let respObj = JSON.parse(res.getBody());
            if (!(loggedIn)) {
                let historyObj = `
                <li class="history-entry">
                    <div>
                        ${respObj.song_name}
                        <a href="${respObj.location}" class="download-song"
                           download="">
                            <i class="fa fa-download"></i>
                        </a>
                        <span class="song-ts">
                            Generated on
                            ${moment(respObj.timestamp).format('MMMM Do YYYY, [at] h:mm a')}
                        </span>
                        
                    </div>
                    <div>
                        <audio controls>
                            <source src="${respObj.location}" type="audio/mpeg">
                            Could not find Audio Resource.
                        </audio>
                    </div>
                </li>`;
            } else {
                let historyObj = `
                <li class="history-entry">
                    <div>
                        ${respObj.song_name}
                        <a href="${respObj.location}" class="download-song"
                           download="">
                            <i class="fa fa-download"></i>
                        </a>
                        <a href="#" class="delete-song" value="${respObj.song_id}">
                            <i class="fa fa-trash"></i>
                        </a>
                        <span class="song-ts">
                            Generated on
                            ${moment(respObj.timestamp).format('MMMM Do YYYY, [at] h:mm a')}
                        </span>
                        
                    </div>
                    <div>
                        <audio controls>
                            <source src="${respObj.location}" type="audio/mpeg">
                            Could not find Audio Resource.
                        </audio>
                    </div>
                </li>`;
            }


            $('#empty-history').hide();
            $('.history-contents').prepend(historyObj);


        });


        event.preventDefault();

    });

    function report_response(argument) {
        console.log("finished")
        console.log(argument);
    }

    // https://stackoverflow.com/questions/37824377/detect-if-cookies-are-enabled-in-the-browser
    function trySetCookie() {
        setCookie("testCookie", "testValue", 1);
        var cookieValue = getCookie("testCookie");
        if (cookieValue == "" || cookieValue == null)
            return false;
        return true;
    }

});
