import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import React, {Fragment} from 'react';


import Account from '../components/Account'
import Nav from '../layouts/Nav'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  const customTheme = { 
    default: {
    colors: {
      brand: '#FF9903',
      brandAccent: '#FFB54F',
      brandButtonText: '#eaeaea',
      defaultButtonBackground: '#eaeaea',
      defaultButtonBackgroundHover: '#FF9903',
      defaultButtonBorder: 'lightgray',
      defaultButtonText: 'gray',
      dividerBackground: '#eaeaea',
      inputBackground: 'transparent',
      inputBorder: 'lightgray',
      inputBorderHover: 'gray',
      inputBorderFocus: 'gray',
      inputText: '#eaeaea',
      inputLabelText: '#eaeaea',
      inputPlaceholder: 'darkgray',
      messageText: 'gray',
      messageTextDanger: 'red',
      anchorTextColor: 'gray',
      anchorTextHoverColor: 'darkgray',
    },
    space: {
      spaceSmall: '4px',
      spaceMedium: '8px',
      spaceLarge: '16px',
      labelBottomMargin: '8px',
      anchorBottomMargin: '4px',
      emailInputSpacing: '4px',
      socialAuthSpacing: '4px',
      buttonPadding: '10px 15px',
      inputPadding: '10px 15px',
    },
    fontSizes: {
      baseBodySize: '13px',
      baseInputSize: '14px',
      baseLabelSize: '14px',
      baseButtonSize: '14px',
    },
    fonts: {
      bodyFontFamily: `ui-sans-serif, sans-serif`,
      buttonFontFamily: `ui-sans-serif, sans-serif`,
      inputFontFamily: `ui-sans-serif, sans-serif`,
      labelFontFamily: `ui-sans-serif, sans-serif`,
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: '1px',
      inputBorderWidth: '1px',
    },
    radii: {
      borderRadiusButton: '5px',
      buttonBorderRadius: '5px',
      inputBorderRadius: '5px',
    },
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  }
  }

  return (
    <Fragment>
    <div className="container" style={{ padding: '0px 0 10px 0' }}>
      <Row>
      {!session ? (

        <Auth
          supabaseClient={supabase}
          theme="default"
          appearance={{ theme: customTheme}}
          //theme="dark"
          //appearance={{ theme: ThemeSupa}}
         // appearance={{ theme: ThemeSupa }}
         // theme="default"
        />
      ) : (
        <Account session={session} />
      )}
      </Row>
    </div>
    
    <div class="content">
      <Row>
        <Col lg={2} xs={2}>
          <Nav/>
        </Col>
        <Col lg={10} xs={10} style={{ margin: '0px' }}>
        <div class="content-right">
          <p>Content</p>
          </div>
        </Col>
      </Row>
  
    </div>
    </Fragment>
  )
}

export default Home