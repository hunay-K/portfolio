import $ from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { change_page } from '../store';
import axios from 'axios';

let zoom = false;

function Around(props){

  let dispatch = useDispatch();
  let [around_datas, setAround_data] = useState();
  let [slide_imgs, setSlide] = useState();

  useEffect(()=>{
    dispatch(change_page('around on'));
    if(around_datas){
      document.documentElement.style.setProperty('--sec_bgcolor', around_datas.bgcolor);
      document.documentElement.style.setProperty('--transparent', (1 - (around_datas.transparent / 100)));
    }
  }, [around_datas]);

  useMemo(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_around'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setAround_data(data[0]);
      }
    });
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/slide.php",
      data: {
          table:'slide_around'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setSlide(data);

      }
    });
  }, []);
  let settings = {
      dots: false,
      infinite: false,
      draggable: true,
      speed: 500,
      slidesToShow: 4,
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

  console.log(around_datas);
  if(around_datas){
		return(
			<div className='sections section_03 slide'>
				<div className='width_con'>
					{
						around_datas.title_show == "Y" ? 
						<div className='title_con'>
							<div dangerouslySetInnerHTML={{ __html : around_datas.title  }} />
						</div>
						: null
					}
					<div className='main_con'>
						<h4>둘러보기</h4>
					</div>
				</div>
				<div className='slide_con'>
					<ul>
            {
              slide_imgs == null ? 
              <Slider {...settings}>
                <li onClick={()=>{zoom = true;}}>
                  <img src='img/sec_02/img_sec03_1.jpg'></img>
                </li>
                <li onClick={()=>{zoom = true;}}>
                  <img src='img/sec_02/img_sec03_2.jpg'></img>
                </li>
                <li onClick={()=>{zoom = true;}}>
                  <img src='img/sec_02/img_sec03_3.jpg'></img>
                </li>
                <li onClick={()=>{zoom = true;}}>
                  <img src='img/sec_02/img_sec03_4.jpg'></img>
                </li>
                <li onClick={()=>{zoom = true;}}>
                  <img src='img/sec_02/img_sec03_5.jpg'></img>
                </li>
              </Slider>
              :
              <Slider {...settings}>
                {
                  slide_imgs.map(function(a, i){
                    return(
                      <Lists data={slide_imgs} val={i} key={i}></Lists>
                    )
                  })
                }
						  </Slider>
            }
						
					</ul>
				</div>
				<p className={slide_imgs == null ? 'zoom' : 'zoom on'}>각 이미지들을 클릭하시면 크게 보실 수 있습니다.</p>
			</div>
		);
	}
}

function Lists(props){
  return(
    <li onClick={()=>{zoom = true;}}>
      <img src={'data:image;base64,'+props.data[props.val].full_url}></img>
    </li>
  )
}

export default Around;