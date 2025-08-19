import { Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form" 
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { SignUpSchema } from "../../schemas"
import { Button } from "@/components/ui/button"
import authService from "@/supabase/utils/auth"
import { useEffect, useState } from "react"
import FormSuccess from "@/components/form-success"
import { Loader2 } from "lucide-react"
import { Link } from "react-router"

const SignUpForm = () => {
    const [isPending ,setIsPending] = useState(false)
    const [success, setSuccess] = useState<string | null>(null);
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues:{
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    useEffect(() => {
        // if Success is there make it null after 5 sec
        if(success){
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[success])

    const onSubmit = async(values:z.infer<typeof SignUpSchema>)=>{
        setIsPending(true)
        const {data,error} = await authService.signUp({
            email:values.email,
            password:values.password    
        })
        if(data){
            setSuccess("Account created successfully! Verify You Email");
        }
        console.log(data,error)
        setIsPending(false)
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input disabled={isPending} placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input disabled={isPending} placeholder="*******" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                        <Input disabled={isPending} placeholder="*******" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="text-sm text-gray-500">
                already have an account? <Link to="/sign-in" className="text-blue-500 hover:underline">Sign In</Link>
            </div>

                {
                    success && <FormSuccess message={success} />
                }

            <Button disabled={isPending} className='w-full' type="submit">
                {isPending ? <span className="flex gap-2 items-center justify-center"><Loader2 className="animate-spin size-6"  />Signing Up ...</span> : "Sign Up"}
            </Button>
            <FormDescription>
                By signing up, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                </FormDescription>
        </form>
    </Form>
  )
}

export default SignUpForm