## watch

- `sam sync --stack-name memo-backend-dev --watch`
- CFn Stack とは非同期になるため、利用は dev 環境だけにとどめる。

## build & deploy

- `sam build`
- `sam deploy --config-env dev`

## Layerの作り方
1. template.yamlにて各FunctionのMetadata.BuildPropertiesに以下を設定する。
```yaml
External:
  - memoapp-gql-common
```
2. src/memoapp-gql-commonディレクトリを作る。
3. index.ts, index.d.ts.を作る。
4. index.tsをbuildする。(`tsc src/memoapp-gql-common/index.ts`)
5. src/layers/nodejs/node_modulesディレクトリを作る。
6. src/memoapp-gql-commonを作ったnode_modulesにコピーする。
7. node_modulesからindex.tsを削除する。
8. src/layers/nodejs/node_modules/memoapp-gql-commonを/node_modulesにコピーする。
9. samのbuild&deploy(`npm run deploy-dev`)をする。

**上記のNo.4~9をsrc/layers/build-layer.shにまとめ、
`npm run build-layer`でシェルを実行する。**

## TODO
- Layer
  - 各Functionで使っているAWS SDKをLayer化する。
  - build-layer.shを完成させる。
- Cognito完成させる。
  - FE
    - サインアップ画面用意
    - パスワード再設定画面用意
  - SAM
    - emailaddressを必須にする。
    - signupの時のemail validationをオンにする。