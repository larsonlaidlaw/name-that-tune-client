import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

import { Button } from 'semantic-ui-react'
import SelectedVideo from './selectedVideo'


const videoListIds = ['_Yhyp-_hX2s','tvTRZJ-4EyI','TWcyIpul8OE', 'Bm5iA4Zupek']
// const videoListTitles = ['Up in here', 'Chillin is pretty fun']

const videoId0 = 'tvTRZJ-4EyI';
const videoId1 = 'TWcyIpul8OE';

let index = 0

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoObject: {},
      videoId: videoListIds[0],
      videoListTitles: [],
      player: null,
    };
  }

  onReady = (event) => {
    console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`);
    this.setState({
      player: event.target,
    });
  }

  onPlayVideo = () => {
    this.state.player.playVideo();
  }

  onPauseVideo = () => {
    this.state.player.pauseVideo();
  }

  onNextVideo = () => {
    index ++
    this.setState({
      videoId: videoListIds[index]
    });
  }

  selectVideo = (obj) => {
    this.setState({
      videoObject: obj,
      videoId: obj.id.videoId
    })
  }

  addVideoToPlaylist = () => {
    videoListIds.push(this.state.videoId)
    this.setState({
      videoListTitles: this.state.videoListTitles.concat(this.state.videoObject.snippet.title)
    })
  }

  render() {
    return (
      <div>
        <YouTube
          videoId={this.state.videoId}
          onReady={this.onReady.bind(this)}
        />

        <SelectedVideo
          videoObject={this.state.videoObject}
          addVideo={this.addVideoToPlaylist}
          playVideo={this.onPlayVideo}
        />

        <Button onClick={this.onPlayVideo} content='Play' icon='play' labelPosition='left' />
        <Button onClick={this.onPauseVideo} content='Pause' icon='pause' labelPosition='left' />
        <Button onClick={this.onNextVideo} content='Next' icon='right arrow' labelPosition='right' />


      </div>
    );
  }
}

export default Player
