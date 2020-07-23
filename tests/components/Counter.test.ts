/**
 * @jest-environment jsdom
 */

import * as svelte from "@testing-library/svelte";
import Counter from "../../src/components/Counter.svelte";
import "@testing-library/jest-dom/extend-expect";

const counter_prefix = "The current count inside Counter.svelte is";

it("should render", () => {
    const dom = svelte.render(Counter);

    const label = dom.getByText(`${counter_prefix} 0`);

    expect(label).toBeInTheDocument();
    expect(label).toBeVisible();
});

it("should allow a custom count", () => {
    const count = Math.floor(Math.random() * 10000);
    const dom = svelte.render(Counter, { props: { count } });

    const label = dom.getByText(`${counter_prefix} ${count}`);

    expect(label).toBeInTheDocument();
    expect(label).toBeVisible();
});

it("should respond to button clicks", async () => {
    const count = Math.floor(Math.random() * 10000);
    const dom = svelte.render(Counter, { props: { count } });

    const label = dom.getByText(`${counter_prefix} ${count}`);
    const button_add = dom.getByText("Add");
    const button_subtract = dom.getByText("Subtract");

    expect(button_add).toBeInTheDocument();
    expect(button_subtract).toBeInTheDocument();
    expect(button_add).toBeVisible();
    expect(button_subtract).toBeVisible();

    await svelte.fireEvent.click(button_add);
    expect(label).toHaveTextContent(`${counter_prefix} ${count + 1}`);

    await svelte.fireEvent.click(button_subtract);
    expect(label).toHaveTextContent(`${counter_prefix} ${count}`);

    await svelte.fireEvent.click(button_subtract);
    expect(label).toHaveTextContent(`${counter_prefix} ${count - 1}`);
});
