import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { change_page } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import axios from "axios";

function Edit_profile(){

  let dispatch = useDispatch();
  let [upload_logo_img, setUpload] = useState('');
  let [profile, setProfile] = useState();
  let [del, setDel] = useState('N');
  let navigate = useNavigate();
  let id = window.localStorage.getItem('id');
  let login_key = window.localStorage.getItem('login_key');
  const config = {
    headers : {
      'Authorization': `Bearer ${login_key}`
    }
  }
  console.log(id);

  useEffect(()=>{
    dispatch(change_page(''));
    if(profile){
      setUpload(profile.img_url);
    }
  }, [profile]);
  

  useMemo(()=>{
    return $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_profile'
      },
      dataType: "json",
      async: false,
      success : function(data){
        setProfile(data[0]);
      }
  });
  }, []);

  function preview(input){
    if (input.length !== 0) {
      console.log(input);
      var reader = new FileReader();
      reader.onload = function(e) {
        setUpload(e.target.result);
      };
      reader.readAsDataURL(input[0]);
    } else {
      return;
    }
  }

  console.log(profile);

  if(profile){
    return(
      <div className="sections main">
        <div className="width_con">
          <h3>기본 정보 관리</h3>
          <div className="profile_con">
            <div className="col col1">
              <form id="profileSetting" data-whats="profile" encType = "multipart/form-data">
                <h5>프로필</h5>
                <p className="col_desc">최대 2MB까지 1:1 정사각형 사이즈로 올리면<br></br>이미지 찌그러짐 없이 잘 나옵니다.</p>
                <div className="input_con">
                  <label>
                    <input type="file" name="img" accept="image/png, image/jpeg" onChange={(e)=>{preview(e.target.files)}}></input>
                    <div className="upload_img">
                      {upload_logo_img == '' || upload_logo_img == null ? <img src="img/header/profile_base.png"></img> : profile.img_url == '' && upload_logo_img !== '' ? <img src={upload_logo_img} alt="이미지 경로를 확인해주세요"></img> : <img src={"data:image;base64,"+upload_logo_img} alt="이미지 경로를 확인해주세요"></img>}
                    </div>
                  </label>
                  {
                    upload_logo_img == '' ? null : 
                    <div className="del_slide">
                      <span onClick={()=>{
                        setDel('Y')
                        setUpload('');
                      }}><FontAwesomeIcon icon={faTrashCan}/></span>
                    </div>
                  }
                  <input type="hidden" name="img_del" defaultValue={del}></input>
                  <input type="text" name="nick_name" placeholder="닉네임" defaultValue={profile.nick_name}></input>
                </div>
              </form>
              <div className="btns save" onClick={()=>{
                const this_form = document.getElementById("profileSetting");
                let formData = new FormData(this_form);
                formData.append('table', 'admin_profile');
                for (const [key, value] of formData.entries()) {
                  console.log(key, value);
                 }
                if(window.confirm("저장하시겠습니까?")){
                  axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{
                    console.log(result);
                    alert('저장되었습니다');
                    window.location.href = 'http://hunay.co.kr/portfolio/custom_web/manager/';
                  }).catch(()=>{
                    alert('서버와의 연결이 끊겼습니다. 잠시 후 다시 시도해주십시오.');
                    window.location.href = 'http://hunay.co.kr/portfolio/custom_web/manager/';
                  });
                }
              }}><span>변경 사항 저장</span></div>
            </div>
            <div className="col col2">
              <div className="row row1">
                <h5>관리자 정보</h5>
                <p className="row_desc">※ 수정은 불가합니다!</p>
                <ul>
                  <li>
                    <h6 className="name_tit">이름</h6>
                    <span className="name_val">{profile.name}</span>
                  </li>
                  <li>
                    <h6 className="id_tit">아이디</h6>
                    <span className="id_val">{profile.user_id}</span>
                  </li>
                  <li>
                    <h6 className="tel_tit">전화번호</h6>
                    <span className="tel_val">{profile.user_tel}</span>
                  </li>
                  <li>
                    <h6 className="email_tit">이메일</h6>
                    <span className="email_val">{profile.email}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Edit_profile;