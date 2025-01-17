import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient()
  const { data: tags } = await supabase.from('tags').select()
  console.log(tags)

  return (
    <div>
      DIAMANT
      {
        tags?.map(tag => {
          return (
            <div key={tag.id}>
              {tag.name}
            </div>
          )
        })
      }
    </div>
  );
}
