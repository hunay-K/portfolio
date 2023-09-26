import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { log_in_out, set_idkey } from './store';
import $ from 'jquery';
import axios from 'axios';
import Header from './components/Header';


function App() {

  let alt = useSelector((state)=>{return state.alt_log});
  let dispatch = useDispatch();
  let id = window.localStorage.getItem('id');
  console.log(alt, id);

  let [user_info, setInfo] = useState();

  useMemo(()=>{
    return $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_user'
      },
      dataType: "json",
      async: false,
      success : function(data){
        setInfo(data);
        console.log(data);
      }
  });
  }, [])

  useEffect(()=>{
    if(id){

    }
    if(id !== null && alt === false){
      dispatch(log_in_out());
    }
  }, []);

  function log_in(){
    if(alt == false){
      let login_id = $("input[name=user_id]").val();
      let login_pw = $("input[name=password]").val();
      let user_id = user_info[0].user_id;
      let user_pw = user_info[0].password;
      console.log(login_id, login_pw, user_id, user_pw)
      if(login_id == user_id && login_pw == user_pw){
        dispatch(log_in_out());
        window.localStorage.setItem('id', user_info[0].user_id);
      }else{
        alert('아이디와 비밀번호를 확인해주세요.');
      }
    }
  }

  return (
    <div className="App">
      {
        id == undefined || id == null ?
        <div className='login_con'>
          <div className='width_con'>
            <h3>ADMIN LOGIN</h3>
            <div className='loginput'>
              <form id='form_login' onKeyUp={(e)=>{if(e.key === 'Enter') log_in();}}>
                <div className='id_con'>
                  <input name='user_id' type='text' autoComplete='off' placeholder='아이디' ></input>
                </div>
                <div className='pw_con'>
                  <input name='password' type='password' autoComplete='off' placeholder='비밀번호'></input>
                </div>
                <div className='btn_con'>
                  <span onClick={()=>{
                    log_in();
                  }}>로그인</span>
                </div>
              </form>
            </div>
          </div>
        </div> : null
      }
      {
        alt === true && id !== null ? <Header></Header> : null
      }
    </div>
  );
}

export default App;
