#! usr/bin/env sh

set -e

npm run build

cd dist

git init
git add .
git commit -m "New deployment"
git push -f git@github.com:Sorruss/hobo.git master:hobo-pages

cd -