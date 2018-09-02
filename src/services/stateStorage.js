const storageVersion = 'mats-web-2';

export const get = () => {
  const cookie = JSON.parse(localStorage.getItem(storageVersion));
  return cookie && cookie.localState ? cookie.localState : {};
}

export const set = course => {
  const localState = get();
  const stateToStore = JSON.stringify({ localState: { ...localState, [course.code]: course.state } });
  localStorage.setItem(storageVersion, stateToStore);
}
