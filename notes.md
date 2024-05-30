To start local host:
1) Go to backend folder and put this command: npm run start
2) Go to frontend folder and put this command: npm run dev

Before commiting to main:
1) Go to frontend folder and put this command: npm run build

If your seeds are not updated on the live site:
1) Replace the Render build command with: npm install && npm run build && npm run sequelize --prefix backend db:seed:undo:all && npm run sequelize --prefix backend db:migrate:undo:all && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all
2) Manual deploy and clear cache
3) Revert the build command to the previous command: npm install && npm run build && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all
