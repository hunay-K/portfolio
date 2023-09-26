import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { change_set } from "../../store";
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



function Set_map(){
  let [mapSetting, setMapSetting] = useState();
  let [upload_img, setUpload] = useState('');
  let [upload_img2, setUpload2] = useState('');
  let dispatch = useDispatch();
  let [del, setDel] = useState('N');
  let [del2, setDel2] = useState('N');

  useMemo(()=>{
    return $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_map'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setMapSetting(data[0]);
      }
    });
  }, []);

  useEffect(()=>{
    if(mapSetting){
      if(mapSetting.img !== null){
        setUpload(mapSetting.img);
      }
      setUpload2(mapSetting.img2);
    }
  }, [mapSetting])

  function preview(input, a){
    if (input.length !== 0) {
      console.log(input);
      var reader = new FileReader();
      reader.onload = function(e) {
        if(a == 2){
          setUpload2(e.target.result);
        }else{
          setUpload(e.target.result);
        }
      };
      reader.readAsDataURL(input[0]);
    } else {
      return;
    }
  }

  console.log(mapSetting);
  

  if(mapSetting){
    return(
      <form id="mapSetting" data-whats="admin_map" data-idfy="admin_setting_map">
        <div className="row row1">
          <div className="title_con">
            <h4>오시는길 페이지 설정</h4>
          </div>
          <div className="btn_con">
            <div className="btns temporary" onClick={()=>{
              if(window.confirm('오시는길 페이지 설정을 초기화 시키시겠습니까?\n초기화 후 저장하여 홈페이지에 적용하시기 바랍니다.')){
                $("input[type='text']").val('');
                $("textarea").val('');
                $("input[type='checkbox']").prop('checked', true);
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
                  post_ajax(this_form, whats, idfy);
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
                <input type="file" name="img" accept="image/png, image/jpeg" onChange={(e)=>{
                  preview(e.target.files);
                  setDel('N');
                }}></input>
                <div className="upload_img">
                  {upload_img == '' ? <img src="img/basic/notice/notice_base.jpg"></img> : upload_img !== '' && mapSetting.img == '' ? <img src={upload_img}></img> : <img src={"data:image;base64,"+upload_img} alt="이미지 경로를 확인해주세요"></img>}
                </div>
              </label>
              {
                upload_img == '' ? null : <div className="del_slide" onClick={()=>{
                  setUpload('');
                  setDel('Y');
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
                <input type="color" name="bgcolor" className="clr_input" defaultValue={mapSetting.bgcolor}></input>
                <div className="range_con">
                  <input type="range" name="transparent" className="opacity_input" min={0} max={100} defaultValue={mapSetting.transparent} onChange={(e)=>{
                    let val = e.target.value;
                    $(".opa span").text(val+"%")
                  }}></input>
                  <p className="opa"><span>{mapSetting.transparent}%</span>배경색 투명도</p>
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
            <h5>위치정보 설정</h5>
          </div>
          <p className="row_desc">해당페이지 내 위치정보를 설정해주세요</p>
          <div className="main_con">
            <ul className="lists">
              <li>
                <div className="img_con">
                  <img src="img/basic/map/map_address.png"></img>
                </div>
                <div className="desc_con">
                  <div className="title_con">
                    <h4>주소 및 연락처</h4>
                    <span className="esenstial">*필수</span>
                  </div>
                  <input type="text" name="addr" placeholder="주소를 입력해주세요" defaultValue={mapSetting.addr}></input>
                  <input type="text" name="tel" placeholder="대표번호를 입력해주세요" defaultValue={mapSetting.tel}></input>
                </div>
              </li>
              <li>
                <div className="img_con">
                  <img src="img/basic/map/map_subway.png"></img>
                </div>
                <div className="desc_con">
                  <div className="title_con">
                    <h4>지하철 이용시</h4>
                    <div className="check_con">
                      <label>
                        <input className="input_check_hidden" name="subway_show" type="hidden" value='N'></input>
                        <input className="check_menu input_check" name="subway_show" type="checkbox" value='Y' defaultChecked={mapSetting.subway_show == "Y" ? true : false}></input>
                        <div className="check_btn">
                          <span className="disabled">숨김</span>
                          <span className="abled">보임</span>
                          <div className="circle"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <textarea name="subway" className="subus" placeholder="주변 지하철 정보를 입력해주세요" defaultValue={mapSetting.subway}></textarea>
                </div>
              </li>
              <li>
                <div className="img_con">
                  <img src="img/basic/map/map_bus.png"></img>
                </div>
                <div className="desc_con">
                  <div className="title_con">
                    <h4>버스 이용시</h4>
                    <div className="check_con">
                      <label>
                        <input className="input_check_hidden" name="bus_show" type="hidden" value='N'></input>
                        <input className="check_menu input_check" name="bus_show" type="checkbox" value='Y' defaultChecked={mapSetting.bus_show == "Y" ? true : false}></input>
                        <div className="check_btn">
                          <span className="disabled">숨김</span>
                          <span className="abled">보임</span>
                          <div className="circle"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <textarea name="bus" className="subus" placeholder="주변 버스 정보를 입력해주세요" defaultValue={mapSetting.bus}></textarea>
                </div>
              </li>
            </ul>
            <div className="conts">
              <div className="title_con">
                <h5>이미지 캡쳐본 업로드</h5>
              </div>
              <p className="row_desc">위치 이미지를 업로드해주세요</p>
              <input type="hidden" name="img_del2" defaultValue={del2}></input>
              <div className="input_con img_input">
                <label>
                <input type="file" name="img2" accept="image/png, image/jpeg" onChange={(e)=>{preview(e.target.files, 2); setDel2('N');}}></input>
                  <div className="upload_img">
                   {upload_img2 == '' ? <img src="img/basic/notice/notice_base.jpg"></img> : upload_img2 !== '' && mapSetting.img2 == '' ? <img src={upload_img2}></img> : <img src={"data:image;base64,"+upload_img2} alt="이미지 경로를 확인해주세요"></img>}
                  </div>
                </label>
                {
                upload_img2 == '' ? null : <div className="del_slide" onClick={()=>{
                  setUpload2('');
                  setDel2('Y');
                }}>
                  <FontAwesomeIcon icon={faTrashCan}/>
                </div>
              }
              </div>
              <div className="map_link_con">
                <img src="img/basic/map/map_link.png"></img>
                <input type="text" name="google" placeholder="해당 매장 포털 사이트 지도 링크를 입력하세요" defaultValue={mapSetting.google}></input>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Set_map