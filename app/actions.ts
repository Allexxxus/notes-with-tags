"use server";
import { Tag, Tweet } from "@/types";
import { createClient } from "@/utils/supabase/server";

///////////////////////////////////////////////////////////////////////
///////////////////////////signUp/////////////////////////////////////
///////////////////////////////////////////////////////////////////////

export const signUp = async (formData: FormData) => {
  const email = `${formData.get("email")?.toString()}@placeholder.com`;
  const password = formData.get("password")?.toString();
  const supabase = await createClient();

  if (!email || !password) {
    return;
  }

  await supabase.auth.signUp({
    email,
    password,
  });
};

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////log in/////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// export const login = async (formData: FormData) => {
//   const email = `${formData.get("email")?.toString()}@placeholder.com`;
//   const password = formData.get("password")?.toString();
//   const supabase = await createClient();

//   if (!email || !password) {
//     return;
//   }

//   await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
// };

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////post tweet/////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////

// export const postTweet = async (formData: FormData) => {
//   //get message from the form
//   const message = formData.get("message")?.toString();

//   //get tags from the form
//   const tags = formData
//     .get("tags")
//     ?.toString()
//     .split(",")
//     .map((tag) => tag.trim());

//   const supabase = await createClient();

//   //get current user from database
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   //insert post into database
//   const { data: postData, error: postError } = await supabase
//     .from("tweets")
//     .insert({ title: message, user_id: user?.id })
//     .select()
//     .single();

//   const postId = postData.id;

//   //insert tags into database
//   for (const tag of tags) {
//     // Check if the tag already exists
//     const { data: tagData, error: tagError } = await supabase
//       .from("tags")
//       .select("id")
//       .eq("name", tag)
//       .single();

//     let tagId;

//     //////////////////////////////////////////

//     //if Tag exists, use its ID
//     if (tagData) {
//       tagId = tagData.id;
//       const { data: postCount} = await supabase
//         .from("tags")
//         .select('post_count')
//         .eq('id', tagId)
//         .single();
//         const updatedPostCount = postCount.post_count + 1
//         console.log(updatedPostCount);
      
//         const { data: newTagData, error: newTagError } = await supabase
//         .from("tags")
//         .update({ post_count: updatedPostCount})
//         .eq('id', tagId)
//         .select()
//         .single();
//     }
//     //if Tag does not exist, insert it
//     else {
//       const { data: newTagData, error: newTagError } = await supabase
//         .from("tags")
//         .insert({ name: tag, post_count: 1 })
//         .select()
//         .single();

//       // //if Tag exists, use its ID
//       // if (tagData) {
//       //   tagId = tagData.id;

//       // }
//       // //if Tag does not exist, insert it
//       // else {
//       //   const { data: newTagData, error: newTagError } = await supabase
//       //     .from("tags")
//       //     .insert({ name: tag })
//       //     .select()
//       //     .single();

//       //////////////////////////////////////////

//       if (newTagError) {
//         console.error("Error inserting tag:", newTagError);
//         return;
//       }

//       tagId = newTagData.id; // Get the ID of the newly created tag
//     }

//     console.log(postId);
//     console.log(tagId);
//     //Link the Post and Tags
//     const { error: linkError } = await supabase
//       .from("tweet_tags")
//       .insert([{ tweet_id: postId, tag_id: tagId }]);

//     if (linkError) {
//       console.error("Error linking post and tag:", linkError);
//     }
//   }
// };

///////////////////////////////////////////////////////////////////////
///////////////////////////load Tweets/////////////////////////////////////
///////////////////////////////////////////////////////////////////////

export const loadTweets = async (tagIdToFilter: string[]): Promise<Tweet[]> => {
  const supabase = await createClient();

  if (tagIdToFilter[0] !== undefined) {
    const { data: tweetIds, error: tweetIdsError } = await supabase
      .from("tweet_tags")
      .select("tweet_id")
      .in("tag_id", tagIdToFilter);

    console.log(tweetIds);
    if(tweetIdsError) {
        console.error("Error fetching tweetIds:", tweetIdsError);
        return []
    }
    const tweetIdsArray = tweetIds.map((tweetId) => tweetId.tweet_id);

    const { data: tweets } = await supabase
      .from("tweets")
      .select("*, profiles(*), tweet_tags(tag_id)")
      .in("id", tweetIdsArray);

    if (!tweets) return [];

    const tweetsArray = await Promise.all(
      tweets?.map(async (tweet) => {
        const { data: tagsData, error: tagsError } = await supabase
          .from("tags")
          .select("*")
          .in(
            "id",
            tweet.tweet_tags.map((tag: { tag_id: any }) => tag.tag_id)
          );

        if (tagsError) {
          console.error("Error fetching tags:", tagsError);
          return { ...tweet, tags: [] };
        }

        return {
          ...tweet,
          tags: tagsData, 
        };
      })
    );
    return tweetsArray;
  }

  else {
    const { data: tweets } = await supabase
      .from("tweets")
      .select("*, profiles(*), tweet_tags(tag_id)");

    if (!tweets) return [];

    const tweetsArray = await Promise.all(
      tweets?.map(async (tweet) => {
        const { data: tagsData, error: tagsError } = await supabase
          .from("tags")
          .select("*") 
          .in(
            "id",
            tweet.tweet_tags.map((tag: { tag_id: any }) => tag.tag_id)
          );

        if (tagsError) {
          console.error("Error fetching tags:", tagsError);
          return { ...tweet, tags: [] }; 
        }

        return {
          ...tweet,
          tags: tagsData, 
        };
      })
    );
  
    if (!tweetsArray) {
      return []
    }
    return tweetsArray;
  }
};