import React, { Component, Fragment } from 'react';
import {Row, Col, Card, CardBody, CardTitle, CardText, CardFooter, Button, Spinner } from 'reactstrap';

class QuoteMachine extends Component {
  constructor() {
    super();
    this.END_POINT = 'https://quota.glitch.me/random';
    this.COLORS = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
    this.state = {
      quote: {
        text: '',
        author: ''
      },
      hasQuote: false,
      color: 'white'
    }

    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    this.getRandomQuote();
  }

  getRandomQuote(event) {
    fetch(this.END_POINT)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.quoteText) {
        let {quote} = this.state;
        quote.text = data.quoteText;
        quote.author = data.quoteAuthor;
        this.setState({ quote, color: Math.floor(Math.random() * this.COLORS.length) }, () => {
          if (this.state.hasQuote === false) {
            this.setState({hasQuote: true})
          }
        })
        console.log(this.state.color)
      }
      else {
        console.log('Error 404! Quote not found')
      }
    })
  }

  renderQuote() {
    const {text, author} = this.state.quote;
    return (
      <Fragment>
        <h1 style={{color: 'white', paddingTop: "30vh"}}>Random Quote Generator</h1>
        <Row style={{paddimg: 0, margin: 0}}>
          <Col sm='4'>
          </Col>
          <Col sm='4'>
            <Card id="quote-box">
              <CardBody>
                <CardTitle id="text" style={{fontSize: 25, color: this.COLORS[this.state.color]}}>{text}</CardTitle>
                <CardText id="author" style={{color: this.COLORS[this.state.color]}}>- {author}</CardText>
              </CardBody>
              <CardFooter>
                <Button
                  outline
                  color="primary"
                  onClick={this.getRandomQuote}
                  id='new-quote'
                  style={{marginRight: 5}}
                >
                  New Quote!
                </Button>
                <a href={ 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.quote.text + '" -' + this.state.quote.author) } id='tweet-quote'>
                  <Button
                    outline
                    style={{marginLeft: 5}}
                  >
                    Tweet This!
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </Col>
          <Col sm='4'>
          </Col>
        </Row>
      </Fragment>
    )
  }

  render() {
    return(
      <div style={{backgroundColor: this.COLORS[this.state.color], height: "100vh"}}>
        { this.state.hasQuote === true ? this.renderQuote() : <Spinner type="grow" color="primary" style={{ width: '3rem', height: '3rem', position: "fixed", top: "50%",left: "50%"}} /> }
      </div>
    )
  }
}

export default QuoteMachine;