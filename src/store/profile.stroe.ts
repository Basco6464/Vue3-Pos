export const setAccessToken = (value: any) => {
  localStorage.setItem("access_token", value);
};
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const setProfile = (value: any) => {
  localStorage.setItem("profile", value);
};

export const getProfile = () => {
  try {
    const profile = localStorage.getItem("profile");
    if (profile != "" && profile !== null && profile !== undefined) {
      return JSON.parse(profile);
    }
    return null;
  } catch (error) {
    return null;
  }
};
