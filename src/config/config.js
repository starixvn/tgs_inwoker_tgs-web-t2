import featureList from "./features";

var template = 2; //2 for T2, 3 for T3 (based on .xd file)
const config = {
  baseUrl:
    window?.env?.apiUrl ||
    (window?.env ? "/api/" : "https://stg-v226.rpgp.cc/api/"),
  client:
    window?.env?.client ||
    "EsCoOyFA2SCynkW8Zbg7fYjY0YPfIIlp8SgQKTRng908gAeJF5OdC6i",
  currency: window?.env?.currency || "HKD",
  brand: window?.env?.brand || process.env.REACT_APP_BRAND || "V226",
  brandName: window?.env?.brandName
    ? window?.env?.brandName
    : window?.env?.brand || "金牛会",
  theme: window?.env?.theme || "blackgold",
  wapVersion: template,
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
  affiliateId: window?.env?.affiliateId || "",
  features: featureList["default"],
  version: window?.env?.version,
  configUrl: window?.env?.configUrl || "https://app12.srvptt.com/",
};

export default config;
