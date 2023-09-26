import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import { change_page, change_set, minus_list, plus_list } from "../store";
import {Set_header, Set_main, Set_notice, Set_around, Set_charge, Set_review, Set_vod, Set_map} from './setting_page/setting_page';
import './setting_page/set.css';
import axios from "axios";
import $ from 'jquery';

function Basic(props){


  let store = useSelector((state)=>{return state.current_set});
  let select = store;
  let [menuSetting, setMenuSetting] = useState();
  let id = window.localStorage.getItem('id');

  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch(change_page('basic'));
  }, [menuSetting]);

  useMemo(()=>{
    
    return $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_basic'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setMenuSetting(data[0]);
      }
  });
  }, []);

  console.log(menuSetting);

  if(menuSetting){
    return(
      <div className="sections basic">
        <div className="width_con">
          <h3>홈페이지 설정</h3>
          <ul className="tabs">
            <li onClick={()=>{
              dispatch(change_set(0))
            }} className={select == 0 ? "on" : null}>
              <h5>기본</h5>
            </li>
            <li onClick={()=>{
              dispatch(change_set(1))
            }} className={select == 1 ? "on" : null}>
              <h5>메인페이지</h5>
            </li>
            <li onClick={()=>{
              dispatch(change_set(2))
            }} className={select == 2 ? "on" : null}>
              <h5>공지&이벤트</h5>
              <div className="status">
                {
                  menuSetting.notice_show == "Y" ? <span className="on">적용중</span> : <span className="off">숨김중</span>
                }
              </div>
            </li>
            <li onClick={()=>{
              dispatch(change_set(3))
            }} className={select == 3 ? "on" : null}>
              <h5>둘러보기</h5>
              <div className="status">
                {
                  menuSetting.around_show == "Y" ? <span className="on">적용중</span> : <span className="off">숨김중</span>
                }
              </div>
            </li>
            <li onClick={()=>{
              dispatch(change_set(4))
            }} className={select == 4 ? "on" : null}>
              <h5>이용요금</h5>
              <div className="status">
                {
                  menuSetting.charge_show == "Y" ? <span className="on">적용중</span> : <span className="off">숨김중</span>
                }
              </div>
            </li>
            <li onClick={()=>{
              dispatch(change_set(5))
            }} className={select == 5 ? "on" : null}>
              <h5>이용후기</h5>
              <div className="status">
                {
                  menuSetting.review_show == "Y" ? <span className="on">적용중</span> : <span className="off">숨김중</span>
                }
              </div>
            </li>
            <li onClick={()=>{
              dispatch(change_set(6))
            }} className={select == 6 ? "on" : null}>
              <h5>홍보영상</h5>
              <div className="status">
                {
                  menuSetting.vod_show == "Y" ? <span className="on">적용중</span> : <span className="off">숨김중</span>
                }
              </div>
            </li>
            <li onClick={()=>{
              dispatch(change_set(7))
            }} className={select == 7 ? "on" : null}>
              <h5>오시는길</h5>
              <div className="status">
                {
                  menuSetting.map_show == "Y" ? <span className="on">적용중</span> : <span className="off">숨김중</span>
                }
              </div>
            </li>
          </ul>
          <div className="form_con">
            {
              {
                0 : <Set_header></Set_header>,
                1 : <Set_main></Set_main>,
                2 : <Set_notice></Set_notice>,
                3 : <Set_around></Set_around>,
                4 : <Set_charge></Set_charge>,
                5 : <Set_review></Set_review>,
                6 : <Set_vod></Set_vod>,
                7 : <Set_map></Set_map>
              }[select]
            }
          </div>
        </div>
      </div>
    )
  }
}



export default Basic