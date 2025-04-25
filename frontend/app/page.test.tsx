import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Home", () => {
  it("メインのコンテンツが表示される", () => {
    render(<Home />);

    const heading = screen.getByTestId("main-heading");

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Next.js + Vitestへようこそ");
  });

  it("「詳細を見る」リンクがAboutページに正しくリンクしていること", () => {
    render(<Home />);

    const link = screen.getByText("詳細を見る");

    expect(link).toHaveAttribute("href", "/about");
  });

  it("フィーチャーカードが表示されていること", () => {
    render(<Home />);

    const featureCard = screen.getByTestId("feature-card");

    expect(featureCard).toBeInTheDocument();
    expect(featureCard).toHaveTextContent("Appルーターの特徴");
  });

  it("Appルーターの特徴リストが3項目あること", () => {
    render(<Home />);

    const featureCard = screen.getByTestId("feature-card");
    const listItems = featureCard.querySelectorAll("li");

    expect(listItems.length).toBe(3);
  });
});
