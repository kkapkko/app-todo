1. Create a vite react app 
- npm create vite@latest


2. Create a new repository on GitHub and initialize GIT
- git init 
- git add . 
- git commit -m "add: initial files" 
- git branch -M main 
- git remote add origin https://github.com/[USER]/[REPO_NAME] 
- git push -u origin main


3. Setup base in vite.config
- base: "/[REPO_NAME]/"


4. Create ./github/workflows/deploy.yml and add the code bellow
- copy file deploy.yml to folder github/workflows


5. Push to GitHub
- git add . 
- git commit -m "add: deploy workflow" 
- git push


6. Active workflow (GitHub)
- Config > Actions > General > Workflow permissions > Read and Write permissions 
- Actions > failed deploy > re-run-job failed jobs 
- Pages > gh-pages > save


7. For code changes
- git add . 
- git commit -m "fix: some bug" 
- git push