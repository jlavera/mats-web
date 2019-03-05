const storageVersion = 'mats-web-2';

export const getAll = () => {
  const cookie = JSON.parse(localStorage.getItem(storageVersion));
  return cookie && cookie.localState ? cookie.localState : {};
};

export const setCourse = course => {
  const localState = getAll();
  const stateToStore = JSON.stringify({
    localState: {
      ...localState,
      courses: {
        ...localState.courses,
        [course.code]: course.state
      }
    }
  });

  localStorage.setItem(storageVersion, stateToStore);
};

export const setOptative = ({ year, slotIndex, code }) => {
  const localState = getAll();
  const stateToStore = JSON.stringify({
    localState: {
      ...localState,
      optatives: {
        ...localState.optatives,
        [year]: {
          ...(localState.optatives && localState.optatives[year]),
          [slotIndex]: code
        }
      }
    }
  });

  localStorage.setItem(storageVersion, stateToStore);
};
