import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_QUESTION_ANSWER
} from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: {...action.question}
      }
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION_ANSWER :
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
            [action.answer]: {
              ...state[action.qid][action.answer],
              votes: [...state[action.qid][action.answer].votes, action.uid]
            }
        }
      }
    default :
      return state
  }
}