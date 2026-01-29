import React from "react"
import { render, screen } from "@testing-library/react"
import { Footer } from "./Footer"

test("renders footer link with correct href", () => {
  render(<Footer />)
  const footerLink = screen.getByRole("link", {
    name: /all rights reserved/i,
  })
  expect(footerLink).toBeInTheDocument()
  expect(footerLink).toHaveAttribute("href", "https://example.org")
})
