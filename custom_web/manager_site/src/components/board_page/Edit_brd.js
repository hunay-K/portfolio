import $ from "jquery";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit_brd(){

  let store = useSelector((state)=>{return state.board_view_data});
  let [contents, setContents] = useState(store.board_content);
  let types = store.board_type;
  let separator = '';
  let navigate = useNavigate();
  let id = window.localStorage.getItem('id');
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
  console.log(store)

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
        <h3>글 수정하기</h3>
        <div className="form_con">
          <form id="editBoard">
            <div className="row row1">
              <div className={"board_type "+types}>
                <span>{separator}</span>
              </div>
            </div>
            <div className="row row2">
              <div className="input_title_con">
                <input type="text" name="board_title" className="write_title" placeholder="글제목" defaultValue={store.board_title}></input>
              </div>
              {
                types == 'review' ? <Score_con score={store.score}></Score_con> : null
              }
            </div>
            <div className="row row3">
              <ReactQuill modules={modules} onChange={(e)=>{setContents(e);}} value={contents}></ReactQuill>
            </div>
            {
              types == 'vod' ? <Row4 data={store}></Row4> : null
            }
            <div className="row row5">
              <div className="btn_con">
                <div className="btns apply">
                  <span onClick={()=>{
                    const this_form = document.getElementById("editBoard");
                    let formData = new FormData(this_form);
                    if(contents){
                      formData.append('board_content', contents);
                    }
                    formData.append('purpose', 'edit_board');
                    formData.append('board_writer', id);
                    formData.append('board_no', store.board_no);
                    formData.append('table', 'admin_board');
                    if(window.confirm('수정하시겠습니까?')){
                      axios.post('http://hunay.co.kr/portfolio/custom_web/post.php', formData).then((result)=>{
                        console.log(result);
                        alert('수정되었습니다');
                        navigate('/board');
                      }).catch(()=>{
                        alert("데이터 전송이 실패하였습니다.");
                      });
                    }
                    for (const [key, value] of formData.entries()) {
                      console.log(key, value);
                    }
                  }}>수정하기</span>
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

function Score_con(props){
  let score = props.score;
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
        <input type="checkbox" name="score" value={5} defaultChecked={score == '5' ? true : false} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>아주 좋아요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={4} defaultChecked={score == '4' ? true : false} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>맘에 들어요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={3} defaultChecked={score == '3' ? true : false} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>보통이예요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={2} defaultChecked={score == '2' ? true : false} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <img src="img/board/write/star.png"></img>
        <span>그냥 그래요</span>
      </div>
      <div className="check_score">
        <input type="checkbox" name="score" value={1} defaultChecked={score == '1' ? true : false} onChange={(e) => checkOnlyOne(e.target)}></input>
        <img src="img/board/write/star.png"></img>
        <span>별로예요</span>
      </div>
    </div>
  )
}

function Row4(props){

  let [del, setDel] = useState(false);

  return(
    <div className="row row4">
      <p>영상 첨부 방식 두가지 중 한가지를 선택해주세요</p>
      <div className="upload_vod">
        <h5>영상첨부</h5>
        {
          del == false ?
          <div className="origin_file">
            <h6>{props.data.file_name}</h6>
            <span onClick={()=>{
              setDel(!del)
            }}><FontAwesomeIcon icon={faTrashCan} /></span>
          </div>
          :
          <div className="new_file">
            <input type="file" name="file" className="input_vod"></input>
            <input type="hidden" name="file_del" value={del == true ? "Y" : "N" }></input>
            <span onClick={()=>{$(".input_vod").val('')}}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
          </div>
        }
        
      </div>
      <div className="upload_vod">
        <h5>유튜브 URL</h5>
        <input type="text" name="movie_url" className="input_url" placeholder="유튜브 URL을 입력해주시면 영상을 불러올 수 있습니다." defaultValue={props.data.movie_url}></input>
      </div>
    </div>
  )
}

export default Edit_brd;