import React from 'react';
import 'video.js/dist/video-js.css';

import videojs from 'video.js';
import { MDBContainer } from 'mdb-react-ui-kit';

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
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
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

  const videoOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: './SampleVideo_1280x720_30mb.mp4',
      type: 'video/mp4'
    }]
  };
  
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  
    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });
  
    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return(    
    <div className='d-flex'>

      <div className="mt-4 ms-5 ratio ratio-16x9 w-75">
        <LivePlayer options={videoOptions} onReady={handlePlayerReady}/>
      </div>
    </div>
  );
}
