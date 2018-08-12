const isFunction = x => typeof x === 'function'

export const callOrReturn = val => args => (isFunction(val) ? val(args) : val)
