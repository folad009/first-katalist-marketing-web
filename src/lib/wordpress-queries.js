/** Shared ACF fragment — field group names must match WPGraphQL for ACF registration. */
export const TEMPLATE_DATA_FRAGMENT = `
  templateData
`;

/**
 * ACF image fields are "Image" fields in WordPress (media picker), so WPGraphQL
 * returns a media connection. Select the URL and alt text for each one.
 */
const media = (...names) =>
	names.map(name => `${name} { node { sourceUrl altText } }`).join("\n    ");

/**
 * Yoast SEO via WPGraphQL. Requires the "WPGraphQL Yoast SEO Addon" plugin in
 * WordPress. It is not installed yet, and asking for `seo` without it makes
 * every query fail, so it is only requested when WORDPRESS_YOAST_GRAPHQL=true.
 */
const YOAST_GRAPHQL_ENABLED =
	process.env.WORDPRESS_YOAST_GRAPHQL?.trim().toLowerCase() === "true";

export const YOAST_SEO_FRAGMENT = !YOAST_GRAPHQL_ENABLED
	? ""
	: `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
    }
  }
`;

const POST_FIELDS = `
  databaseId
  title
  slug
  content
  excerpt
  date
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  author {
    node {
      name
      slug
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
  tags {
    nodes {
      name
      slug
    }
  }
  ${YOAST_SEO_FRAGMENT}
  postFields {
    ${TEMPLATE_DATA_FRAGMENT}
    ${media("img", "img1", "img2", "img3", "img4", "img5", "img6", "detailsImg", "smallImg")}
    desc
    desc1
    desc2
    date2
    day
    month
    category
    authorRole
    status
    isBlogQuote
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int = 100) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!, $preview: Boolean = false) {
    post(id: $slug, idType: SLUG, asPreview: $preview) {
      ${POST_FIELDS}
    }
  }
`;

export const GET_POST_BY_ID = `
  query GetPostById($id: ID!, $preview: Boolean = true) {
    post(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      slug
      ${POST_FIELDS}
    }
  }
`;

export const GET_POST_SLUGS = `
  query GetPostSlugs($first: Int = 100) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
      }
    }
  }
`;

export const GET_TAGS = `
  query GetTags {
    tags(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
      }
    }
  }
`;

const SERVICE_FIELDS = `
  databaseId
  title
  slug
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
    }
  }
  ${YOAST_SEO_FRAGMENT}
  serviceFields {
    ${TEMPLATE_DATA_FRAGMENT}
    shortTitle
    titleLarge
    iconName
    svg
    ${media("img", "img2", "img3", "img4", "img5", "bgImg", "bgImg2")}
    desc
    shortDesc
    desc1
    desc2
    desc3
    totalProject
  }
`;

export const GET_SERVICES = `
  query GetServices($first: Int = 100) {
    services(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: ASC } }) {
      nodes {
        ${SERVICE_FIELDS}
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = `
  query GetServiceBySlug($slug: ID!, $preview: Boolean = false) {
    service(id: $slug, idType: SLUG, asPreview: $preview) {
      ${SERVICE_FIELDS}
    }
  }
`;

export const GET_SERVICE_BY_ID = `
  query GetServiceById($id: ID!, $preview: Boolean = true) {
    service(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      slug
      ${SERVICE_FIELDS}
    }
  }
`;

const PORTFOLIO_FIELDS = `
  databaseId
  title
  slug
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
    }
  }
  ${YOAST_SEO_FRAGMENT}
  portfolioFields {
    ${TEMPLATE_DATA_FRAGMENT}
    title2
    titleLarge
    ${media("img", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "imgLarge", "detailsImg", "featuredImg")}
    desc
    shortDesc
    desc1
    desc2
    category
    featured
    featuredDesc
    dataFilter
    tags
  }
`;

export const GET_PORTFOLIO = `
  query GetPortfolio($first: Int = 100) {
    portfolios(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: ASC } }) {
      nodes {
        ${PORTFOLIO_FIELDS}
      }
    }
  }
`;

export const GET_PORTFOLIO_BY_SLUG = `
  query GetPortfolioBySlug($slug: ID!, $preview: Boolean = false) {
    portfolio(id: $slug, idType: SLUG, asPreview: $preview) {
      ${PORTFOLIO_FIELDS}
    }
  }
`;

export const GET_PORTFOLIO_BY_ID = `
  query GetPortfolioById($id: ID!, $preview: Boolean = true) {
    portfolio(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      slug
      ${PORTFOLIO_FIELDS}
    }
  }
`;

const TEAM_MEMBER_FIELDS = `
  databaseId
  title
  slug
  content
  excerpt
  featuredImage {
    node {
      sourceUrl
    }
  }
  ${YOAST_SEO_FRAGMENT}
  teamMemberFields {
    ${TEMPLATE_DATA_FRAGMENT}
    name
    desig
    ${media("img", "img2", "imgLarge")}
  }
`;

export const GET_TEAM_MEMBERS = `
  query GetTeamMembers($first: Int = 100) {
    teamMembers(first: $first, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        ${TEAM_MEMBER_FIELDS}
      }
    }
  }
`;

export const GET_TEAM_MEMBER_BY_SLUG = `
  query GetTeamMemberBySlug($slug: ID!, $preview: Boolean = false) {
    teamMember(id: $slug, idType: SLUG, asPreview: $preview) {
      ${TEAM_MEMBER_FIELDS}
    }
  }
`;

export const GET_TEAM_MEMBER_BY_ID = `
  query GetTeamMemberById($id: ID!, $preview: Boolean = true) {
    teamMember(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      slug
      ${TEAM_MEMBER_FIELDS}
    }
  }
`;

export const GET_TESTIMONIALS = `
  query GetTestimonials($first: Int = 100) {
    testimonials(first: $first, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        databaseId
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        testimonialFields {
          ${TEMPLATE_DATA_FRAGMENT}
          authorName
          authorDesig
          ${media("img", "img2", "logoImg", "logoImgLight", "thumbImg")}
          desc
          desc2
          desc3
          desc4
          desc5
        }
      }
    }
  }
`;

const CAREER_FIELDS = `
  databaseId
  title
  slug
  content
  excerpt
  ${YOAST_SEO_FRAGMENT}
  careerFields {
    ${TEMPLATE_DATA_FRAGMENT}
    iconName
    price
    duration
    location
    category
    need
  }
`;

export const GET_CAREERS = `
  query GetCareers($first: Int = 100) {
    careers(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        ${CAREER_FIELDS}
      }
    }
  }
`;

export const GET_CAREER_BY_SLUG = `
  query GetCareerBySlug($slug: ID!, $preview: Boolean = false) {
    career(id: $slug, idType: SLUG, asPreview: $preview) {
      ${CAREER_FIELDS}
    }
  }
`;

export const GET_CAREER_BY_ID = `
  query GetCareerById($id: ID!, $preview: Boolean = true) {
    career(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      slug
      ${CAREER_FIELDS}
    }
  }
`;

/**
 * Site-wide images live on the "Site Images" page in WordPress
 * (Pages → Site Images, slug `site-images`). Its ACF field group is exposed
 * to GraphQL as `siteImages`. ACF free has no options pages, hence the page.
 */
export const SITE_IMAGE_FIELD_NAMES = [
	"heroImage",
	"heroClient1",
	"heroClient2",
	"heroClient3",
	"aboutImage",
	"aboutVideoImage",
	"aboutPageImage",
	"ctaImage",
	"faqImage",
	"testimonialSectionImage",
	"contactBanner",
	"errorImage",
];

export const GET_SITE_IMAGES = `
  query GetSiteImages {
    page(id: "site-images", idType: URI) {
      siteImages {
        ${media(...SITE_IMAGE_FIELD_NAMES)}
      }
    }
  }
`;

/** Kept for backwards compatibility: site image fields are always media now. */
export const GET_SITE_IMAGES_MEDIA = GET_SITE_IMAGES;
