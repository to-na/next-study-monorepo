import Head from 'next/head';
import Banner from '../components/banner/banner';
import styles from './index.module.scss';

export function Index() {
  const handleOnBannerClick = () => {
    console.log('hi banner button');
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerClick}
        />
      </main>
    </div>
  );
}

export default Index;
