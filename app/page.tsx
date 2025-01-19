import Authorisation from "@/components/authorisation";
import Tags from "@/components/tags";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data: tags } = await supabase.from('tags').select()
  console.log(tags)

  return (
    <div>
      DIAMANT
      <Authorisation />
      <Tags tags={tags}/>
      {/* {
        tags?.map(tag => {
          return (
            <div key={tag.id}>
              {tag.name}
            </div>
          )
        })
      } */}
    </div>
  );
}
