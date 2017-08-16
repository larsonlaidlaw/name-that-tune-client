import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { Icon } from 'semantic-ui-react'
import Player from '../components/player/player'


class PlayGameContainer extends Component {
  state = {
    videoIds: [],
    videoChannels: [],
    videoTitles: [],
    player: null,
    i: 0
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/lists/${this.props.match.params.id}`)
      .then(response=>response.json())
      .then(data => {

        let videoIds = []
        let videoChannels = []
        let videoTitles = []

        data.videos.map(video => {
          videoIds.push(video.video_id)
          videoTitles.push(video.video_title)
          videoChannels.push(video.video_channel)
        })
        this.setState({ videoIds, videoChannels, videoTitles })
      })
  }

  onReady = (event) => {
    console.log(`YouTube Player object for videoId: "${this.state.videoTitles[this.state.i]}" has been saved to state.`)
    this.setState({ player: event.target })
  }

  onPlayVideo = () => {
    this.state.player.playVideo()
    console.log('trying to play', this.state.videoTitles[this.state.i])
  }

  onPauseVideo = () => {
    this.state.player.pauseVideo()
  }

  onNextVideo = () => {
    this.setState({
      i: this.state.i + 1
    })
  }


  onStateChange = (event) => {
    console.log('calling from onstate change', event)
    if (event.data === 5 && this.state.i !== 0) {
      this.onPlayVideo()
    }
  }

  onEnd = () => {
    this.onNextVideo()
  }

  render(){

    return(
      <div>
        <YouTube
          videoId={this.state.videoIds[this.state.i]}
          onReady={this.onReady.bind(this)}
          onStateChange={this.onStateChange}
          onEnd={this.onEnd}
        />
        <Icon link name="play" size='large' onClick={this.onPlayVideo}/>
        <Icon link name="pause" size='large' onClick={this.onPauseVideo} />
        <Icon link name="step forward" size='large' onClick={this.onNextVideo} />
      </div>
    )
  }
}

export default PlayGameContainer
