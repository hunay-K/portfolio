import $ from "jquery";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function View_brd(){

  let navigate = useNavigate();
  let store = useSelector((state)=>{return state.board_view_data});
  let types = store.board_type;
  let vod_url = store.movie_url;
  let files;

  let separator = '';
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
  console.log(store);

  if(vod_url){
    vod_url = vod_url.slice(-11);
  }

  return(
    <div className="sections view">
      <div className="width_con">
        <div className="view_con">
          <div className="row row1">
            <div className={"board_type "+types}>
              <span>{separator}</span>
            </div>
          </div>
          <div className="row row2">
            <div className="title_con">
              <h3>{store.board_title}</h3>
            </div>
            {
              types == 'review' ? <Score_con score={store.score}></Score_con> : null
            }
          </div>
          <div className="row row3">
            <div className="view_info">
              <div className="col col1">
                <span className="writer">{store.board_writer}</span>
                <span className="date">{store.board_date}</span>
              </div>
              <div className="col col2">
                <span className="hits">조회수 {store.board_hit}</span>
              </div>
            </div>
          </div>
          <div className="row row4">
            {
              store.board_type == 'vod' ?
              (
                store.file !== '' && store.movie_url == '' ?
                (
                  files == 'png' || files == 'jpg' || files == 'jpge' ? <p className="caution">동영상 파일이 아닙니다.</p> : <video src={store.file} controls></video>
                )
                :
                <div className="iframe_con">
                  <iframe src={"https://www.youtube.com/embed/"+vod_url+""} title="YouTube video player"></iframe>
                </div>
              )
              : null
            }
            <div dangerouslySetInnerHTML={{ __html : store.board_content  }} />
          </div>
          <div className="row row5">
            <div className="btn_con">
              <div className="btns exit">
                <span><Link to='/board'>목록으로</Link></span>
              </div>
              <div className="btns apply">
                <span><Link to='/edit'>글 수정</Link></span>
              </div>
              <div className="btns del">
                <span onClick={(()=>{
                  let formData = new FormData();
                  formData.append('board_no', store.board_no);
                  formData.append('purpose', 'del_board');
                  formData.append('table', 'admin_board');
                  if(window.confirm('삭제하시겠습니까?')){
                    axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).catch(()=>{
                      alert("데이터 전송이 실패하였습니다.");
                    }).then((result)=>{
                      console.log(result);
                      alert('삭제되었습니다');
                      navigate(-1);
                    });
                  }
                })}>글 삭제</span>
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
    a += `<img src='img/board/write/star.png'></img>`;
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

export default View_brd;