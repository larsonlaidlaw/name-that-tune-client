import React from 'react'
import YouTube from 'react-youtube';
import { Button } from 'semantic-ui-react'

const SelectedVideo = (props) => {

    return(
      <div>
        { props.videoObject.snippet &&
          <div>
            <h2>{props.videoObject.snippet.title}</h2>
            <Button content='Preview Video' onClick={props.playVideo}/>
            <Button content='Save Video' onClick={props.addVideo}/>
          </div>
        }
      </div>
    )
}
export default SelectedVideo
