import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import Welcomemessage from "./Welcomemessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const [fetching, setFetching] = useState(false);
  const { postList, add_Initial_Post } = useContext(PostListData);
  useEffect(() => {
    const Controller = new AbortController();
    const signal = Controller.signal;
    setFetching(true);
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        add_Initial_Post(data.posts);
        setFetching(false);
      });

    return () => {
      Controller.abort();
    };
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <Welcomemessage />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
