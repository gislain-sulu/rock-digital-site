export type GsapRoot = ParentNode & {
  querySelector: Document['querySelector'];
  querySelectorAll: Document['querySelectorAll'];
};

export function q<T extends Element>(root: GsapRoot, selector: string): T | null {
  return root.querySelector(selector) as T | null;
}

export function qa(root: GsapRoot, selector: string): Element[] {
  return Array.from(root.querySelectorAll(selector));
}

export function getMain(root: GsapRoot = document): HTMLElement | null {
  return q<HTMLElement>(root, '#main');
}
