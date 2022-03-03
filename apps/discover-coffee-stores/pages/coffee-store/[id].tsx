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
    (coffeeStore) => coffeeStore.fsq_id === params.id
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
        id: coffeeStore.fsq_id.toString(),
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
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const router = useRouter();
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  const id = router.query.id;
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  useEffect(() => {
    console.log(isEmpty(initialProps.coffeeStore));
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (coffeeStore) => coffeeStore.fsq_id === id
        );
        console.log(findCoffeeStoreById);
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [coffeeStores, id, initialProps]);
  console.log({ coffeeStore });
  const { address, neighborhood, name, imgUrl } = coffeeStore;

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
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{neighborhood}</p>
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