"use client"

// import { loadTweets } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Tag } from "@/types";

interface Props {
    tags: Tag[]; // Array of Tag objects
}
export default function Tags({tags}: Props) {
    // console.log(tags);
    
    const router = useRouter()
    const searchParams  = useSearchParams()

    const handleTagClick = (tagIdToFilter: string) => {
        const newParams = new URLSearchParams(searchParams)
        
        newParams.append('tag', tagIdToFilter)
        
        console.log(newParams.toString());
        router.push(`/?${newParams.toString()}`, {scroll: false})
    }

    return (
        <div className="flex flex-row">
            {tags?.map((tag) => {
                return (
                    <div onClick={() => handleTagClick(tag.id)} key={tag.id} className="pr-1 pl-1 ml-1 mr-1 hover:cursor-pointer hover:bg-gray-200">
                        {tag.name}
                        <span className="mr-1 ml-1 opacity-50">{tag.post_count}</span>
                    </div>
                )
            })}
        </div>
    )
}