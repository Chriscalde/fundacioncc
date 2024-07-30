import ReactPlayer from "react-player";
import react from "react";
export default function VideoPlayer(){
    return (
        <div className='player-wrapper mx-auto my-4'>
            <h2 className="text-center text-3xl font-semibold text-secondary my-2">Tutorial</h2>
          <ReactPlayer
            className='react-player'
            url='https://player.vimeo.com/video/992214959?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' // URL de tu video
            width='350px'
            height='350px'
            controls={true}
          />
        </div>
      );
    };
