import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  PUBLIC_WAGTAIL_URL: {
    public: true,
    // Inlined at build time from .env.development / .env.production
    static: true,
    description: "Base URL of the Wagtail CMS, without a trailing slash",
  },
  IMAGES_PER_ROW: {
    public: true,
    static: true,
    description: "Number of images in a row",
  },
});
