if [[ `git status --porcelain` ]]; then
    git config --global user.name 'robot'
    git config --global user.email 'robot@gmail.com'
    git config --global core.mergeoptions --no-edit
    git add .
    git commit -m "commit automatically"
    # if someone else commit at the same time, you must pull before pushing and 'GET an error'
    if ! git push ; then
        GIT_MERGE_AUTOEDIT=no git pull
        git push
    fi
fi