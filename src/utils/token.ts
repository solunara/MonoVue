export const SET_XYT_TOKEN = (userInfo: string) => {
  localStorage.setItem("XYT_USER_INFO", userInfo)
}

export const GET_XYT_TOKEN = () => {
  return localStorage.getItem("XYT_USER_INFO")
}

export const REMOVE_XYT_TOKEN = () => {
  localStorage.removeItem("XYT_USER_INFO")
}
