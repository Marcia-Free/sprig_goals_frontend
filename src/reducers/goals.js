const goals = (state=[], action) => {
    
    switch(action.type){
      case 'LOGIN_SUCCESS': 
      case 'CURRENT_USER': 
        if (action.user.goals) {
          return action.user.goals
        }
        return state
      default: 
        return state
    }
  }
  
  export default goals