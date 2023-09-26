import axios from "axios";
import $ from "jquery";
import { useDispatch } from "react-redux";

function post_ajax(this_form, whats, contents, idfy){

  $("#"+this_form+" .input_check").each(function(){
    if($(this).is(':checked')){
      $(this).prev(".input_check_hidden").attr('disabled', true);
    }else{
      $("#"+this_form+" .input_check_hidden").attr('disabled', false);
    }
  });

  
  var testForm = document.getElementById(this_form);
  let formData = new FormData(testForm);

  formData.append('table', whats);
  formData.append('idfy', idfy);

  if(contents){
    formData.append('title', contents);
  }
  
  axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{
    console.log(result);
    alert('저장되었습니다');
  }).catch(()=>{
    alert('서버와의 연결이 끊겼습니다. 잠시 후 다시 시도해주십시오.');
    window.location.href = '/';
  });

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
   }

}

export default post_ajax;