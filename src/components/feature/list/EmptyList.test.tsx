import React from "react"
import { screen } from "@testing-library/react"
import { render } from "@testing-library/react"
import { EmptyList } from "./EmptyList"

describe("EmptyList Component", () => {
  it("should render empty list message", () => {
    render(<EmptyList />)
    expect(screen.getByText("Sorry, the list is empty")).toBeInTheDocument()
  })

  it("should render message in paragraph element", () => {
    render(<EmptyList />)
    const message = screen.getByText("Sorry, the list is empty")
    expect(message.tagName).toBe("P")
  })
})
