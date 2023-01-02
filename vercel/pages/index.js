import { styled } from "goober";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { getPostsForHome } from "../lib/api";
import { formatDate } from "../utils/functions";
//
export default function Home({ posts }) {
    return (
        <>
            <Main>
                <div>
                    <h1>
                        Anciently
                    </h1>
                </div>

                <div className="post-div">
                    <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Home</h2>
                    <Grid>
                        {posts.map(({ node }) => {
                            return (
                                <div className="post-card" key={node.slug}>
                                    <h3>{node.title}</h3>
                                    <span>{formatDate(node.date)}</span>
                                    <Link href={`/blog/` + node.slug} passHref>
                                        <a aria-label={node.title}></a>
                                    </Link>
                                </div>
                            );
                        })}
                    </Grid>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0",
                        paddingTop: "1rem",
                        textTransform: "uppercase",
                        borderRadius: "50px 50px 50px 50px",
                        backgroundColor: "#000fa0",
                        transition: "0.5s max-width ease",
                        marginTop: "1rem",
                    }}
                >
                    <Link href="/blog">See more</Link>
                </div>
            </Main>
        </>
    );
}

export async function getStaticProps() {
    const posts = await getPostsForHome();

    return {
        props: { posts: posts.edges },
    };
}


const Main = styled("div")`
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 15px;
    .post-div {
        margin-top: 4rem;
    }
`;

const Grid = styled("div")`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    @media (max-width: 768px) {
        grid-template-columns: 100%;
    }
    .post-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        padding: 60px;
        background-color: #fff;
        background-clip: padding-box;
        border: solid 5px transparent;
        border-radius: 10px;
        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -5px;
            border-radius: inherit;
            border: 1px solid rgb(238, 238, 238);
            filter: drop-shadow(0px 0px 3px rgba(0,0,0,.3));
        }
        a {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            opacity: 0;
            height: 100%;
            width: 100%;
            text-decoration: none;
        }
        h3 {
            margin-bottom: 20px;
        }
    }
`;
