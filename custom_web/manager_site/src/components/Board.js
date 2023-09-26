import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { change_page, minus_list, plus_list } from "../store";
import Brd_all from './board_page/Brd_all';
import './board_page/brd.css';
import axios from "axios";
import $ from "jquery";


function Board(){

  let [select, setSelect] = useState('all');
  let [data, setData] = useState();
  let [copy_data, setCopy] = useState();
  let dispatch = useDispatch();

  useEffect(()=>{
    if(data){
      setCopy(data);
    }
  }, [data]);

  useEffect(()=>{
    dispatch(change_page('board'));
  }, [])

  useMemo(()=>{
    return $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_board'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setData(data.reverse());
      }
    });
  }, [])

  console.log(data);
  console.log('렌더링!');
  if(data){
    return(
      <div className="sections board">
        <div className="width_con">
          <h3>게시판 관리</h3>
          <ul className="tabs">
            <li onClick={()=>{
              setSelect('all');
              setCopy(data);
            }} className={select == 'all' ? "on" : null}>
              <h5>전체</h5>
              <div className="status">
                <p>글 총갯수</p>
                <div className="counting">
                  <span className="whole">000</span>
                </div>
              </div>
            </li>
            <li onClick={()=>{
              setSelect('notice');
              let copy = [...data];
              copy = copy.filter((a)=> a.board_type == 'notice' || a.board_type == 'event');
              setCopy(copy);
            }} className={select == 'notice' ? "on" : null}>
              <h5>공지&이벤트</h5>
              <div className="status">
                <p>글 총갯수</p>
                <div className="counting">
                  <span className="whole">000</span>
                </div>
              </div>
            </li>
            <li onClick={()=>{
              setSelect('charge');
              let copy = [...data];
              copy = copy.filter((a)=> a.board_type == 'charge');
              setCopy(copy);
            }} className={select == 'charge' ? "on" : null}>
              <h5>이용요금</h5>
              <div className="status">
                <p>글 총갯수</p>
                <div className="counting">
                  <span className="whole">000</span>
                </div>
              </div>
            </li>
            <li onClick={()=>{
              setSelect('review');
              let copy = [...data];
              copy = copy.filter((a)=> a.board_type == 'review');
              setCopy(copy);
            }} className={select == 'review' ? "on" : null}>
              <h5>이용후기</h5>
              <div className="status">
                <p>글 총갯수</p>
                <div className="counting">
                  <span className="whole">000</span>
                </div>
              </div>
            </li>
            <li onClick={()=>{
              setSelect('vod');
              let copy = [...data];
              copy = copy.filter((a)=> a.board_type == 'vod');
              setCopy(copy);
            }} className={select == 'vod' ? "on" : null}>
              <h5>홍보영상</h5>
              <div className="status">
                <p>글 총갯수</p>
                <div className="counting">
                  <span className="whole">000</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="board_con">
            <Brd_all origin_data={data} data={copy_data} whats={select}></Brd_all>
          </div>
        </div>
      </div>
    )
  }
}

export default Board;