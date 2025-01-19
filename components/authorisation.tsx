import { signUp } from '@/app/actions'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function Authorisation() {


    return (
        <div>
            <form className="flex flex-col min-w-64 max-w-64 mx-auto">
                <h1 className="text-2xl font-medium">Регистрация</h1>
                <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
                    <Label htmlFor="email">Никнейм</Label>
                    <Input name="email" placeholder="Латинскими символами" required />
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="минимум 6 символов"
                        minLength={6}
                        required
                    />
                    {/* <SubmitButton formAction={signUpAction} pendingText="Signing up..."> */}
                    <SubmitButton formAction={signUp} pendingText="Signing up...">
                        Зарегистрироваться
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}
