import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import cls from 'classnames';
import styles from './coffee-store.module.scss';

import { fetchCoffeeStores } from '../../lib/coffeeStores';

import { StoreContext } from '../../store/storeContext';
import { isEmpty } from '../../utils';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id === params.id
  );
  return {
    props: {
      coffeeStore: findCoffeeStoreById || {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
/* eslint-disable-next-line */
export interface CoffeeStoreProps {
  coffeeStore: any;
}

export function CoffeeStore(initialProps: CoffeeStoreProps) {
  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );
  const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  const id = router.query.id;
  const {
    state: { coffeeStores },
  }: any = useContext(StoreContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, imgUrl, neighbourhood, address } = coffeeStore;

      const response = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          voting: voting || 0,
          imgUrl,
          neighbourhood: neighbourhood || '',
          address: address || '',
        }),
      });
      const dbCoffeeStore = await response.json();
      console.log({ dbCoffeeStore });
    } catch (error) {
      console.error({ error });
    }
  };
  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find(
          (coffeeStore) => coffeeStore.id === id
        );
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      // SSG
      setCoffeeStore(initialProps.coffeeStore);
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [coffeeStores, id, initialProps, initialProps.coffeeStore]);
  const { address, neighbourhood, name, imgUrl } = coffeeStore;

  const handleUpVoteButton = () => {
    console.log('handleUpVoteButton');
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
            <div className={styles.name}>{name}</div>
            <Image
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} alt="" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
