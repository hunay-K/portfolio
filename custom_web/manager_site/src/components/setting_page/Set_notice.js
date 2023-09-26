import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import $ from "jquery";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import post_ajax from "../../ajaxs";
import del_img from './del_fn';
import { change_set } from "../../store";


function Set_notice(){
  let [noticeSetting, setNoticeSetting] = useState();
  let [contents, setContents] = useState("");
  let [upload_logo_img, setUpload] = useState('');
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [del, setDel] = useState('N');
  

  useMemo(()=>{
    return $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_notice'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setNoticeSetting(data[0]);
      }
    });
  }, []);

  useEffect(()=>{
    if(noticeSetting){
      setContents(noticeSetting.title);
      if(noticeSetting.img !== null || noticeSetting.img !== undefined){
        setUpload(noticeSetting.img);
      }
    }
  }, [noticeSetting])

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

  console.log(noticeSetting);
  //console.log(upload_logo_img, noticeSetting.img)

  if(noticeSetting){
    return(
      <form id="noticeSetting" data-whats="admin_notice" data-idfy="admin_setting">
        <div className="row row1">
          <div className="title_con">
            <h4>공지&이벤트 페이지 설정</h4>
          </div>
          <div className="btn_con">
            <div className="btns temporary" onClick={()=>{
              if(window.confirm('공지&이벤트 페이지 설정을 초기화 시키시겠습니까?\n초기화 후 저장하여 홈페이지에 적용하시기 바랍니다.')){
                $("input[name='bgcolor']").val('#f5f5f5');
                $("input[name='transparent']").val(0);
                $(".opa span").text(0+"%");
              }
            }}>
              <span>초기화</span>
            </div>
            <div className="btns apply" onClick={()=>{
                const this_form = $("form").attr("id");
                let whats = $("form").attr("data-whats");
                let idfy = $("form").attr("data-idfy");
                if(window.confirm('저장하시겠습니까?')){
                  post_ajax(this_form, whats, contents, idfy);
                  dispatch(change_set(0));
                }
              }}>
              <span>저장하기</span>
            </div>
          </div>
        </div>
        <div className="row row2">
          <div className="title_con">
            <h5>배경 설정 (선택)</h5>
          </div>
          <p className="row_desc">해당페이지 배경 이미지와 색을 설정해주세요 / 이미지, 배경색 순으로 나타납니다. / 미입력시 기본값으로 적용</p>
          <div className="inner_con">
            <div className="input_con img_input">
              <label>
                <input type="file" name="img" onChange={(e)=>{
                  preview(e.target.files);
                }} accept="image/png, image/jpeg"></input>
                <div className="upload_img">
                  {upload_logo_img == '' ? <img src="img/basic/notice/notice_base.jpg"></img> : upload_logo_img !== '' && noticeSetting.img == '' ? <img src={upload_logo_img}></img> : <img src={"data:image;base64,"+upload_logo_img} alt="이미지 경로를 확인해주세요"></img>}
                </div>
              </label>
              {
                upload_logo_img == '' ? null : <div className="del_slide" onClick={()=>{
                  setDel('Y')
                  setUpload('');
                }}>
                  <FontAwesomeIcon icon={faTrashCan}/>
                </div>
              }
              <div className="ex_con">
                <input type="hidden" name="img_del" defaultValue={del}></input>
                <p className="row_desc">결과예시)</p>
                <img src="img/basic/notice/bgEx2.jpg"></img>
              </div>
            </div>
            <div className="opa_con">
              <div className="opacity_con">
                <input type="color" name="bgcolor" className="clr_input" defaultValue={noticeSetting.bgcolor}></input>
                <div className="range_con">
                  <input type="range" name="transparent" className="opacity_input" min={0} max={100} defaultValue={noticeSetting.transparent} onChange={(e)=>{
                    let val = e.target.value;
                    $(".opa span").text(val+"%")
                  }}></input>
                  <p className="opa"><span>{noticeSetting.transparent}%</span>배경색 투명도</p>
                </div>
              </div>
              <div className="ex_con">
                <p className="row_desc">결과예시)</p>
                <img src="img/basic/notice/bgEx1.jpg"></img>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row row3">
          <div className="title_con">
            <h5>타이틀문구 설정</h5>
            <div className="check_con">
              <label>
                <input className="input_check_hidden" name="title_show" type="hidden" value='N'></input>
                <input className="check_menu input_check" name="title_show" type="checkbox" value='Y' defaultChecked={noticeSetting.row.title_show == "Y" ? true : false}></input>
                <div className="check_btn">
                  <span className="disabled">숨김</span>
                  <span className="abled">보임</span>
                  <div className="circle"></div>
                </div>
              </label>
            </div>
          </div>
          <p className="row_desc">해당페이지 내 타이틀 문구를 설정해주세요</p>
          <div className="editor_con">
            <ReactQuill onChange={(e)=>{setContents(e);}} value={contents}></ReactQuill>
          </div>
        </div> */}
      </form>
    )
  }
}

export default Set_notice