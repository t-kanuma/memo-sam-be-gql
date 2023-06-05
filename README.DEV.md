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
2. src/commonディレクトリを作る。
3. index.ts, index.d.ts.を作る。
4. /layers/nodejs/node_modules/memoapp-gql-commonディレクトリを作る。
5. index.tsをbuildする。(`node_modules/typescript/bin/tsc src/common/index.ts --outDir layers/nodejs/node_modules/memoapp-gql-common`)
6. src/memoapp-gql-common/index.d.tsを上記のnode_modulesにコピーする。
7. src/commonにて`npm install --omit=dev`する。
8. 出来上がったnode_modulesをlayers/nodejs/node_modules/memoapp-gql-commonにコピーする。
9. src/commonにて`npm install`する。
7. layers/nodejs/node_modules/memoapp-gql-commonを(ルートディレクトリの)/node_modulesにコピーする。
8. samのbuild&deploy(`npm run deploy-dev`)をする。

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