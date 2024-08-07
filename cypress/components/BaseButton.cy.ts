import BaseButton from "@/components/BaseButton.vue";

describe("<FragmentCustomPagePolicy />", () => {
  beforeEach(() => {
    cy.resetNuxt();
  });

  it("Given `CustomPage` When component `mount` Then `body` seen", () => {
    cy.mount(BaseButton, {
      props: {
        type: "button",
        classType: "primary",
        class: "mb-10 w-full",
        disable: false,
      },
      slots: {
        default: "會員登入",
      },
    });
  });
});
