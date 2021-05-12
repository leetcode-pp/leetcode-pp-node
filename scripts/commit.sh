if [[ `git status --porcelain` ]]; then
    git config --global user.name 'robot'
    git add .
    git commit -m "feat: automate generate data"
    git push
fi