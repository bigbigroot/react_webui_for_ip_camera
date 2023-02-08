import React from 'react';
import 'video.js/dist/video-js.css';

import videojs from 'video.js';

import {Caller} from './webrtc'
import { useOutletContext } from 'react-router-dom';
import { Notification } from './Compoment';

function LivePlayer(props){   
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props; 

  React.useEffect(() => {
    
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });


    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } // else {
    //   const player = playerRef.current;

    //   player.autoplay(options.autoplay);
    //   player.src(options.sources);
    // }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return(
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export function CameraPage(){
  const playerRef = React.useRef(null);
  const connectRef = React.useRef(null);

  const [isLogined, setIsLogined] = useOutletContext();

  React.useEffect(()=>setIsLogined(true))

  const videoOptions = {
    autoplay: 'muted',
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    aspectRatio: "16:9",
    controlBar: {
      volumePanel: false
    },
    // sources: [{
    //   src: 'SampleVideo_1280x720_30mb.mp4',
    //   type: 'video/mp4'
    // }]
  };
  
  const handlePlayerReady = (player) => {
    playerRef.current = player;    

    let connect = new Caller(player);
    connect.open();
    connect.close()
    connectRef.current = connect;
  
    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });
  
    player.on('dispose', () => {
      videojs.log('player will dispose');
      connectRef.current.close();
      connectRef=null;
    });
  };

  React.useEffect(() => {
    const connect = connectRef.current;

    return () => {
      if (connect) {
        connect.close()
        connectRef.current = null;
      }
    };
  }, [playerRef]);

  return(    
    <div className='d-flex'>
      <div className="mt-4 ms-5 me-5 w-75">
        <LivePlayer options={videoOptions} onReady={handlePlayerReady}/>
      </div>
      <Notification></Notification>
    </div>
  );
}
