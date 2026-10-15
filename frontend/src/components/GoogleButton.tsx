import { GoogleLogin } from '@react-oauth/google'

const ORIGIN_HELP =
  'Google blocked this site (no registered origin). In Google Cloud → Credentials → Web client, add JavaScript origins: http://localhost:8080 and http://127.0.0.1:8080, Save, wait 1–2 minutes, then retry.'

export function GoogleButton({
  onSuccess,
  onError,
}: {
  onSuccess: (payload: { accessToken?: string; credential?: string }) => void
  onError: (message: string) => void
}) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

  if (!clientId || clientId === 'missing-google-client-id') {
    return (
      <button
        className="oauth-main"
        type="button"
        onClick={() => onError('Add VITE_GOOGLE_CLIENT_ID to frontend/.env, then restart the frontend.')}
      >
        Continue with Google
      </button>
    )
  }

  return (
    <div className="google-login-wrap">
      <GoogleLogin
        onSuccess={(response) => {
          if (!response.credential) {
            onError('Google did not return a sign-in credential.')
            return
          }
          onSuccess({ credential: response.credential })
        }}
        onError={() => onError(ORIGIN_HELP)}
        useOneTap={false}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  )
}
