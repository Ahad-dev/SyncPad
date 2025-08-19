import AuthCardCommon from "../components/auth-form-common"

import SignInForm from "../components/sign-in-form"

const SignInView = () => {

  return (
    <AuthCardCommon
        title="SyncPad"
        description="Welcome back"
    >
        <SignInForm/>
    </AuthCardCommon>

  )
}

export default SignInView