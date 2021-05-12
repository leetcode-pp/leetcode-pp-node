if [[ `git status --porcelain` ]]; then
    git config --global user.name 'robot'
    git commit -am "feat: automate generate data"
    git push
fi