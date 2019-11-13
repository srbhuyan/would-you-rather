import React, { Component } from 'react'
import { connect } from 'react-redux'
import Highlight from './Highlight'
import Poll from './Poll'
import Result from './Result'

class QuestionCard extends Component {

  switchView = (question, optionOne, optionTwo) => {
    switch(this.props.view) {
      case 'poll':
        return <Poll id={this.props.id}/>
      case 'result':
        return <Result
          optionOneText={optionOne.text}
          optionTwoText={optionTwo.text}
          optionOneVotes={optionOne.votes.length}
          optionTwoVotes={optionTwo.votes.length}/>
      default:
        return <Highlight id={this.props.id} highlight={optionOne.text} timestamp={question.timestamp}/>
    }
  }
  render() {
    const { owner, avatar, question } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    // console.log(this.props)

    const { optionOne, optionTwo } = question

    return (
      <div className='question'>
        <p>{owner} asks:</p>
        <img
          src={avatar}
          alt={`Avatar of ${owner}`}
          className='avatar'
        />
        {this.switchView(question, optionOne, optionTwo)}
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id, highlight }) {

  const question = questions[id]
  const ans = Object.keys(users[authedUser].answers)
  // const qus = users[authedUser].questions

  return {
    authedUser,
    owner: users[question.author].name,
    avatar: users[question.author].avatarURL,
    question: question
      ? question
      : null,
    view: highlight
          ? 'highlight'
          : (!ans.includes(id) ? 'poll' : 'result')
  }
}

export default connect(mapStateToProps)(QuestionCard)