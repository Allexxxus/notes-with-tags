import Authorisation from "@/components/authorisation";
import { createClient } from "@/utils/supabase/server";
import Tags from "@/components/tags";
import { Tag } from "@/types";
import { loadTweets } from "./actions";
import Tweets from "@/components/tweets";
import { Tweet } from "@/types";
import NewTweet from "@/components/new-tweet";
import Header from "@/components/header";


   export default async function Home({ searchParams }: { searchParams: Promise<{ tag: string[] }> }) {
  let tagsToFilterArray: string[] = []

  const params = await searchParams
  console.log('params');
  console.log(params);
  
  if (params.tag === undefined) {
    tagsToFilterArray = []
  } else if (typeof params.tag === 'string') {
    tagsToFilterArray = [params.tag]
  } else if (Array.isArray(params.tag)) {
    tagsToFilterArray = params.tag
  }
  
  const supabase = await createClient()
  const { data: tags } = await supabase.from('tags').select()

    const tweets: Tweet[] = await loadTweets(tagsToFilterArray)

  console.log('tagsToFilterArray')
  console.log(tagsToFilterArray)
  
  return (
    <div>
      <Header />
      
      <Tags tags={tags as Tag[] ?? []} />
      <NewTweet />
      <Tweets tweetsData={tweets} />
    </div>
  );
}