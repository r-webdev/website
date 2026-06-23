export const defineCustomElement = (
  name: string,
  elementClass: CustomElementConstructor,
) => {
  if (!customElements.get(name)) {
    customElements.define(name, elementClass);
  }
};
