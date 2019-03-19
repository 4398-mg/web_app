$(document).ready(function () {
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

    $('#gen').on('submit', function (event) {

        let genre = this.children[0].children[2].innerText;
        let tempo = this.children[1].children[2].innerText;
        let duration = this.children[2].children[2].innerText;

        let paramsObj = {
            "genre": genre,
            "tempo": tempo,
            "duration": duration
        }

        request('POST', 'http://3.16.26.98:1337/echo', { json: paramsObj }).done((res) => {
            console.log('success');
            console.log(res.getBody());
        });

        event.preventDefault();

    });

    function report_response(argument) {
        console.log("finished")
        console.log(argument);
    }

});