const storageVersion = 'mats-web-1';

module.exports = {
  get,
  set
}

function get() {
  const localState = JSON.parse(localStorage.getItem(storageVersion));

  if (!localState) {
    return [];
  }

  return localState.localState || [];
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

  const stateToStore = JSON.stringify({localState: localState});

  localStorage.setItem(storageVersion, stateToStore);
}
