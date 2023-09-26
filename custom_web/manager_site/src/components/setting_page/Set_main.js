import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { minus_Mslide, plus_Mslide, change_set } from "../../store";
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

function Set_main(){

  let dispatch = useDispatch();
  let [mainSetting, setMainSetting] = useState();
  let [contents, setContents] = useState("");
  let store = useSelector((state)=>{return state});
  let main_slide = store.set_main_slide;
  let [ticking, setTicking] = useState();
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

  useEffect(()=>{
    if(mainSetting){
      setContents(mainSetting.title);
      dispatch(plus_Mslide(imgslide));
    }
    setTicking(false);
  }, [mainSetting])

  useMemo(()=>{
    if(ticking == true || ticking == undefined){
      $.ajax({
        type: "GET",
        url: "http://hunay.co.kr/portfolio/custom_web/slide.php",
        data: {
            table: 'slide_main'
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
            table:'admin_main'
        },
        dataType: "json",
        async: false,
        success : function(data){
          console.log(data);
          setMainSetting(data[0]);
        }
      });
    }
  }, [ticking]);

  const settings = {
    dots: false,
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  console.log(mainSetting, main_slide);
  if(mainSetting){
    return(
      <form id="mainSetting" data-whats="admin_main">
        <div className="row row1">
          <div className="title_con">
            <h4>메인페이지 설정</h4>
          </div>
          <div className="btn_con">
            <div className="btns temporary" onClick={()=>{
              if(window.confirm('메인페이지 설정을 초기화 시키시겠습니까?\n초기화 후 저장하여 홈페이지에 적용하시기 바랍니다.')){
                $("input[type='text']").val('');
                $("input[type='checkbox']").prop('checked', true);
                $("input[name='bgcolor']").val('#000000');
                $("input[name='transparent']").val(75);
                $(".opa span").text(75+"%");
                setContents('');
              }
            }}>
              <span>초기화</span>
            </div>
            <div className="btns apply" onClick={()=>{
                const this_form = $("form").attr("id");
                let whats = $("form").attr("data-whats");
                if(window.confirm('저장하시겠습니까?')){
                  post_ajax(this_form, whats, contents);
                  dispatch(change_set(0));
                }
              }}>
            <span>저장하기</span>
            </div>
          </div>
        </div>
        <div className="row row2">
          <div className="title_con">
            <h5>배경 이미지 / 슬라이드 설정</h5>
            {/* <span className="esenstial">*필수</span> */}
          </div>
          <p className="row_desc">사이트 메인페이지 내용을 설정해주세요</p>
          <div className="set_con slide">
            <ul>
              <Slider {...settings}>
                {main_slide == null || main_slide == '' ? null : main_slide.map(function(a, i){
                  return(
                    <Main_slide data={main_slide} key={i} val={i}/>
                  )
                })}
              </Slider>
            </ul>
            <div className="plus_slide">
              <label>
                <input type="file" name="img" onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>{
                  const this_form = document.getElementById("mainSetting");
                  let formData = new FormData(this_form);
                  formData.append('table', 'slide_main');
                  formData.append('code', 'slide');
                  //formData.append('img', e.target.value);
                  axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{console.log(result); setTicking(true)}).catch(()=>{
                    alert("이미지를 추가할 수 없습니다\n잠시 후에 다시 시도해주십시오.");
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
        <div className="row row3">
          <div className="title_con">
            <h5>배경 앞 투명 배경색 설정</h5>
            <div className="check_con">
              <label>
                <input className="input_check_hidden" name="bgcolor_show" type="hidden" value='N'></input>
                <input className="check_menu input_check" name="bgcolor_show" type="checkbox" value="Y" defaultChecked={mainSetting.bgcolor_show == "Y" ? true : false}></input>
                <div className="check_btn">
                  <span className="disabled">숨김</span>
                  <span className="abled">보임</span>
                  <div className="circle"></div>
                </div>
              </label>
            </div>
          </div>
          <p className="row_desc">배경이미지 앞에 투명 배경색을 설정합니다.</p>
          <div className="inpt_con">
            <input type="color" name="bgcolor" className="clr_input" defaultValue={mainSetting.bgcolor}></input>
            <div className="opacity_con">
            <input type="range" name="transparent" className="opacity_input" min={0} max={100} defaultValue={mainSetting.transparent} onChange={(e)=>{
                    let val = e.target.value;
                    $(".opa span").text(val+"%")
                  }}></input>
            <p className="opa"><span>{mainSetting.transparent}%</span>배경색 투명도</p>
            </div>
          </div>
        </div>
        <div className="row row4">
        <div className="title_con">
            <h5>타이틀문구 설정</h5>
            <div className="check_con">
              <label>
                <input className="input_check_hidden" name="title_show" type="hidden" value='N'></input>
                <input className="check_menu input_check" name="title_show" type="checkbox" value='Y' defaultChecked={mainSetting.title_show == "Y" ? true : false}></input>
                <div className="check_btn">
                  <span className="disabled">숨김</span>
                  <span className="abled">보임</span>
                  <div className="circle"></div>
                </div>
              </label>
            </div>
          </div>
          <p className="row_desc">해당 페이지 내 타이틀 문구를 설정해주세요</p>
          <div className="editor_con">
            <ReactQuill modules={modules} onChange={(e)=>{setContents(e);}} value={contents}></ReactQuill>
          </div>
        </div>
      </form>
    )
  }
  
}

function Main_slide(props){

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
          formData.append('table', 'slide_main');
          formData.append('img_no', props.data[props.val].img_no);
          formData.append('purpose', 'del');
          axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{console.log(result.data);}).catch(()=>{
            alert("이미지를 삭제할 수 없습니다\n잠시 후에 다시 시도해주십시오.");
          });
          for (const [key, value] of formData.entries()) {
            console.log(key, value);
          }
          dispatch(minus_Mslide(props.val));
        }}>
          <FontAwesomeIcon icon={faTrashCan}/>
          <p>이미지 삭제</p>
        </div>
        <img src={"data:image;base64,"+props.data[props.val].full_url}></img>
      </div>
    </li>
  )
}

export default Set_main