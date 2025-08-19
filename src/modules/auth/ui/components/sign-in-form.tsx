import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form" 
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import { SignInSchema } from "../../schemas"
import { Button } from "@/components/ui/button"
import authService from "@/supabase/utils/auth"
import { useState } from "react"
import FormError from "@/components/form-error"
import { Loader2 } from "lucide-react"
import { Link, Router, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { login } from "@/store/authSlice"

const SignInForm = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate();   
    const [isPending ,setIsPending] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues:{
            email: "",
            password: "",
        }
    })
    const onSubmit = async(values:z.infer<typeof SignInSchema>)=>{
        setIsPending(true)

        const {data,error} = await authService.signIn({
            email:values.email,
            password:values.password    
        })
        if(data.user){
            dispatch(login(data.user))
            
            setError(null);
            navigate("/") // Redirect to home after successful sign-in;
        }
        else if(error){
            setError(error.message);
        }
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
                <p className="text-sm text-end text-gray-500">Forgot password? <Link to="/forgot-password" className="text-blue-500 hover:underline">Reset it</Link></p>
            {error && <FormError message={error} />}
            {/* Add Social Login Component */}

            

            <Button disabled={isPending} className='w-full' type="submit">
                {isPending ? <span className="flex gap-2 items-center justify-center"><Loader2 className="animate-spin size-6"  />Signing In ...</span> : "Sign In"}
            </Button>
                <p className="text-sm text-gray-400">Doesn't have an account? <Link to="/sign-up" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </form>
    </Form>
  )
}

export default SignInForm