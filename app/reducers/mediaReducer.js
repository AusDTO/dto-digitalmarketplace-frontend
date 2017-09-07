const breakpoints = {
  mobile: 767
}

const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  media: typeof window === 'object' ? (window.innerWidth <= breakpoints.mobile ? 'mobile' : 'desktop') : null
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
