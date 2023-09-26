import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { minus_Aslide, plus_Aslide, change_set } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import post_ajax from "../../ajaxs";
import del_img from './del_fn';

function Set_around(){

  let dispatch = useDispatch();
  let [aroundSetting, setAroundSetting] = useState();
  let [contents, setContents] = useState("");
  let store = useSelector((state)=>{return state});
  let around_slide = store.set_around_slide;
  let [ticking, setTicking] = useState();
  let [upload_logo_img, setUpload] = useState('');
  let [imgslide, setimgs] = useState();

  const modules = {
    toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
          ['clean']
        ],
    }
  }

  useMemo(()=>{
    if(ticking == true || ticking == undefined){
      $.ajax({
        type: "GET",
        url: "http://hunay.co.kr/portfolio/custom_web/slide.php",
        data: {
            table: 'slide_around'
        },
        dataType: "json",
        async: false,
        success : function(data){
          console.log(data);
          setimgs(data);
        }
      });
      $.ajax({
        type: "GET",
        url: "http://hunay.co.kr/portfolio/custom_web/get.php",
        data: {
            table:'admin_around'
        },
        dataType: "json",
        async: false,
        success : function(data){
          console.log(data);
          setAroundSetting(data[0]);
        }
      });
    }
  }, [ticking]);

  useEffect(()=>{
    if(aroundSetting){
      setContents(aroundSetting.title);
      dispatch(plus_Aslide(imgslide));
      if(aroundSetting.img !== null){
        //setUpload(aroundSetting.img[0].full_url);
      }
    }
    setTicking(false);
  }, [aroundSetting])

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

  const settings = {
    dots: false,
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  console.log(aroundSetting)
  
  if(aroundSetting){
    return(
      <form id="aroundSetting" data-whats="admin_around" data-idfy="admin_setting">
        <div className="row row1">
          <div className="title_con">
            <h4>둘러보기 페이지 설정</h4>
          </div>
          <div className="btn_con">
            <div className="btns temporary" onClick={()=>{
              if(window.confirm('둘러보기 페이지 설정을 초기화 시키시겠습니까?\n초기화 후 저장하여 홈페이지에 적용하시기 바랍니다.')){
                $("input[type='checkbox']").prop('checked', true);
                $("input[name='bgcolor']").val('#f5f5f5');
                $("input[name='transparent']").val(0);
                $(".opa span").text(0+"%");
                setContents('');
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
            {/* <div className="input_con img_input">
              <label>
                <input type="file" name="file" accept="image/png, image/jpeg" onChange={(e)=>{
                  preview(e.target.files);
                  if(aroundSetting.img !== null){
                    del_img(aroundSetting.img);
                  }
                }}></input>
                <div className="upload_img">
                  {upload_logo_img == '' ? <img src="img/basic/notice/notice_base.jpg"></img> : <img src={upload_logo_img} alt="이미지 경로를 확인해주세요"></img>}
                </div>
              </label>
              {
                upload_logo_img == '' ? null : <div className="del_slide" onClick={()=>{
                  if(aroundSetting.img !== null){
                    del_img(aroundSetting.img);
                  }
                  setUpload('');
                }}>
                  <FontAwesomeIcon icon={faTrashCan}/>
                </div>
              }
              <div className="ex_con">
                <p className="row_desc">결과예시)</p>
                <img src="img/basic/notice/bgEx2.jpg"></img>
              </div>
            </div> */}
            <div className="opa_con">
              <div className="opacity_con">
                <input type="color" name="bgcolor" className="clr_input" defaultValue={aroundSetting.bgcolor}></input>
                <div className="range_con">
                  <input type="range" name="transparent" className="opacity_input" min={0} max={100} defaultValue={aroundSetting.transparent} onChange={(e)=>{
                    let val = e.target.value;
                    $(".opa span").text(val+"%")
                  }}></input>
                  <p className="opa"><span>{aroundSetting.transparent}%</span>배경색 투명도</p>
                </div>
              </div>
              <div className="ex_con">
                <p className="row_desc">결과예시)</p>
                <img src="img/basic/notice/bgEx1.jpg"></img>
              </div>
            </div>
          </div>
        </div>
        <div className="row row3">
          <div className="title_con">
            <h5>타이틀문구 설정</h5>
            <div className="check_con">
              <label>
                <input className="input_check_hidden" name="title_show" type="hidden" value='N'></input>
                <input className="check_menu input_check" name="title_show" type="checkbox" value='Y' defaultChecked={aroundSetting.title_show == "Y" ? true : false}></input>
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
            <ReactQuill modules={modules} onChange={(e)=>{setContents(e);}} value={contents}></ReactQuill>
          </div>
        </div>
        <div className="row row4">
          <div className="title_con">
            <h5>이미지 슬라이드 설정</h5>
            {/* <span className="esenstial">*필수</span> */}
            {/* <div className="check_con">
              <label>
                <input className="check_menu" name="check_around_slide" type="checkbox" value='Y'></input>
                <div className="check_btn">
                  <span className="disabled">숨김</span>
                  <span className="abled">보임</span>
                  <div className="circle"></div>
                </div>
              </label>
            </div> */}
          </div>
          <p className="row_desc">사이트 내 일반 슬라이드에 들어갈 이미지를 설정해주세요!</p>
          <div className="set_con slide">
            <ul>
              <Slider {...settings}>
                {around_slide == null || around_slide == '' ? null : around_slide.map(function(a, i){
                  return(
                    <Around_slide data={around_slide} key={i} val={i}/>
                  )
                })}
              </Slider>
            </ul>
            <div className="plus_slide">
              <label>
                <input type="file" name="img" onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>{
                  const this_form = document.getElementById("aroundSetting");
                  let formData = new FormData(this_form);
                  formData.append('table', 'slide_around');
                  formData.append('code', 'slide');
                  axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{console.log(result); setTicking(true)}).catch(()=>{
                    alert("이미지를 추가할 수 없습니다.\n잠시 후에 다시 시도해주십시오.");
                  });
                  for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                  }
                }} accept="image/png, image/jpeg"></input>
                <FontAwesomeIcon icon={faPlus}/>
                <p>이미지 추가</p>
              </label>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function Around_slide(props){

  let dispatch = useDispatch();

  let [hover, setHover] = useState(false);

  const mouseover = () => {
    setHover(true);
  }

  const mouseleave = () => {
    setHover(false);
  }
  
  return(
    <li>
      <div className={hover == true ? "img_con on" : "img_con"} onMouseOver={mouseover} onMouseOut={mouseleave}>
        <div className="del_slide" onClick={()=>{
          let formData = new FormData();
          formData.append('table', 'slide_around');
          formData.append('img_no', props.data[props.val].img_no);
          formData.append('purpose', 'del');
          axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{console.log(result);}).catch(()=>{
            alert("이미지를 삭제할 수 없습니다.\n잠시 후에 다시 시도해주십시오.");
          });
          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }
          dispatch(minus_Aslide(props.val))
        }}>
          <FontAwesomeIcon icon={faTrashCan}/>
          <p>이미지 삭제</p>
        </div>
        <img src={"data:image;base64,"+props.data[props.val].full_url}></img>
      </div>
    </li>
  )
}

export default Set_around