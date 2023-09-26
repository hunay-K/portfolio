import { useEffect, useState, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import axios from 'axios';
import $ from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLink, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Maincomp from './components/Main';
import Notice from './components/Notice';
import View_board from './components/View_board';
import Around from './components/Around';
import { change_page } from './store';
import Charge from './components/Charge';
import Review from './components/Review';
import Vod from './components/Vod';
import Map from './components/Map';
import More_board from './components/More_board';


function App() {

  let [basic_data, setBasic_data] = useState();
  let store_state = useSelector((state)=>{return state});
  let dispatch = useDispatch();
  let [headerLogo, setHL] = useState('/img/header/img_header_logo_m.png');
  let headerClass = store_state.current_page;

  let [sns_view, setSns_view] = useState(false);
  let [open_nav, setOpen_nav] = useState(false);

  useEffect(()=>{
    if(basic_data){
      $('html head title').text(basic_data.site_name);
      document.documentElement.style.setProperty('--main_menucolor', basic_data.main_menu_color);
      document.documentElement.style.setProperty('--sub_menubgcolor', basic_data.sub_menu_color);
    }
  }, [basic_data]);

  let now_url = window.location.host.split('.');

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
        setBasic_data(data[0]);
      }
  });
  }, []);

  if(basic_data){
    return (
      <div className={open_nav ? "App open_nav" : "App"}>
        <div id='header' className={headerClass}>
          <div className='width_con'>
            {
              basic_data.logo_show == "Y" ?
                <div className='logo_con'>
                  <Link onClick={()=>{dispatch(change_page(''))}} to="/">
                    {
                      basic_data.logo_url !== '' ? <img src={"data:image;base64,"+basic_data.logo_url}></img> : <h2>{basic_data.site_name}</h2>
                    }
                  </Link>
                </div>
              : <Link onClick={()=>{dispatch(change_page(''))}} to="/"><h2>{basic_data.site_name}</h2></Link>
            }
            <div className='nav_con'>
              <ul>
                {
                  basic_data.notice_show == "Y" ? <li className='notice'><Link onClick={()=>{dispatch(change_page('notice on'))}} to="/notice">공지&이벤트</Link></li> : null
                }
                {
                  basic_data.around_show == "Y" ? <li className='around'><Link onClick={()=>{dispatch(change_page('around on'))}} to="/around">둘러보기</Link></li> : null
                }
                {
                  basic_data.charge_show == "Y" ? <li className='charge'><Link onClick={()=>{dispatch(change_page('charge on'))}} to="/charge">이용요금</Link></li> : null
                }
                {
                  basic_data.review_show == "Y" ? <li className='review'><Link onClick={()=>{dispatch(change_page('review on'))}} to="/review">이용후기</Link></li> : null
                }
                {
                  basic_data.vod_show == "Y" ? <li className='vod'><Link onClick={()=>{dispatch(change_page('vod on'))}} to="/vod">홍보영상</Link></li> : null
                }
                {
                  basic_data.map_show == "Y" ? <li className='map'><Link onClick={()=>{dispatch(change_page('map on'))}} to="/map">오시는길</Link></li> : null
                }
              </ul>
              <div className='fn_btn'>
                {/* <div className='login_con'>
                  <FontAwesomeIcon className='login_btn' icon={faUser} />
                  <p>로그인</p>
                </div> */}
                {
                  basic_data.link_menu_show == "Y" ? 
                  <div className='sns_con' onClick={()=>{setSns_view(!sns_view)}}>
                    <FontAwesomeIcon className='sns_btn' icon={faLink} />
                    <p>SNS</p>
                    <ul className={sns_view ? 'sns_list on' : 'sns_list'}>
                      {basic_data.sns_link.length > 0 ? basic_data.sns_link.map(function(a, i){
                        return(<Dropsns data={basic_data.sns_link} key={i} val={i}></Dropsns>)
                      }) : null}
                    </ul>
                  </div>
                  : null
                }
              </div>
            </div>
            <div className='mob_con'>
              <div className="open_nav" onClick={()=>{setOpen_nav(!open_nav)}}>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className='mob_nav'>
          <div className='row1'>
            {
              basic_data.link_menu_show == "Y" ?
              <ul className='sns_list'>
                {basic_data.sns_link.length > 0 ? basic_data.sns_link.map(function(a, i){
                  return(<Dropsns data={basic_data.sns_link} key={i} val={i}></Dropsns>)
                }) : null}
              </ul>
              : null
            }
            <div className="close_nav" onClick={()=>{setOpen_nav(!open_nav)}}></div>
          </div>
          {/* <div className='row2'>
            <div className='login'>로그인하기<FontAwesomeIcon icon={faChevronRight} /></div>
            <div className='join'>아이디가 없다면? <span>회원가입</span></div>
          </div> */}
          <div className='row3'>
            <h6>메뉴</h6>
            <ul>
              {
                basic_data.notice_show == "Y" ? <li className='notice'><Link onClick={()=>{dispatch(change_page('notice on')); setOpen_nav(!open_nav);}} to="/notice">공지&이벤트</Link></li> : null
              }
              {
                basic_data.around_show == "Y" ? <li className='around'><Link onClick={()=>{dispatch(change_page('around on')); setOpen_nav(!open_nav);}} to="/around">둘러보기</Link></li> : null
              }
              {
                basic_data.charge_show == "Y" ? <li className='charge'><Link onClick={()=>{dispatch(change_page('charge on')); setOpen_nav(!open_nav);}} to="/charge">이용요금</Link></li> : null
              }
              {
                basic_data.review_show == "Y" ? <li className='review'><Link onClick={()=>{dispatch(change_page('review on')); setOpen_nav(!open_nav);}} to="/review">이용후기</Link></li> : null
              }
              {
                basic_data.vod_show == "Y" ? <li className='vod'><Link onClick={()=>{dispatch(change_page('vod on')); setOpen_nav(!open_nav);}} to="/vod">홍보영상</Link></li> : null
              }
              {
                basic_data.map_show == "Y" ? <li className='map'><Link onClick={()=>{dispatch(change_page('map on')); setOpen_nav(!open_nav);}} to="/map">오시는길</Link></li> : null
              }
            </ul>
          </div>
        </div>
        <Routes>
          <Route path="/" element={ <Maincomp></Maincomp> } />
          <Route path="/notice" element={ <Notice></Notice> } />
          <Route path="/view_board" element={ <View_board></View_board> } />
          <Route path="/around" element={ <Around></Around> } />
          <Route path="/charge" element={ <Charge></Charge> } />
          <Route path="/review" element={ <Review></Review> } />
          <Route path="/vod" element={ <Vod></Vod> } />
          <Route path="/map" element={ <Map></Map> } />
          <Route path="/more_board" element={ <More_board></More_board> } />
        </Routes>
        {
          headerClass !== '' ?
            <div className='footer_con'>
              <h5>{basic_data.company_name}</h5>
              <p>{basic_data.footer_copy}<br></br>Copyrightⓒ 2023 Hunay Studio All rights reserved.</p>
            </div>
          : null
        }
        <div className='bottom_btn_con'>
          <div className='width_con'>
            {
              basic_data.naver_reserve_show == "Y" ?
                <div className='naver_con'>
                  <a href={basic_data.naver_reserve} target='_blank'>
                    <img src='img/header/naver.png'></img>
                    <p>예약하기</p>
                  </a>
                </div>
              : null
            }
            {
              basic_data.kakao_channel_show == "Y" ?
                <div className='kakao_con'>
                  <a href={basic_data.kakao_channel} target='_blank'>
                    <img src='img/header/kakao.png'></img>
                    <p>카톡채널추가</p>
                  </a>
                </div>
              : null
            }
          </div>
        </div>
      </div>
    );
  }else{
    //alert("현재 서비스 상태가 좋지 않습니다. \n잠시 후에 다시 시도해주십시오.")
  }
}

function Dropsns(props){
  return(
    <li><a href={props.data[props.val].link} target='_blank'><img src={props.data[props.val].img_url}></img></a></li>
  );
}

export default App;
