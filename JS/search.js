
$(document).ready(function () {
    let pageNum = 1;
    let total = 0;
    let count = 0;

    $("#btn01").click(function () {
        let target = $("select[name='target'] option:selected").val();
        let search = $("input[name='search']").val();
        $('#result').html('')
        window.location.href =
            "search.html?target=" + target + "&search=" + search;
    });

    /*메인 search버튼 클릭시 */
    let urlSearch = new URLSearchParams(location.search);
    let search = urlSearch.get("search"); /*타이틀의 값이 들어감*/
    let target = urlSearch.get("target"); /*타이틀의 값이 들어감*/
    if (search != null) {
        if (target == "person") {
            $("select[name='target'] option:eq(1)").prop("selected", true);
        }
        $("input[name='search']").val(search);
        getList(target, search);
    } else if (search == null) {
        getList("title", "안녕하세요");
        $("input[name='search']").focus();
    }

    $("input[name='search']").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#result").html("");
            let target = $("select[name='target'] option:selected").val();
            let search = $("input[name='search']").val();
            window.location.href =
                "search.html?target=" + target + "&search=" + search;
        }
    });

    $(window).scroll(function () {
        let target = $("select[name='target'] option:selected").val();
        let search = $("input[name='search']").val();
        if (
            count > total &&
            Math.ceil($(window).scrollTop()) + $(window).height() >=
                $(document).height()
        ) {
            pageNum++;
            getList(target, search);
        }
    });

    function getList(target, search) {
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?", 
            // target: _target,

            data: { query: search, target: target, page: pageNum },
            headers: {
                Authorization: "KakaoAK 88096a4831820b998a263b6f42ca9391",
            },
        }).done(function (msg) {
            console.log(msg);
            // console.log(pageNum);
            // console.log(target);
            // console.log(search);

            count = msg.meta.total_count;
            total += msg.documents.length;
            // console.log(count);
            // console.log(total);

            for (var i = 0; i < msg.documents.length; i++) {
                if (msg.documents[i].thumbnail == "") {
                    msg.documents[i].thumbnail =
                        "http://contest.wowtv.co.kr/src/images/noImg.gif";
                }
                $("#result").append(`
                        <div class="card mb-3 " style="max-width: 800px; min-width: 800px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${msg.documents[i].thumbnail}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${msg.documents[i].title}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${msg.documents[i].authors}</h6>
                                        <p class="card-text">${msg.documents[i].contents}...</p>
                                        <p class="card-text"><small class="text-muted">${msg.documents[i].price}원</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
            }
        });
    }
});
