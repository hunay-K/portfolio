import $, { map } from 'jquery';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { change_page, replace_board, replace_data } from '../store';
import axios from 'axios';

function Map(props){
  
  let dispatch = useDispatch();
  let [map_data, setMap_data] = useState();

  useEffect(()=>{
    dispatch(change_page('map on'));
    if(map_data){
      if(map_data.img == null){
        document.documentElement.style.setProperty('--sec_bgurl', '#f5f5f5');
      }else{
        document.documentElement.style.setProperty('--sec_bgurl', 'url(data:image;base64,'+map_data.img+')');
      }
      document.documentElement.style.setProperty('--sec_bgcolor', map_data.bgcolor);
      document.documentElement.style.setProperty('--transparent', (1 - (map_data.transparent / 100)));
    }
  }, [map_data]);

  useMemo(()=>{
    $.ajax({
      type: "GET",
      url: "http://hunay.co.kr/portfolio/custom_web/get.php",
      data: {
          table:'admin_map'
      },
      dataType: "json",
      async: false,
      success : function(data){
        console.log(data)
        setMap_data(data[0]);
      }
    });
  }, []);

  console.log(map_data);

  if(map_data){
    return(
      <div className='sections section_02 map'>
        <div className='width_con'>
          <div className='map_con'>
            <div className='col col1'>
              <h3>오시는 길 안내</h3>
              <ul>
                <li>
                  <div className='img_con'>
                    <img src='img/sec_02/map_address.png'></img>
                  </div>
                  <div className='desc_con'>
                    <h5>주소 및 연락처</h5>
                    <p>{map_data.addr}<br></br>대표번호 : {map_data.tel}</p>
                  </div>
                </li>
                {
                  map_data.subway_show == "Y" ?
                    <li>
                      <div className='img_con'>
                        <img src='img/sec_02/map_subway.png'></img>
                      </div>
                      <div className='desc_con'>
                        <h5>지하철 이용시</h5>
                        <p>{map_data.subway}</p>
                      </div>
                    </li>
                  : null
                }
                {
                  map_data.bus_show == "Y" ? 
                    <li>
                      <div className='img_con'>
                        <img src='img/sec_02/map_bus.png'></img>
                      </div>
                      <div className='desc_con'>
                        <h5>버스 이용시</h5>
                        <p>{map_data.bus}</p>
                      </div>
                    </li>
                  : null
                }
              </ul>
            </div>
            <div className='col col2'>
              <div className='link_con'>
                <a href={map_data.google} target='_blank'>
                  <img src={map_data.img2 == "" ? 'img/sec_02/map_base.jpg' : 'data:image;base64,'+map_data.img2}></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Map;