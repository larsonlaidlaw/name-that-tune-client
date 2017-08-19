import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { Icon, Container, Grid, List, Rail, Header, Image, Button } from 'semantic-ui-react'
import Tracklist from '../components/play/tracklist'


class Player extends Component {
  state = {
    videoIds: [],
    videoChannels: [],
    videoTitles: [],
    player: null,
    i: 0,
    playing: false
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
    this.setState({
      playing: true
    })
  }

  onPauseVideo = () => {
    this.state.player.pauseVideo()
    this.setState({
      playing: false
    })
  }

  onNextVideo = () => {
    this.setState({
      i: this.state.i + 1
    })
  }


  onStateChange = (event) => {
    console.log('calling from onstate change', event)
    if (event.data === 5 && this.state.i !== 0) {
      this.state.playing && this.onPlayVideo()
    }
  }

  onEnd = () => {
    this.onNextVideo()
  }

  changeVideoId = (videoId) => {
    this.setState({
      videoId: videoId
    })
  }

  changeI = (index) => {
    this.setState({
      i: index
    })
  }

  render(){
    console.log('player console',this.state.player)

    return(
      <div>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={8} style={{ minWidth: 680 }}  >
               <Header>{this.state.videoTitles[this.state.i]}</Header>
                <YouTube
                  videoId={this.state.videoIds[this.state.i]}
                  onReady={this.onReady}
                  onStateChange={this.onStateChange}
                  onEnd={this.onEnd}
                />
                <Button.Group labeled compact>
                  <Button icon='play' content='Play' compact onClick={this.onPlayVideo}/>
                  <Button icon='pause' content='Pause' compact onClick={this.onPauseVideo}/>
                  <Button icon='step forward' content='Next' compact onClick={this.onNextVideo}/>
                </Button.Group>
            </Grid.Column>
            <Grid.Column width={3} >
                <Tracklist
                  videoList={this.state.videoTitles}
                  changeI={this.changeI}
                />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    )


  }
}

export default Player

// return(
//   <div>
//     <Container textAlign="center">
//       <Grid >
//         <Grid.Row columns="2">
//           <Grid.Column >
//
//
//
//             <YouTube
//               videoId={this.state.videoIds[this.state.i]}
//               onReady={this.onReady}
//               onStateChange={this.onStateChange}
//               onEnd={this.onEnd}
//             />
//
//             <Icon link name="play" size='large' onClick={this.onPlayVideo}/>
//             <Icon link name="pause" size='large' onClick={this.onPauseVideo} />
//             <Icon link name="step forward" size='large' onClick={this.onNextVideo} />
//
//           </Grid.Column>
//           <Grid.Column>
//           <List>
//             <List.Item>Dope ass shit</List.Item>
//             <List.Item>Doper ass shit</List.Item>
//             <List.Item>Dopest ass shit</List.Item>
//           </List>
//           </Grid.Column>
//
//
//         </Grid.Row>
//       </Grid>
//     </Container>
//   </div>
// )
