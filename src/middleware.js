const promiseMiddleware = store => next => action => {
	if (isPromise(action.payload)) {
    console.log("found promise")
    action.payload.then(
      res => {
        console.log("found result");
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
	}

  next(action);
};

function isPromise(v) {
  return v && typeof v.then =='function';
}

export {
  promiseMiddleware
}