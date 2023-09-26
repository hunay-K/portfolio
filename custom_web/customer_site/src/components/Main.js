import $ from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

function Maincomp(props){

  let [main_data, setMain_data] = useState();
  let [slide_imgs, setSlide] = useState();

  useEffect(()=>{
    if(main_data){
      if(main_data.bgcolor_show == "Y"){
        document.documentElement.style.setProperty('--bgcolor', main_data.bgcolor);
        document.documentElement.style.setProperty('--transparent', (1 - (main_data.transparent / 100)));
      }
    }
  }, [main_data])

  useMemo(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_main'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setMain_data(data[0]);
      }
    });
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/slide.php",
      data: {
          table:'slide_main'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data);
        setSlide(data);

      }
    });
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    };

    
  if(main_data){
    return(
      <div className='sections section_01'>
        {
          main_data.title_show == "Y" ?
            <div className='title_con'>
              <div dangerouslySetInnerHTML={{ __html : main_data.title  }} />
            </div>
          : null
        }
        <Slider {...settings}>
          {
            slide_imgs == null ? 
            <div className='img_con'>
              <div style={{background : 'url(img/sec_02/img_sec2.jpg) center no-repeat', backgroundSize: 'cover'}}></div>
            </div>
            :
            slide_imgs.map(function(a,i){
              return(
                <Main_slide data={slide_imgs} key={i} val={i}></Main_slide>
              )
            })
          }
        </Slider>
      </div>
    )
  }
}

function Main_slide(props){
  let slide_data = props.data;
  return(
    <div className='img_con'>
      <div style={{background : 'url(data:image;base64,'+slide_data[props.val].full_url+') center no-repeat', backgroundSize: 'cover'}}></div>
    </div>
  )
}

export default Maincomp;
