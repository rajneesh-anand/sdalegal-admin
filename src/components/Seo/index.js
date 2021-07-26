import React from "react";
import Head from "next/head";

const SEO = ({ title, description, canonical, css, js, image }) => (
  <Head>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="description" content={title} />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />

    <meta name="og:type" property="og:type" content="website" />
    <meta name="og:image" property="og:image" content="/og.png" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta name="og:url" property="og:url" content={`${canonical}`} />
    <meta property="og:site_name" content="KokeLiko" />
    <meta name="twitter:card" property="twitter:card" content="summary" />
    <meta name="twitter:title" property="twitter:title" content={title} />
    <meta
      name="twitter:description"
      property="twitter:description"
      content={description}
    />
    <meta name="twitter:site" property="twitter:site" content="@kokeliko" />
    <meta name="twitter:creator" property="twitter:site" content="@kokeliko" />

    <meta name="twitter:image" property="twitter:image" content="/og.png" />

    {canonical && <link rel="canonical" href={`${canonical}`} />}
    {js && <script type="text/javascript" src={`${js}`}></script>}
  </Head>
);
export default SEO;
