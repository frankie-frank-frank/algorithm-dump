// FETCH:
import { Redis } from "@upstash/redis";
import * as dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

type Cookie = {
    name: string;
    value: string;
    url?: string;
    domain?: string;
    path?: string;
    expires?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
};

async function main() {    
    const localStorageLength = await redis.llen("vp-seed-local-storage");
    const localStorage = await redis.lrange("vp-seed-local-storage", 0, localStorageLength); 
    console.log(localStorage)
    
    const cookieslength = await redis.llen("vp-seed-cookies");
    const cookies = await redis.lrange("vp-seed-cookies", 0, cookieslength); 
    console.log(cookies)
}


// SET:
async function Init() {
  await redis.lpush("vp-seed-local-storage", ...[
    JSON.stringify({"cleverpush-subscription-status": "denied"}),
    JSON.stringify({omFoldersClosed: "{}"}),
    JSON.stringify({klaviyoOnsite: `{"viewedForms":{"modal":{"disabledForms":{"T52r8Q":{"lastCloseTime":${
      Date.now() - 1000
    }}},"disabledTeasers":{},"viewedForms":{"T52r8Q":8324798}}}}`}),
    JSON.stringify({cnvs: JSON.stringify({
      cart: {
        response: {
          token: "f7d80100aa1a68e8e835fe0a7025c184",
          note: null,
          attributes: {},
          original_total_price: 0,
          total_price: 0,
          total_discount: 0,
          total_weight: 0,
          item_count: 0,
          items: [],
          requires_shipping: false,
          currency: "GBP",
          items_subtotal_price: 0,
          cart_level_discount_applications: [],
        },
      },
      overlays: {
        dismissed: ["marketSwitcher", null, "newsletterModal"],
      },
    })})
  ]);

  await redis.lpush("vp-seed-cookies", ...[
    JSON.stringify({
      name: "CozyChosenuRYX",
      value: "close",
      domain: "legavenue.com",
      path: "/",
    }),
    JSON.stringify({
      name: "remember_term",
      value: "short",
      domain: "legavenue.com",
      path: "/",
    }),
    JSON.stringify({
      name: "userConsent",
      value: "%7B%22marketing%22%3Atrue%2C%22version%22%3A%223%22%7D",
      domain: ".xing.com",
      path: "/",
    }),
    JSON.stringify({
      name: "gdprcookienotice",
      value: `{%22date%22:%22${new Date().toISOString()}%22%2C%22necessary%22:true%2C%22performance%22:true%2C%22analytics%22:true%2C%22marketing%22:true}`,
      domain: "www.jobbuddy.de",
      path: "/",
    }),
    JSON.stringify({
      name: "borlabs-cookie",
      value:
        "%7B%22consents%22%3A%7B%22essential%22%3A%5B%22borlabs-cookie%22%2C%22pll_language%22%2C%22nitropack%22%5D%2C%22statistics%22%3A%5B%22google-analytics%22%2C%22google-tag-manager%22%2C%22google-analytics-vier%22%5D%2C%22external-media%22%3A%5B%22googlemaps%22%2C%22youtube%22%5D%7D%2C%22domainPath%22%3A%22www.rochusmummert.com%2F%22%2C%22expires%22%3A%22Fri%2C%2001%20Nov%202024%2008%3A43%3A17%20GMT%22%2C%22uid%22%3A%22iqwaqt5q-s7omplsy-wpjr15xt-huzt1wwn%22%2C%22version%22%3A%221%22%7D",
      domain: ".www.rochusmummert.com",
      path: "/",
    }),
    JSON.stringify({
      name: "borlabs-cookie",
      value:
        "%7B%22consents%22%3A%7B%22essential%22%3A%5B%22borlabs-cookie%22%5D%2C%22external-media%22%3A%5B%22facebook%22%2C%22googlemaps%22%2C%22instagram%22%2C%22openstreetmap%22%2C%22twitter%22%2C%22vimeo%22%2C%22youtube%22%5D%7D%2C%22domainPath%22%3A%22burakkalman.com%2F%22%2C%22expires%22%3A%22Thu%2C%2023%20Jan%202025%2008%3A11%3A56%20GMT%22%2C%22uid%22%3A%22c3xiewgg-auh3qbe5-myu477uw-ln2pp1hn%22%2C%22version%22%3A%221%22%7D",
      domain: ".burakkalman.com",
      path: "/",
    }),
    JSON.stringify({
      name: "real_cookie_banner-v:3_blog:1_path:da22278",
      value:
        "1709039186%3A0f234017-e4d0-48c7-a451-7e89bcebcdc5%3Ae977fbf8fbc81c28b11c7c9d9ae58d9e%3A%7B%2260%22%3A%5B37544%5D%2C%2261%22%3A%5B37560%2C37547%2C37545%5D%7D",
      domain: "mutschler-gmbh.de",
      path: "/",
    }),
    JSON.stringify({
      name: "CONSENTMGR",
      value: `c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:0%7Cc6:1%7Cc7:1%7Cc8:0%7Cc9:1%7Cc10:0%7Cc11:0%7Cc12:1%7Cc13:1%7Cc14:0%7Cc15:0%7Cts:${Date.now()}%7Cconsent:true`,
      domain: ".stepstone.de",
      path: "/",
    }),
    JSON.stringify({
      name: "SOCS",
      value: "CAESFggDEgk2MzAxMjE4MTQaBWVuLUdCIAEaBgiA3uWxBg",
      domain: ".youtube.com",
      path: "/",
    }),
    JSON.stringify({
      name: "userConsent",
      value: "%7B%22marketing%22%3Atrue%2C%22version%22%3A%225%22%7D",
      domain: ".kununu.com",
      path: "/",
    })
  ]);
}

// Init()
// main()