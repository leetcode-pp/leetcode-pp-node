if [[ `git status --porcelain` ]]; then
    git config --global user.name 'robot'
    git config --global core.mergeoptions --no-edit
    git add .
    git commit -m "commit automatically"
    if ! git push ; then
        git pull
        git push
    fi
fi