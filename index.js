function generateReducer() {
    let actionMap = {}
    let initialState

    function setInitialState(state) {
        initialState = state
    }

    function addAction(action, callback) {
        switch(typeof action) {
            case 'object':
                actionMap[action.type] = callback
                break
            case 'function':
                actionMap[action().type] = callback
                break
            case 'string':
                actionMap[action] = callback
                break
            default:
                throw new Error("Action must be either an object, function or a string")
        }
    }

    function buildReducer() {
        return (state = initialState, action) => {
            if (action && actionMap[action.type]) {
                let processor = actionMap[action.type]
                return processor(state, action)
            }

            return state
        }
    }

    return {setInitialState, addAction, buildReducer}
}

module.exports = generateReducer()