import Head from 'next/head';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface NextjsProps {}

export function Nextjs(props: NextjsProps) {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <Head>
        <title>{router.query.dynamic}</title>
      </Head>
      <div>
        <h1>Page {router.query.dynamic}</h1>
      </div>
    </>
  );
}

export default Nextjs;
