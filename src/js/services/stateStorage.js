const storageVersion = 'mats-web-2';

module.exports = {
  get,
  set
}

function get() {
  const cookie = JSON.parse(localStorage.getItem(storageVersion));

  return cookie && cookie.localState ? cookie.localState : {};
}

function set(course) {
  const localState = get();

  localState[course.code] = course.state;

  const stateToStore = JSON.stringify({localState: localState});

  localStorage.setItem(storageVersion, stateToStore);
}
