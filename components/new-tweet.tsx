import { postTweet } from "@/app/actions";
import { SubmitButton } from "./submit-button";
import { Input } from "./ui/input";

export default function NewTweet() {
    return (
        <div>
            <form className="flex flex-col min-w-64 max-w-64 mx-auto">
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Input name="message" placeholder="Текст сообщения..." required />
                    <Input name="tags" placeholder="тэги через запятую..." />

                    <SubmitButton formAction={postTweet} pendingText="Отправка...">
                        Отправить
                    </SubmitButton>

                </div>
            </form>
        </div>
    )
}