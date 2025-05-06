// 




import { FormEvent } from "react"
import { signUp } from "@aws-amplify/auth"

interface SignUpFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
  preferredUsername: HTMLInputElement
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpFormElements
}

export default function App() {
  async function handleSubmit(event: FormEvent<SignUpForm>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = form.elements.email.value
    const password = form.elements.password.value
    const preferredUsername = form.elements.preferredUsername.value

    // Basic validation
    if (!email || !password || !preferredUsername) {
      alert("Email, password, and preferred username are required.")
      return
    }

    try {
      const user = await signUp({
        username: email,
        password,
        attributes: {
          preferredUsername,
        },
      })
      console.log("User signed up successfully:", user)
    } catch (error) {
      console.error("Signup error:", error)
      alert(`Signup failed: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <label htmlFor="preferredUsername">Preferred Username:</label>
      <input type="text" id="preferredUsername" name="preferredUsername" required />
      <input type="submit" value="Sign Up" />
    </form>
  )
}
