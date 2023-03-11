import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";
import Link from "next/link";
import { AiFillGithub} from "react-icons/ai";
import { GrDocumentText} from "react-icons/gr";
const graphcms = new GraphQLClient(
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clf427bmw4imd01td166g7yvw/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      dataPublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 30,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>DevBlog - Evan Kagarise</title>
        <meta name="description" content="A blog tutorial made with JAMstack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainheader}>
        <h1 className={styles.maintitle}>DevBlog</h1>
        <div className={styles.subheader}>
          <h3 className={styles.subheader}>
            <Link href="https://github.com/evankagarise?tab=repositories">
        <AiFillGithub />
        Source
        </Link>
        
          </h3>
          <h3 className={styles.subheader}>
            <Link href="https://evankagarise.com">
        <GrDocumentText />
        Portfolio
        </Link>
        
          </h3>
          
        </div>
        
      </div>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}