import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Token() {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <Head>
        <title>Token {id} | SureHive</title>
        <meta key="description" name="description" content="SureHive tokens." />
      </Head>
    </>
  )
}
