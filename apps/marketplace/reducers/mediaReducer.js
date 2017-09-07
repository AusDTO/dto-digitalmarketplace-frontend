const breakpoints = {
  mobile: 767
}

const initialMedia = () => {
  if (typeof window !== 'object') {
    return null
  }
  return window.innerWidth <= breakpoints.mobile ? 'mobile' : 'desktop'
}

const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  media: initialMedia()
}

const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SCREEN_RESIZE':
      return {
        ...state,
        screenWidth: action.screenWidth,
        media: action.screenWidth <= breakpoints.mobile ? 'mobile' : 'desktop'
      }

    default:
      return state
  }
}

export default mediaReducer
