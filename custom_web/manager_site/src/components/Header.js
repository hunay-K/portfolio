import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change_page, log_in_out } from '../store';
import $ from 'jquery';
import Write_brd from './board_page/Write_brd';
import Edit_brd from './board_page/Edit_brd';
import Main from './Main';
import Basic from './Basic';
import Board from './Board';
import View_brd from './board_page/View_brd';
import Edit_profile from './Edit_profile';
import axios from 'axios';

function Header(){

  let [data, setData] = useState();
  let store = useSelector((state)=>{return state});
  let id = window.localStorage.getItem('id');
  let login_key = window.localStorage.getItem('login_key');
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const config = {
    headers : {
      'Authorization': `Bearer ${login_key}`
    }
  }

  function log_out(){
    dispatch(log_in_out());
    window.localStorage.removeItem('id');
    navigate('/');
    window.location.reload();
  }

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
        console.log(data)
        setData(data[0]);
      }
  });
  }, []);

  if(data){
    return(
      <div>
        <div id='header'>
          <div className='btn_open' onClick={()=>{$('#header').toggleClass('unfold')}}></div>
          <Link to='/' onClick={()=>{dispatch(change_page(''));}}><h5>MY ADMIN</h5></Link>
          <div className='profile'>
            <div className='img_con'>
              <img src={data.img_url !== "" ? "data:image;base64,"+data.img_url : 'img/header/logo.jpg'} alt='로고이미지'></img>
            </div>
            <div className='desc_con'>
              <h4>{data.nick_name !== '' ? data.nick_name : id}</h4>
              <Link to="/edit_profile">프로필 수정</Link>
            </div>
            <div className='link_con'>
              <a href='http://hunay.co.kr/portfolio/custom_web/custom' target='_blank'>홈페이지</a>
              <a href='' onClick={()=>{
                if(window.confirm('로그아웃 하시겠습니까?')){
                  log_out();
                }
              }}>로그아웃</a>
            </div>
          </div>
          <div className='nav_con'>
            <ul>
              <li onClick={()=>{
                dispatch(change_page('basic'))
              }} className={store.current_page == 'basic' ? 'on' : null}>
                <Link to='/basic'>
                  <div className='img_con'>
                    <img src='img/header/header_basic.png' alt='아이콘이미지'></img>
                  </div>
                  <p>홈페이지 설정</p>
                </Link>
              </li>
              <li onClick={()=>{
                dispatch(change_page('board'))
              }} className={store.current_page == 'board' ? 'on' : null}>
                <Link to='/board'>
                  <div className='img_con'>
                    <img src='img/header/header_board.png' alt='아이콘이미지'></img>
                  </div>
                  <p>게시판 관리</p>
                </Link>
              </li>
              {/* <li onClick={()=>{
                dispatch(change_page('member'))
              }} className={store.current_page == 'member' ? 'on' : null}>
                <Link to='/member'>
                  <div className='img_con'>
                    <img src='img/header/header_member.png' alt='아이콘이미지'></img>
                  </div>
                  <p>회원 관리</p>
                </Link>
              </li>
              <li onClick={()=>{
                dispatch(change_page('extra'))
              }} className={store.current_page == 'extra' ? 'on' : null}>
                <Link to='/extra'>
                  <div className='img_con'>
                    <img src='img/header/header_extra.png' alt='아이콘이미지'></img>
                  </div>
                  <p>부가 서비스</p>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className='container'>
          <Routes>
            <Route path='/' element={ <Main></Main> }></Route>
            <Route path='/edit_profile' element={ <Edit_profile></Edit_profile> }></Route>
            <Route path='/basic' element={ <Basic></Basic> }></Route>
            <Route path='/board' element={ <Board></Board> }></Route>
            <Route path='/write' element={ <Write_brd></Write_brd> }></Route>
            <Route path='/edit' element={ <Edit_brd></Edit_brd> }></Route>
            <Route path='/view' element={ <View_brd></View_brd> }></Route>
          </Routes>
        </div>
      </div>
    )
  }
}

export default Header