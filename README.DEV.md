## watch

- `sam sync --stack-name memo-backend-dev --watch`
- CFn Stack とは非同期になるため、利用は dev 環境だけにとどめる。

## build & deploy

- `sam build`
- `sam deploy --config-env dev`

## TODO
- Cognito完成させる。
  - FE
    - サインアップ画面用意
    - パスワード再設定画面用意
  - SAM
    - emailaddressを必須にする。
    - signupの時のemail validationをオンにする。