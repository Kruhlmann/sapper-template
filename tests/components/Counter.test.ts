/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/svelte";
import Counter from "../../src/components/Counter.svelte";

it("should render", () => {
    expect(1).toBe(1);
    const results = render(Counter, { props: { count: 0 } });
    expect(results).toBeDefined();
});
