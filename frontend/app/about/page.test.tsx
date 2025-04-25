import { describe, it, expect } from "vitest";
import { render, screen } from "../../test-utils";
import About from "./page";

describe("About", () => {
  it("Aboutページの見出しが正しく表示されること", () => {
    render(<About />);

    const heading = screen.getByTestId("about-heading");

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("プロジェクトについて");
  });

  it("説明文が表示されていること", () => {
    render(<About />);

    const description = screen.getByTestId("about-description");

    expect(description).toBeInTheDocument();
    expect(description.textContent).toContain("Next.js 15");
    expect(description.textContent).toContain("App Router");
  });

  it("技術スタックのセクションが表示されていること", () => {
    render(<About />);

    expect(screen.getByText("技術スタック")).toBeInTheDocument();
    expect(screen.getByText("Next.js 15 (App Router)")).toBeInTheDocument();
    expect(screen.getByText("React 19")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
    expect(screen.getByText("Vitest + Testing Library")).toBeInTheDocument();
  });

  it("始め方のセクションに適切なコマンドが含まれていること", () => {
    render(<About />);

    const setupSection = screen.getByText("始め方");

    expect(setupSection).toBeInTheDocument();

    const codeBlock = document.querySelector("pre");

    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock?.textContent).toContain("npm install");
    expect(codeBlock?.textContent).toContain("npm run dev");
    expect(codeBlock?.textContent).toContain("npm test");
  });

  it("Aboutページのスナップショットが一致すること", () => {
    const { container } = render(<About />);

    expect(container).toMatchSnapshot();
  });
});
