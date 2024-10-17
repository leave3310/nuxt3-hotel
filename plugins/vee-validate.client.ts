import { configure, defineRule } from "vee-validate";
import * as rules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

export default defineNuxtPlugin((_nuxtApp) => {
  Object.keys(rules).forEach((rule) => {
    if (rule !== "all") {
      defineRule(rule, rules[rule]);
    }
  });

  configure({
    generateMessage: localize({
      zh_TW: {
        ...zhTW,
        messages: {
          ...zhTW.messages,
          required: "此欄位為必填",

        },
      },
    }),
  });

  setLocale("zh_TW");
});
