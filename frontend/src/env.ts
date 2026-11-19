import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  PUBLIC_WAGTAIL_URL: {
    public: true,
    description: "Base URL of the Wagtail CMS, without a trailing slash",
  },
});
