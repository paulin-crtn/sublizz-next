import { getLeases } from "../utils/fetch/fetchLease";
import HomePage from "./components/HomePage";

async function getPosts() {
  return await getLeases();
  //   const posts = await res.json();
  //   return posts;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts();
  // Forward fetched data to your Client Component
  return <HomePage data={recentPosts} />;
}
