import React from 'react'
import {List, Button, Modal, Input} from 'semantic-ui-react'

const MainRender = (props) => {
  return (
    <div>
      {props.videoList.length > 0 ? <h3>Video List</h3> : ""}
      <List celled ordered>
        {props.videos}
      </List>
      {props.videoList.length > 1 ?
        <Modal
          trigger={<Button>Save Playlist</Button>}
          // header='Name your playlist'
          content={<Input label="Name your playlist:" type="text" transparent={true} fluid={true} onChange={props.listTitleHandler}/>}
          actions={[
            { key: 'Cancel', content: 'Cancel', color: 'red', triggerClose: true },
            { key: 'Save', content: 'Save', triggerClose: true, onClick: props.savePlaylist },
          ]}
        /> :
      ""}
    </div>
  )
}

export default MainRender
