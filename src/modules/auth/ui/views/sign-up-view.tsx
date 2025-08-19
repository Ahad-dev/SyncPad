import AuthCardCommon from "../components/auth-form-common"

import SignUpForm from "../components/sign-up-form"

const SignUpView = () => {

  return (
    <AuthCardCommon
        title="SyncPad"
        description="Create an account"
    >
        <SignUpForm/>
    </AuthCardCommon>

  )
}

export default SignUpView