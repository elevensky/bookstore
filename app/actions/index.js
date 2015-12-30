import { CALL_API, Schemas } from '../middleware/api'

export const INDEX_REQUEST = 'INDEX_REQUEST'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js
//返回一个action
function fetchIndex() {
  return {
    [CALL_API]: {
      types: [ INDEX_REQUEST, INDEX_SUCCESS, INDEX_FAILURE ],
      endpoint: 'index',
      schema: Schemas.INDEX
    }
  }
}

export function loadIndex() {
  return (dispatch, getState) => {
    //检查是否缓存
    const recoms = getState().indexs.recoms
    if (recoms) {
      return null
    }
    //抓取数据
    return dispatch(fetchUser())
  }
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRepo(fullName) {
  return {
    [CALL_API]: {
      types: [ REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE ],
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO
    }
  }
}

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRepo(fullName, requiredFields = []) {
  return (dispatch, getState) => {
    const repo = getState().entities.repos[fullName]
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchRepo(fullName))
  }
}


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
