import $ from "jquery";
import { useState } from "react";
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Write_brd(){

  let navigate = useNavigate();
  let [types, setTypes] = useState();
  let [contents, setContents] = useState("");
  let id = window.localStorage.getItem('id');
  const modules = {
    toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
          ['image']
        ],
    }
  }

  return(
    <div className="sections write">
      <div className="width_con">
        <h3>새 글쓰기</h3>
        <div className="form_con">
          <form id="writeBoard">
            <div className="row row1">
              <select name="code" className="select_type" onChange={(e)=>{
                setTypes(e.target.value);
              }}>
                <option value='notice'>공지</option>
                <option value='event'>이벤트</option>
                <option value='charge'>이용요금</option>
                <option value='review'>이용후기</option>
                <option value='vod'>홍보영상</option>
              </select>
            </div>
            <div className="row row2">
              <div className="input_title_con">
                <input type="text" name="board_title" className="write_title" placeholder="글제목"></input>
              </div>
              {
                types == 'review' ? <Score_con></Score_con> : null
              }
            </div>
            <div className="row row3">
              <ReactQuill modules={modules} onChange={(e)=>{setContents(e);}} value={contents}></ReactQuill>
            </div>
            {
              types == 'vod' ? <Row4></Row4> : null
            }
            <div className="row row5">
              <div className="btn_con">
                <div className="btns apply" onClick={()=>{
                const this_form = document.getElementById("writeBoard");
                let formData = new FormData(this_form);
                if(contents){
                  formData.append('board_content', contents);
                }
                formData.append('board_writer', id);
                formData.append('purpose', 'write');
                formData.append('table', 'admin_board');
                if(window.confirm('저장하시겠습니까?')){
                  if($(".write_title").val() == ''){
                    alert('제목을 입력해주세요.')
                  }else{
                    axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).catch(()=>{
                      alert("데이터 전송이 실패하였습니다.");
                    }).then((result)=>{
                      console.log(result);
                      alert('저장되었습니다');
                      navigate(-1);
                    });
                  }
                }
                for (const [key, value] of formData.entries()) {
                  console.log(key, value);
                 }
              }}>
                  <span>글 올리기</span>
                </div>
                <div className="btns exit">
                  <span><Link to='/board'>나가기</Link></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function Score_con(){
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName('score');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false
      }
    }
  }
  return(
    <div className="score_con">
      <h5>리뷰 평점</h5>
      <div className="check_score">
        <input type="checkbox" name="score" value={5} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>아주 좋아요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={4} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>맘에 들어요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={3} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>보통이예요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={2} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>그냥 그래요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={1} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <span>별로예요</span>
      </div>
    </div>
  )
}

function Row4(){
  return(
    <div className="row row4">
      <p>원하는 영상 유튜브 링크를 첨부해주세요</p>
      <div className="upload_vod">
        <h5>영상URL</h5>
        <input type="text" name="movie_url" className="input_url" placeholder="유튜브 영상 URL을 입력해주시면 영상을 불러올 수 있습니다."></input>
      </div>
    </div>
  )
}

export default Write_brd;