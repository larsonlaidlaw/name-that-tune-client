import React from 'react'
import { Container, Grid, Segment, Image, Rail } from 'semantic-ui-react'

const LandingPage = () => (
  <Grid centered columns={3}>
    <Grid.Column>
      <Segment>
        <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />

        <Rail dividing position='left'>
          <Segment>Left Rail Content</Segment>
        </Rail>

        <Rail position='right'>
          <Segment>Right Rail Content</Segment>
        </Rail>
      </Segment>
    </Grid.Column>
  </Grid>
)

export default LandingPage
