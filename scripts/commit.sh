if [[ `git status --porcelain` ]]; then
    git config --global user.name 'robot'
    git add .
    git commit -m "commit automatically"
    git push
fi