import Head from "next/head";
import Link from "next/link";
import { SITE_CONFIG } from "../lib/config";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found - {SITE_CONFIG.name}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link href="/">
          <a className="link">Go back home</a>
        </Link>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: center;
          padding: 2rem;
        }
        h1 {
          font-size: 6rem;
          margin: 0;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        p {
          color: #666;
          font-size: 1.25rem;
          margin: 1rem 0 2rem;
        }
        .link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          padding: 0.75rem 1.5rem;
          border: 2px solid #6366f1;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .link:hover {
          background: #6366f1;
          color: white;
        }
      `}</style>
    </>
  );
}
