var template = 2; //2 for T2, 3 for T3 (based on .xd file)
const config = {
  baseUrl: window?.env ? "/api/" : "https://dev-t1.rpgp.cc/api/",
  client:
    window?.env?.client ||
    "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ",
  currency: window?.env?.currency || "CNY",
  brand: window?.env?.brand || "HKJP",
  theme: window?.env?.theme || "red",
  wapVersion: template,
  sourceUrl: window?.env?.sourceUrl || "https://images.srvptt.com/",
  defaultLanguage: window?.env?.defaultLanguage
    ? window?.env?.defaultLanguage === ""
      ? "zh-CN"
      : window?.env?.defaultLanguage
    : "zh-CN",
};

export default config;
