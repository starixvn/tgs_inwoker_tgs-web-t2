//const config = require("./config." + process.env.REACT_APP_CUSTOM_NODE_ENV);

const config = {
  //baseUrl: window?.env?.baseUrl || "https://operator.tgsstg.gq/api/",
  baseUrl: window?.env ? "/api/" : "https://dev-op.rpgp.cc/api/",
  client:
    window?.env?.client ||
    "Uj1QqQQyQfRNy2K8OQM5wwUE7AqMc9soyCfyyTenJ93GGRv5wmYMr4i",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || "PGG",
  bannerCount: window?.env?.bannerCount || 2,
  theme: window?.env?.theme || "blue",
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === "" || "zh-CN"
    : "zh-CN",
};

export default config;
