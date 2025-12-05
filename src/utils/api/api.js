async function request(api) {
  const response = await fetch(`/api/${api}`);
  if (!response.ok) {
    const err = new Error(`Failed to fetch ${api}`);
    err.status = response.status;
    throw err;
  }
  return response.json();
}

export const API = {
  getCycleData: (range) => request(`whoop/cycles?range=${range}`),
  getRecoveryData: (range) => request(`whoop/recovery?range=${range}`),
  getSleepData: (range) => request(`whoop/sleep?range=${range}`),
  getWorkoutData: (range) => request(`whoop/workouts?range=${range}`),
};

