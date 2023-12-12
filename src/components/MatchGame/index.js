import './index.css'
import {Component} from 'react'

class MatchGame extends Component {
  constructor(props) {
    super(props)

    const {imagesList} = props

    this.state = {
      time: 60,
      imgUrl: imagesList[0].imageUrl,
      category: 'FRUIT',
      isTrue: false,
      count: 0,
    }
  }

  componentDidMount = () => {
    this.timerId = setInterval(this.timeCount, 1000)
  }

  timeCount = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isTrue: true})
    }
  }

  renderTopNavSection = () => {
    const {time, count} = this.state

    return (
      <div className="navigation">
        <div className="left-nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
        </div>
        <div className="right-nav">
          <div className="one">
            <p>
              Score: <span>{count} </span>
            </p>
          </div>
          <div className="two">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p>{time} Sec</p>
          </div>
        </div>
      </div>
    )
  }

  setCategory = id => {
    this.setState({category: id})
  }

  imageClick = thumbnailUrl => {
    const {imgUrl} = this.state
    const {imagesList} = this.props

    const imageValue = imagesList.filter(
      eachValue => eachValue.thumbnailUrl === thumbnailUrl,
    )

    if (imageValue.length > 0) {
      const {imageUrl} = imageValue[0]
      if (imageUrl === imgUrl) {
        const newUrl =
          imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
        this.setState(prevState => ({
          count: prevState.count + 1,
          imgUrl: newUrl,
        }))
      } else {
        clearInterval(this.timerId)
        this.setState({isTrue: true})
      }
    }
  }

  playAgain = () => {
    const {imagesList} = this.props
    this.setState({
      time: 60,
      imgUrl: imagesList[0].imageUrl,
      category: 'FRUIT',
      isTrue: false,
      count: 0,
    })
    this.timerId = setInterval(this.timeCount, 1000)
  }

  renderScoreDetails = () => {
    const {count} = this.state
    return (
      <div className="score-dashboard">
        <div className="main-score-board">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="score-img"
          />
          <p className="your-score">Your Score</p>
          <p className="score">{count}</p>
          <button type="button" className="btn" onClick={this.playAgain}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
            />
            <p>PLAY AGAIN</p>
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {imgUrl, category, isTrue} = this.state
    const {tabsList, imagesList} = this.props
    const thumbnailsList = imagesList.filter(each => each.category === category)

    return (
      <div className="main-container">
        <div className="top-nav-section">{this.renderTopNavSection()}</div>
        <div className="body-section">
          <div className="body-main">
            {!isTrue && (
              <div>
                <div className="body-top-img">
                  <img src={imgUrl} alt="match" />
                </div>
                <div className="body-bottom-thumbnails">
                  <ul className="top-img-sec">
                    {tabsList.map(eachTab => (
                      <li key={eachTab.tabId}>
                        <button
                          type="button"
                          className={`tab-btn ${
                            category === eachTab.tabId ? 'highlighted' : ''
                          }`}
                          onClick={() => this.setCategory(eachTab.tabId)}
                        >
                          {eachTab.displayText}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <ul className="thumbnails-list">
                    {thumbnailsList.map(eachVal => (
                      <li key={eachVal.id}>
                        <button
                          type="button"
                          onClick={() => this.imageClick(eachVal.thumbnailUrl)}
                        >
                          <img src={eachVal.thumbnailUrl} alt="thumbnail" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {isTrue && this.renderScoreDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default MatchGame
