'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] })
    return payload
  } catch (error) {
    console.error(error);
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt } as SessionPayload)
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {

  try {
    const cookie = (await cookies()).get('session')?.value

    if (!cookie) {
      throw new Error('No session found')
    }

    const session = await decrypt(cookie)

    if (!session?.userId) {
      throw new Error('Unauthorized')
    }

    return session

  } catch (error) {
    return error as Error;
  }
}

export async function updateSession() {
  try {
    const cookie = (await cookies()).get('session')?.value

    if (!cookie) {
      throw new Error('No session found')
    }

    const session = await decrypt(cookie)

    if (!session?.userId) {
      throw new Error('Unauthorized')
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const cookieStore = await cookies()
    cookieStore.set('session', cookie, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })

    return {session: session, cookie: cookie}

  } catch (error) {
    console.error(error);
    return error as Error;
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session')

    return true
  
  } catch (error) {
    return error as Error;
  }
}

