import React from 'react';
import 'video.js/dist/video-js.css';

import videojs from 'video.js';

export default function LivePlayer(props){    
  return(
    <div className="ratio ratio-16x9">
      <div data-vjs-player>
        <video className='video-js vjs-big-play-centered' data-setup='{"autoplay": false, "controls": true}' src="SampleVideo_1280x720_30mb.mp4" />
      </div>
    </div>
  );
}
