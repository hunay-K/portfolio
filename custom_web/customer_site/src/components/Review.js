import $, { data } from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { change_page, replace_board, replace_data, replace_more_data } from '../store';
import axios from 'axios';

function Review(props){
  
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [review_data, setReview_data] = useState();
  let [board_filter, setFilter] = useState();
  let [copy_board, setCopy] = useState();

  useEffect(()=>{
    dispatch(change_page('review on'));
    if(board_filter){
      let copy = [...board_filter];
      setCopy(copy);
    }
    if(review_data){
      if(review_data.img == null){
        document.documentElement.style.setProperty('--sec_bgurl', '#f5f5f5');
      }else{
        document.documentElement.style.setProperty('--sec_bgurl', 'url(data:image;base64,'+review_data.img+')');
      }
      document.documentElement.style.setProperty('--sec_bgcolor', review_data.bgcolor);
      document.documentElement.style.setProperty('--transparent', (1 - (review_data.transparent / 100)));
    }
  }, [review_data, board_filter]);

  useMemo(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_review'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setReview_data(data[0]);
      }
    });
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_board',
          find: 'review'
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
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
      ]
    };

  console.log(review_data);
  console.log(copy_board);

  if(review_data){
    return(
      <div className='sections section_02 slide'>
          <div className='width_con'>
              {
                review_data.title_show == "Y" ? 
                <div className='title_con'>
                  <div dangerouslySetInnerHTML={{ __html : review_data.title  }} />
                </div>
                : null
              }
              <div className='main_con'>
                  <span className='btn_more' onClick={()=>{dispatch(replace_more_data('review')); navigate('/more_board');}}>게시판 더보기</span>
                  <h4>이용후기</h4>
              </div>
          </div>
          <div className='board_con'>
              <ul>
                {
                  copy_board == undefined ? null :
                  <Slider {...settings}>
                    {
                      copy_board.map(function(a, i){
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
            <h3 className='board_title'>
                {datas[props.val].board_title}
            </h3>
            <Score_con score={datas[props.val].score}></Score_con>
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

function Score_con(props){
  let a = ``;
  let score = Number(props.score);
  for(let i = 0; i < score; i++){
    a += `<img src='img/review/star.png'></img>`;
  }
  return(
    <div className="score_con">
      <div dangerouslySetInnerHTML={{ __html : a  }} />
    </div>
  )
}

export default Review;