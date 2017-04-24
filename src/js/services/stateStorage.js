module.exports = {
  get,
  set
}

function get() {
  return JSON.parse(localStorage.getItem('localState')) || [];
}

function set(course) {
  const localState = get();

  let present      = false;
  localState.forEach(localCourse => {
    if (!present && localCourse.code === course.code) {
      localCourse.state = course.state;
      present           = true;
    }
  });

  if (!present) {
    localState.push({code: course.code, state: course.state});
  }

  localStorage.setItem('localState', JSON.stringify(localState));
}
