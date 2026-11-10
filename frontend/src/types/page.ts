/** Rendition produced by Wagtail's `ImageRenditionField`. */
export interface ImageRendition {
  url: string;
  full_url: string;
  width: number;
  height: number;
  alt: string;
}

/** A `wagtailimages.Image` foreign key as nested in an API response. */
export interface ImageReference {
  id: number;
  meta: {
    type: "wagtailimages.Image";
    detail_url: string;
    download_url: string;
  };
  title: string;
}

export interface PageParent {
  id: number;
  meta: {
    type: string;
    detail_url: string;
    html_url: string | null;
  };
  title: string;
}

export interface PageMeta<TType extends string = string> {
  type: TType;
  detail_url: string;
  html_url: string | null;
  slug: string;
  first_published_at: string | null;
  locale?: string;
  // Only present on detail responses (or when requested via `?fields=`).
  show_in_menus?: boolean;
  seo_title?: string;
  search_description?: string;
  alias_of?: PageParent | null;
  parent?: PageParent | null;
}

/** Fields common to every Wagtail page. */
export interface Page<TType extends string = string> {
  id: number;
  meta: PageMeta<TType>;
  title: string;
}

/** `home.HomePageImage` (orderable child of `HomePage`). */
export interface HomePageImage {
  id: number;
  meta: {
    type: "home.HomePageImage";
  };
  image: ImageReference;
  /** max-2400x2400, AVIF */
  image_full: ImageRendition;
  /** max-800x800, AVIF */
  image_thumb: ImageRendition;
}

/** `home.HomePage` */
export interface HomePage extends Page<"home.HomePage"> {
  /** Rich text HTML; empty string when blank. */
  body: string;
  images: HomePageImage[];
}

/** Response shape of the pages listing endpoint. */
export interface PageListResponse<T extends Page = Page> {
  meta: {
    total_count: number;
  };
  items: T[];
}
