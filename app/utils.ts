import { createNewSortInstance } from "fast-sort";

const getBaseUrl = () =>
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.APP_BASE_URL;

export const generateApiUrl = (path: string) => {
  return `${getBaseUrl()}/api/${path}`;
};

export const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  }).compare,
});
