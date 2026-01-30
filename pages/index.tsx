import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import Link from "next/link";
import { SITE_CONFIG } from "../lib/config";
import { getNotionPage } from "../lib/notion";

export async function getStaticProps() {
  const blockMap = await getNotionPage(SITE_CONFIG.notionPageId);

  return {
    props: { blockMap },
    revalidate: 60
  };
}

interface Props {
  blockMap: BlockMapType;
}

export default function Home({ blockMap }: Props) {
  return (
    <>
      <Head>
        <title>{SITE_CONFIG.name}</title>
        <meta name="description" content={SITE_CONFIG.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SITE_CONFIG.name} />
        <meta property="og:description" content={SITE_CONFIG.description} />
        <meta property="og:url" content={SITE_CONFIG.url} />
        <meta property="og:site_name" content={SITE_CONFIG.name} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={SITE_CONFIG.name} />
        <meta name="twitter:description" content={SITE_CONFIG.description} />
        <link rel="canonical" href={SITE_CONFIG.url} />
      </Head>
      <NotionRenderer
        blockMap={blockMap}
        fullPage
        hideHeader
        customBlockComponents={{
          page: ({ blockValue, renderComponent }) => (
            <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
          )
        }}
      />
    </>
  );
}
