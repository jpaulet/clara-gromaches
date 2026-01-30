import { NotionRenderer, BlockMapType } from "react-notion";
import Head from "next/head";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { SITE_CONFIG } from "../lib/config";
import { getNotionPage, getPageTitle } from "../lib/notion";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageId = context.params?.pageId as string;

  if (!pageId) {
    return { notFound: true };
  }

  const blockMap = await getNotionPage(pageId);

  return {
    props: { blockMap, pageId }
  };
}

interface Props {
  blockMap: BlockMapType;
  pageId: string;
}

export default function NotionPage({ blockMap, pageId }: Props) {
  if (!blockMap || Object.keys(blockMap).length === 0) {
    return (
      <>
        <Head>
          <title>Page Not Found - {SITE_CONFIG.name}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h3>No data found.</h3>
          <p>Make sure the pageId is valid.</p>
          <p>Only public pages are supported.</p>
        </div>
      </>
    );
  }

  const title = getPageTitle(blockMap);
  const pageUrl = `${SITE_CONFIG.url}/${pageId}`;

  return (
    <>
      <Head>
        <title>{title} - {SITE_CONFIG.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content={SITE_CONFIG.name} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <link rel="canonical" href={pageUrl} />
      </Head>
      <NotionRenderer
        blockMap={blockMap}
        fullPage
        customBlockComponents={{
          page: ({ blockValue, renderComponent }) => (
            <Link href={`/${blockValue.id}`}>{renderComponent()}</Link>
          )
        }}
      />
    </>
  );
}
