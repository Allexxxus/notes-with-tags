
import { Tweet } from "@/types";

interface TweetsProps {
    tweetsData: Tweet[];
}

export default async function Tweets({ tweetsData }: TweetsProps) {
    
    const tweetsArray = tweetsData

    return (
        <div>
            {tweetsArray?.map(tweet => {
                return (
                    <div key={tweet.id} className="border-t border-gray-800 p-5">
                        <p className="opacity-50">{tweet.profiles.name}</p>
                        {tweet.title}
                        <div className="flex flex-row">
                            {tweet.tags.map((tag) => {
                                return (
                                    <div className="pr-1 text-sm opacity-30" key={tag.id}>{tag.name}</div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}