import Authorisation from "@/components/authorisation";
import { createClient } from "@/utils/supabase/server";
import Tags from "@/components/tags";
import { Tag } from "@/types";

export default async function Home() {
  const supabase = await createClient()
  const { data: tags } = await supabase.from('tags').select()
  console.log(tags)

  return (
    <div>
      DIAMANT
      <Authorisation />
      <Tags tags={tags as Tag[] ?? []}/>
    </div>
  );
}
