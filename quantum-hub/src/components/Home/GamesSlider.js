/*!

 =========================================================
 * Material Kit React - v1.8.0 based on Material Kit - v2.0.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-kit-react
 * Copyright 2019 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import React from 'react'
import { Link } from 'react-router-dom'
// core components
import widgetList from '../Widget/widgetList'
// @material-ui/core components
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { withStyles } from '@material-ui/core/styles'

// react-slick slider component and css
import Slider from "react-slick"
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import styles from '../../assets/jss/material-kit-react/views/home.js'


class GamesSlider extends React.Component {
  constructor (props) {
    super(props)
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  render () {
    const { classes } = this.props

    const gameCard =
    Object.keys(widgetList).map((widget) => {
      if (widgetList[widget].visible === false) return ''
      return (
        <div>
          <Link
          className={classes.gameLink}
          to={{
            pathname: widgetList[widget].route
            }}
          >
            <Card className={classes.gameCard} variant='outlined'>
              <CardContent>
                <img src={widgetList[widget].image} alt={widgetList[widget].brand} className={classes.gameCardImage} />
                <p className={classes.gameCardText}>
                  {widgetList[widget].brand}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )
    })

    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
      ]
  }
    return (
        <div className={classes.sliderContainer}>
          <Grid container justifyContent='space-between'>
            <Grid item xs={10}>
              <h1 className={classes.subheadingYellow}>Quantum Hub Mini Games</h1>
              <p className={classes.descriptionText}>Try your hand at one of our interactive quantum computing games!</p>
            </Grid>
            <Grid item>
              <ChevronLeftIcon className={classes.arrowIcons} onClick={this.previous}/>
              <ChevronRightIcon className={classes.arrowIcons} onClick={this.next}/>
            </Grid>
          </Grid>
          <Slider ref={c => (this.slider = c)} {...settings} className={classes.slider}>
            {gameCard}
          </Slider>
        </div>
    )
  }
}

export default withStyles(styles)(GamesSlider)