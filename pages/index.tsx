import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WAValidator = require('multicoin-address-validator')

type Row = {
  name: string
  address: string
  type: string
  twitter: string
}

export default function Home() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [type, setType] = useState('')
  const [twitter, setTwitter] = useState('')

  const registData = async () => {
    if (!name || name === '') {
      alert('取引所名を入力してください')
      return
    }

    if (!WAValidator.validate(address, 'xrp')) {
      alert('アドレスが正しくありません。')
      return
    }

    if (!type || type === '') {
      alert('種類を選択してください')
      return
    }

    if (!twitter || twitter === '') {
      if (
        !confirm(
          'Twitterアカウント名が入力されていません。送信してよろしいですか？'
        )
      ) {
        return
      }
    } else if (!twitter.startsWith('@')) {
      alert('Twitterアドレスは@を含めて入力してください。')
      return
    }

    const json = {
      name,
      address,
      type,
      twitter,
      date: new Date(),
    }

    await fetch('/api/stein', { method: 'POST', body: JSON.stringify(json) })

    alert('送信しました。\nアドレス情報の提供ありがとうございます。')

    setName(() => '')
    setAddress(() => '')
    setType(() => '')
  }
  return (
    <div className="App">
      <div className="App-content">
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={3}>
            取引所名
          </Grid>
          <Grid item xs={5}>
            <input
              type="text"
              size={40}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={3}>
            取引所アドレス
          </Grid>
          <Grid item xs={5}>
            <input
              type="text"
              size={40}
              value={address}
              placeholder="r..."
              onChange={(event) => setAddress(event.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={3}>
            <br />
            種類
          </Grid>
          <Grid item xs={5}>
            <input
              type="radio"
              name="type"
              id="withdraw"
              value="withdraw"
              checked={type === 'withdraw'}
              onChange={(event) => setType(event.target.value)}
            />
            入金 &nbsp;&nbsp;&nbsp;&nbsp; <br />
            <input
              type="radio"
              name="type"
              id="deposit"
              value="deposit"
              checked={type === 'deposit'}
              onChange={(event) => setType(event.target.value)}
            />
            出金 &nbsp;&nbsp;&nbsp;&nbsp; <br />
            <input
              type="radio"
              name="type"
              id="other"
              value="other"
              checked={type === 'other'}
              onChange={(event) => setType(event.target.value)}
            />
            その他
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={3}>
            あなたのTwitter
          </Grid>
          <Grid item xs={5}>
            <input
              type="text"
              size={40}
              value={twitter}
              placeholder="@"
              onChange={(event) => setTwitter(event.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <input type="button" value="送信" onClick={() => registData()} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
