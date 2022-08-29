function myFunction() {
    /*햄버거 클릭했을떄 실행*/
    // responsive 클래스를 토글 시킴
    let x = document.getElementById("myTopnav");
    x.classList.toggle("responsive");
}

/*로그인 유효성*/
var emailPat = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    
function checkLogin(){
    
    let frmLogin = document.forms['frm1'];
    let email = frmLogin.email.value.trim();
    let password = frmLogin.password.value.trim();
    if(!emailPat.test(email)){
        alert('유효한 이메일 형식이 아닙니다.');
        frmLogin.email.focus();
        return false;
    }
    if(password == ''){
        alert('비밀번호를 다시 확인해주세요.')
        frmLogin.password.focus();
        return false;
    }
    alert('로그인이 완료되었습니다.')
};

/*회원가입 유효성*/ 

// function checkJoin(){

//     let frmJogin = document.forms['frm2'];
//     let name = frmJogin.name.value.trim();
    // let password = frmLogin.password.value.trim();
    // if(!emailPat.test(email)){
    //     alert('유효한 이메일 형식이 아닙니다.');
    //     frmLogin.email.focus();
    //     return false;
    // }
    // if(name == ''){
    //     alert('비밀번호를 다시 확인해주세요.')
    //     frmJogin.classList.add('was-validated');
    //     return false;
    // }
    // alert('로그인이 완료되었습니다.')
// };
window.addEventListener('load', () => {
    const forms = document.getElementsByClassName('validation-form');
    console.log(forms);
    // let name = forms.name.value().trim();
    // alert(name);
    // console.log(name);
    Array.prototype.filter.call(forms, (form) => {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        
        form.classList.add('was-validated');
    }, false)
    
})
  }, false)

$(document).ready(function(){

    /*회원가입 모달*/
    var modal_box = document.getElementById("modal_box");
    var join = document.getElementById("bnt-join");
    var bnt_close = document.getElementsByClassName("btn-close")[0];
    
    join.onclick = function (){
        modal_box.style.display = "block";
    };
    bnt_close.onclick = function () {
        modal_box.style.display = "none";
    };
    
});




$(document).ready(function () {
    //다음 우편번호 + 주소 찾기
    $("#address").click(function () {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ""; // 주소 변수
                var extraAddr = ""; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === "R") {
                    // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else {
                    // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === "R") {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== "" && data.apartment === "Y") {
                        extraAddr +=
                            extraAddr !== ""
                                ? ", " + data.buildingName
                                : data.buildingName;
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraAddr !== "") {
                        extraAddr = " (" + extraAddr + ")";
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("address").value = extraAddr;
                } else {
                    document.getElementById("address").value = "";
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('post').value = data.zonecode;
                document.getElementById("address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("address2").focus();
            },
        }).open();
    });
});