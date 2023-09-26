import $ from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { change_page, replace_board, replace_data, replace_more_data } from '../store';
import axios from 'axios';

function Vod(props){
  
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [vod_data, setVod_data] = useState();
  let [board_filter, setFilter] = useState();
  let [copy_board, setCopy] = useState();

  useEffect(()=>{
    dispatch(change_page('vod on'));
    if(board_filter){
      let copy = [...board_filter];
      setCopy(copy);
    }
    if(vod_data){
      if(vod_data.img == null){
        document.documentElement.style.setProperty('--sec_bgurl', '#f5f5f5');
      }else{
        document.documentElement.style.setProperty('--sec_bgurl', 'url(data:image;base64,'+vod_data.img+')');
      }
      document.documentElement.style.setProperty('--sec_bgcolor', vod_data.bgcolor);
      document.documentElement.style.setProperty('--transparent', (1 - (vod_data.transparent / 100)));
    }
  }, [vod_data, board_filter]);

  useMemo(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_vod'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setVod_data(data[0]);
      }
    });
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_board',
          find: 'vod'
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

  console.log(vod_data);
  console.log(copy_board);

  if(vod_data){
    return(
      <div className='sections section_02 slide'>
          <div className='width_con'>
              {
                vod_data.title_show == "Y" ? 
                <div className='title_con'>
                  <div dangerouslySetInnerHTML={{ __html : vod_data.title  }} />
                </div>
                : null
              }
              <div className='main_con'>
                  <span className='btn_more' onClick={()=>{dispatch(replace_more_data('vod')); navigate('/more_board');}}>게시판 더보기</span>
                  <h4>홍보영상</h4>
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
    let vod_url = datas[props.val].movie_url;
    if(vod_url){
      vod_url = vod_url.slice(-11);
    }
    
    function create_video(){
      if(datas[props.val].movie_url == ''){
        return(
          null
        )
      }else if(datas[props.val].movie_url !== ""){
        return(
          <div className="iframe_con">
            <iframe src={"https://www.youtube.com/embed/"+vod_url+""} title="YouTube video player"></iframe>
          </div>
        )
      }
    }

    return(
        <li>
            <h3 className='board_title'>
                {datas[props.val].board_title}
            </h3>
            <div className='desc_con'>
              {create_video()}
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

export default Vod;