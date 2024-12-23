'use client'

import { registerWithEmail } from '@/actions/auth/register-with-email'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { createClient } from '@/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Provider } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import { z } from 'zod'
import { MdOutlineAutoAwesome } from 'react-icons/md'

const LoginPage = () => {

    const [authenticating, setAuthenticating] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const getCurrentUser = async () => {
            const {data: {session}} = await createClient().auth.getSession()
            // console.log(session)

            if (session) {
                router.push('/')
            }

        }

        getCurrentUser()
        setIsMounted(true)
    }, [router])

    const formSchema = z.object({
        email: z.string().email(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setAuthenticating(true)

        const response = await registerWithEmail({ email: values.email })
        const { data, error } = JSON.parse(response)
        setAuthenticating(false)

        if (error) {
            console.log(error, 'Signup error');
        } else {
            console.log(data, 'Signup success');
        }
    }

    const onSocialAuth = async (provider: Provider) => {
        setAuthenticating(true)
        await createClient().auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            }
        })
        setAuthenticating(false)
    }

    if (!isMounted) return null

  return (
    <div className='min-h-screen bg-slate-400'>
        <div className='flex flex-col space-y-5 items-center justify-center p-5'>
            <Typography variant='h1' text='EchoDesk' />
            <div className='flex flex-col space-y-5'>
                <Button disabled={authenticating} onClick={() => onSocialAuth('google')} variant={'outline'}> <FaGoogle size={13} /> Login with Google</Button>
                {/* <Button variant={'outline'}> <Mail size={13} /> Login with Mail</Button> */}
            </div>
            <div className='flex items-center my-3'>
                <div className='mr-[10px] flex-1 border-t bg-neutral-900' /> ---
                    <Typography text='OR' variant='p' />
                    <div className='flex-1 ml-[10px] border-t bg-neutral-300' />
            </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={authenticating}>
                    <FormField 
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage />
                                <div className='flex flex-col space-y-2'>   
                                    <Input {...field} placeholder='Enter your email' />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button variant={'secondary'} className='bg-primary-dark text-slate-100 hover:bg-primary-dark/70 w-full mt-3' type='submit'>
                        <Typography variant='p' text='Login with E-mail' />
                    </Button>

                        <div className='flex gap-2 items-center mt-3 text-neutral-300'>
                                <MdOutlineAutoAwesome size={20} /> 
                            <div className=' place-items-center  text-neutral-300'>
                                check your email for the next steps
                        </div>
                    </div>
                </fieldset>
            </form>
        </Form>
        </div>
    </div>
  )
}

export default LoginPage
