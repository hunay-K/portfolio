import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { change_page, replace_data, replace_board } from '../store';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useMemo } from "react";
import axios from "axios";
import $ from 'jquery';

function chunk(params = [], size = 1) {
  const arr = [];
    
  for (let i = 0; i < params.length; i += size) {
    arr.push(params.slice(i, i + size));
  }

  return arr;
}

function More_board(props){

  let [data, setData] = useState();
  let [now_page, setNow_page] = useState(1);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let store = useSelector((state)=>{return(state)});
  let more_data = store.more_data;

  
  let page = chunk(data, 8);
  let now_data = page[now_page-1];

  useEffect(()=>{
    dispatch(change_page('more_board on'));
  }, []);

  useEffect(()=>{
    
  }, [now_data])

  useEffect(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_board',
          find: more_data
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setData(data);

      }
    });
  }, [now_page])

  console.log(now_data, page);

  if(now_data){
    return(
      <div className="sections section_02 more">
        <div className="width_con">
          <span className="btn_home" onClick={()=>{navigate(-1);}}>홈으로</span>
          <div className="borad_rows">
            <div className="rows row0">
              <ul>
                <li className="board_no">순서</li>
                <li className="board_type">분류</li>
                <li className="score">별점</li>
                <li className="board_title">글제목</li>
                <li className="board_writer">작성자</li>
                <li className="board_date">작성일</li>
              </ul>
            </div>
            {
              now_data ? now_data.reverse().map(function(a, i){
                return(
                  <Rows data={now_data} val={i} key={i}></Rows>
                )
              }) : null
            }
          </div>
          <ul className='pagenation'>
            {page.map(function(a, i){
              return(
                <li className={now_page == i+1 ? 'on' : null} key={i} onClick={()=>{
                  setNow_page(i+1);
                  
                }}>
                  <span>{i + 1}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

function Rows(props){

  let dispatch = useDispatch();
  let datas = props.data;
  let types = '';
  switch(datas[props.val].board_type){
    case 'notice' : types = '공지' 
    break;
    case 'event' : types = '이벤트' 
    break;
    case 'charge' : types = '이용요금' 
    break;
    case 'review' : types = '이용후기' 
    break;
    case 'vod' : types = '홍보영상' 
    break;
  }

  function star_score(score){
    let a = ``;
    for(let i = 0; i < score; i++){
      a += `<img src='img/board/star.png'></img>`;
    }
    return a;
  }

  return(
    <div className={"rows row"+(props.val+1)}>
      <ul className={datas[props.val].board_status == "N" ? "deleted" : null}>
        <li className="board_no">{datas[props.val].board_no}</li>
        <li className="board_type"><span className={datas[props.val].board_type}>{types}</span></li>
        <li className="score" dangerouslySetInnerHTML={{ __html : star_score(datas[props.val].score)  }}>{}</li>
        <li className="board_title" onClick={()=>{dispatch(replace_data(datas[props.val])); dispatch(replace_board(datas[props.val].board_no));}}><Link to='/view_board'>{datas[props.val].board_title}</Link></li>
        <li className="board_writer">{datas[props.val].board_writer}</li>
        <li className="board_date">{datas[props.val].board_date}</li>
      </ul>
    </div>
  )
}

export default More_board;