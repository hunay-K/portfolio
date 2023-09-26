import $ from 'jquery';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change_page } from '../store';

function View_board(){

  let navigate = useNavigate()
  let store = useSelector((state)=>{return(state)});
  let board_data = store.board_data;
  let board_no = store.current_board;
  let separator;
  let types = board_data.board_type;
  console.log(store)
  switch(types){
    case 'notice' : separator = '공지'
    break;
    case 'event' : separator = '이벤트'
    break;
    case 'charge' : separator = '이용요금'
    break;
    case 'review' : separator = '이용후기'
    break;
    case 'vod' : separator = '홍보영상'
    break;
  }
  let vod_url = board_data.movie_url;
    if(vod_url){
      vod_url = vod_url.slice(-11);
    }
    
    function create_video(){
      if(board_data.file !== "https://cafeapi.all-teaching.com/pds/" &&board_data.movie_url == ''){
        return(
          <video src={board_data.file} controls></video>
        )
      }else if(board_data.file == "https://cafeapi.all-teaching.com/pds/" && board_data.movie_url == ''){
        return(
          null
        )
      }else if(board_data.file == "https://cafeapi.all-teaching.com/pds/" && board_data.movie_url !== ""){
        return(
          <div className="iframe_con">
            <iframe src={"https://www.youtube.com/embed/"+vod_url+""} title="YouTube video player"></iframe>
          </div>
        )
      }else{
        return(
          <video src={board_data.file} controls></video>
        )
      }
    }

  return(
    <div className="sections section_02 view">
      <div className="width_con">
        <div className="view_con">
          <div className="row row1">
            <div className={"board_type "+types}>
              <span>{separator}</span>
            </div>
          </div>
          <div className="row row2">
            <div className="title_con">
              <h3>{board_data.board_title}</h3>
            </div>
            {
              types == 'review' ? <Score_con score={board_data.score}></Score_con> : null
            }
          </div>
          <div className="row row3">
            <div className="view_info">
              <div className="col col1">
                <span className="writer">{board_data.board_writer}</span>
                <span className="date">{board_data.board_date}</span>
              </div>
            </div>
          </div>
          <div className="row row4">
            {
              types == 'vod' ? create_video() : null
            }
            <div dangerouslySetInnerHTML={{ __html : board_data.board_content  }} />
          </div>
          <div className="row row5">
            <div className="btn_con">
              <div className="btns exit" onClick={()=>{navigate(-1)}}>
                <span>돌아가기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Score_con(props){
  let a = ``;
  let review = '';
  let score = Number(props.score);
  for(let i = 0; i < score; i++){
    a += `<img src='img/review/star.png'></img>`;
  }
  switch(score){
    case 5 : review = '아주좋아요'
    break;
    case 4 : review = '맘에 들어요'
    break;
    case 3 : review = '보통이예요'
    break;
    case 2 : review = '그냥 그래요'
    break;
    case 1 : review = '별로예요'
    break;
  }
  return(
    <div className="score_con">
      <h5>리뷰평점</h5>
      <div dangerouslySetInnerHTML={{ __html : a  }} />
      <span>{review}</span>
    </div>
  )
}

export default View_board;