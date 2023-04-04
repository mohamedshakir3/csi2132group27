export const login = async (username, password) => {
  const response = await fetch("http://localhost:3000/api/postReq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      username,
      password,
    },
  })

  const token = response.data.token
  if (token) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }

  return response.data
}

export const isAuthenticated = () => {
  const user = localStorage.getItem("user")
  if (!user) {
    return {}
  }
  return JSON.parse(user)
}
