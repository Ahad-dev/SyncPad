import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialLogin } from "./social-login"
import authService from "@/supabase/utils/auth"


interface AuthCardCommonProps {
    title: string
    description: string
    children: React.ReactNode,
}
const AuthCardCommon = ({ title, description, children }: AuthCardCommonProps) => {
  return (
        <Card className="w-2/3 lg:w-1/3">
        <CardHeader className="text-center">
            <CardTitle className="text-4xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            <SocialLogin
              onGoogle={async() => await authService.signInWithProvider('google')}
              onGithub={async() => await authService.signInWithProvider('github')}
            />
        </CardFooter>

    </Card>
  )
}

export default AuthCardCommon