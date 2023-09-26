import $ from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { change_page, replace_board, replace_data, replace_more_data } from '../store';
import axios from 'axios';

function Notice(props){
  
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [notice_data, setNotice_data] = useState();
  let [board_filter, setFilter] = useState();
  let [copy_board, setCopy] = useState();
  let [select, setSelect] = useState(0);
  useEffect(()=>{
    dispatch(change_page('notice on'));
    if(board_filter){
      let copy = [...board_filter];
      setCopy(copy);
    }
    if(notice_data){
      if(notice_data.img == null){
        document.documentElement.style.setProperty('--sec_bgurl', '#f5f5f5');
      }else{
        document.documentElement.style.setProperty('--sec_bgurl', 'url(data:image;base64,'+notice_data.img+')');
      }
      document.documentElement.style.setProperty('--sec_bgcolor', notice_data.bgcolor);
      document.documentElement.style.setProperty('--transparent', (1 - (notice_data.transparent / 100)));
    }
  }, [notice_data, board_filter]);

  useMemo(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_notice'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setNotice_data(data);
      }
    });
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_board',
          find: 'notice'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setFilter(data);

      }
    });
  }, []);
    
  let settings = {
    dots: false,
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1
        }
      }
      ]
    };

  console.log(notice_data);
  console.log(copy_board);

  if(notice_data){
    return(
      <div className='sections section_02 slide'>
          <div className='width_con'>
              <div className='main_con'>
                  {/* <Link className='btn_more' to="/more_board" onClick={()=>{dispatch(replace_more_data(copy_board))}}>게시판 더보기</Link> */}
                  <span className='btn_more' onClick={()=>{dispatch(replace_more_data('notice')); navigate('/more_board');}}>게시판 더보기</span>
                  <h4>공지&이벤트</h4>
                  <ul>
                      <li onClick={()=>{
                          setCopy(board_filter);
                          setSelect(0);
                      }} className={select == 0 ? 'on' : null}>전체</li>
                      <li onClick={()=>{
                          let copy = [...board_filter];
                          copy = copy.filter((a)=> a.board_type == 'notice');
                          setCopy(copy);
                          setSelect(1);
                      }} className={select == 1 ? 'on' : null}>공지사항</li>
                      <li onClick={()=>{
                          let copy = [...board_filter];
                          copy = copy.filter((a)=> a.board_type == 'event');
                          setCopy(copy);
                          setSelect(2);
                      }} className={select == 2 ? 'on' : null}>이벤트</li>
                  </ul>
              </div>
          </div>
          <div className='board_con'>
              <ul>
                  {
                    copy_board == undefined ? null :
                    <Slider {...settings}>
                      {
                        copy_board.reverse().map(function(a, i){
                          return(
                              <Boards data={copy_board} val={i} key={i}></Boards>
                          )
                        })
                      }
                    </Slider>
                  }
              </ul>
          </div>
      </div>
    )
  }
}

function Boards(props){
    let datas = props.data;
    let dispatch = useDispatch();
    return(
        <li>
            <h5 className={datas[props.val].board_type}>
                <span>{datas[props.val].board_type == "notice" ? "공지" : "이벤트"}</span>
            </h5>
            <h3 className='board_title'>
                {datas[props.val].board_title}
            </h3>
            <div className='desc_con'>
              <div dangerouslySetInnerHTML={{ __html : datas[props.val].board_content }} />
            </div>
            <div className='btn_con'>
                <Link className='btn01' to="/view_board" onClick={()=>{
                  dispatch(replace_board(datas[props.val].board_no));
                  dispatch(replace_data(datas[props.val]));
                }}>VIEW MORE</Link>
                <Link to="/view_board" onClick={()=>{
                  dispatch(replace_board(datas[props.val].board_no));
                  dispatch(replace_data(datas[props.val]));
                }}><img src='img/sec_02/next.png'></img></Link>
            </div>
        </li>
    )
}

export default Notice;