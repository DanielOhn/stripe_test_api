import React from "react"
import "../styles/Contact.css"

function Contact() {
  return (
    <div className="contact">
      <form>
        <input placeholder="name" type="text" />
        <input placeholder="email" type="text" />
        <textarea placeholder="We would love your feedback!" cols="20"></textarea>
      </form>
    </div>
  )
}

export default Contact